"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  createEmptyMeasurementValues,
  measurementFields,
  MeasurementKey,
  MeasurementSet,
  MeasurementUnit,
  MeasurementValues,
} from "./measurement-fields";

const STORAGE_KEY = "righttailor_measurement_sets_v1";

type DraftSet = {
  id: string;
  name: string;
  units: MeasurementUnit;
  measurements: MeasurementValues;
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const normalizeUnit = (value: unknown): MeasurementUnit => {
  return value === "in" ? "in" : "cm";
};

const parseMeasurementSets = (rawValue: string | null): MeasurementSet[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const normalized = parsed.flatMap((entry) => {
      if (!isObjectRecord(entry)) {
        return [];
      }

      const measurements = createEmptyMeasurementValues();
      const incomingMeasurements = isObjectRecord(entry.measurements) ? entry.measurements : {};

      for (const field of measurementFields) {
        const value = incomingMeasurements[field.key];
        measurements[field.key] = typeof value === "string" ? value : "";
      }

      const createdAt = typeof entry.createdAt === "string" ? entry.createdAt : new Date().toISOString();
      const updatedAt = typeof entry.updatedAt === "string" ? entry.updatedAt : createdAt;

      return [
        {
          id: typeof entry.id === "string" ? entry.id : crypto.randomUUID(),
          name: typeof entry.name === "string" && entry.name.trim().length > 0 ? entry.name : "Untitled set",
          units: normalizeUnit(entry.units),
          measurements,
          createdAt,
          updatedAt,
        } satisfies MeasurementSet,
      ];
    });

    return normalized.sort((left, right) => {
      return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
    });
  } catch {
    return [];
  }
};

const countFilledMeasurements = (values: MeasurementValues): number => {
  return measurementFields.reduce((total, field) => {
    return values[field.key].trim().length > 0 ? total + 1 : total;
  }, 0);
};

const formatDateTime = (isoString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
};

const toDraft = (set: MeasurementSet): DraftSet => {
  return {
    id: set.id,
    name: set.name,
    units: set.units,
    measurements: { ...set.measurements },
  };
};

const hasDraftChanged = (draft: DraftSet, source: MeasurementSet | null): boolean => {
  if (!source) {
    return false;
  }

  if (draft.name.trim() !== source.name || draft.units !== source.units) {
    return true;
  }

  return measurementFields.some((field) => {
    return draft.measurements[field.key] !== source.measurements[field.key];
  });
};

export default function GetMeasuredPage() {
  const [measurementSets, setMeasurementSets] = useState<MeasurementSet[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return parseMeasurementSets(window.localStorage.getItem(STORAGE_KEY));
  });
  const [draftSet, setDraftSet] = useState<DraftSet | null>(null);
  const [newSetName, setNewSetName] = useState("");
  const [newSetUnit, setNewSetUnit] = useState<MeasurementUnit>("cm");
  const [createError, setCreateError] = useState<string | null>(null);
  const [editorMessage, setEditorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(measurementSets));
  }, [measurementSets]);

  const activeSet = useMemo(() => {
    if (!draftSet) {
      return null;
    }

    return measurementSets.find((set) => set.id === draftSet.id) ?? null;
  }, [draftSet, measurementSets]);

  const isDirty = useMemo(() => {
    if (!draftSet) {
      return false;
    }

    return hasDraftChanged(draftSet, activeSet);
  }, [activeSet, draftSet]);

  const filledCount = useMemo(() => {
    return draftSet ? countFilledMeasurements(draftSet.measurements) : 0;
  }, [draftSet]);

  const measurementTotal = measurementFields.length;

  const openSet = (set: MeasurementSet): void => {
    if (draftSet && isDirty && draftSet.id !== set.id) {
      const shouldContinue = window.confirm("You have unsaved changes. Discard them and open another set?");
      if (!shouldContinue) {
        return;
      }
    }

    setDraftSet(toDraft(set));
    setEditorMessage(null);
  };

  const createSet = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const normalizedName = newSetName.trim();
    if (!normalizedName) {
      setCreateError("Give your measurement set a name before starting.");
      return;
    }

    if (draftSet && isDirty) {
      const shouldContinue = window.confirm("You have unsaved changes. Create a new set anyway?");
      if (!shouldContinue) {
        return;
      }
    }

    const timestamp = new Date().toISOString();
    const created: MeasurementSet = {
      id: crypto.randomUUID(),
      name: normalizedName,
      units: newSetUnit,
      measurements: createEmptyMeasurementValues(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setMeasurementSets((current) => [created, ...current]);
    setDraftSet(toDraft(created));
    setNewSetName("");
    setNewSetUnit("cm");
    setCreateError(null);
    setEditorMessage("New measurement set created. Fill the fields below and save.");
  };

  const deleteSet = (setId: string): void => {
    const target = measurementSets.find((set) => set.id === setId);
    if (!target) {
      return;
    }

    const shouldDelete = window.confirm(`Delete \"${target.name}\"? This cannot be undone.`);
    if (!shouldDelete) {
      return;
    }

    setMeasurementSets((current) => current.filter((set) => set.id !== setId));

    if (draftSet?.id === setId) {
      setDraftSet(null);
      setEditorMessage(null);
    }
  };

  const updateDraftField = (key: MeasurementKey, value: string): void => {
    if (!draftSet) {
      return;
    }

    if (value !== "" && !/^\d*(\.\d{0,2})?$/.test(value)) {
      return;
    }

    setDraftSet({
      ...draftSet,
      measurements: {
        ...draftSet.measurements,
        [key]: value,
      },
    });
  };

  const saveDraft = (): void => {
    if (!draftSet || !activeSet) {
      return;
    }

    const normalizedName = draftSet.name.trim();
    if (!normalizedName) {
      setEditorMessage("Set name is required before saving.");
      return;
    }

    const updatedAt = new Date().toISOString();

    const nextSet: MeasurementSet = {
      ...activeSet,
      name: normalizedName,
      units: draftSet.units,
      measurements: { ...draftSet.measurements },
      updatedAt,
    };

    setMeasurementSets((current) => {
      return current
        .map((set) => (set.id === nextSet.id ? nextSet : set))
        .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
    });

    setDraftSet(toDraft(nextSet));
    setEditorMessage(`Saved \"${normalizedName}\" at ${formatDateTime(updatedAt)}.`);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-10">
      <Link href="/" className="text-sm font-semibold text-accent transition-colors hover:text-[#0b6a6e]">
        Back to home
      </Link>

      <header className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Measurement workspace</p>
          <h1 className="mt-1 font-display text-4xl tracking-tight sm:text-5xl">Get measured</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            Create a measurement set, save it, and reuse it later. This page currently stores data in your browser only
            while backend storage is being built.
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-5">
          <article className="rounded-2xl border border-black/8 bg-white/85 p-5 shadow-sm">
            <h2 className="font-display text-2xl tracking-tight">Create a new set</h2>
            <p className="mt-2 text-sm text-muted">Name your set first, then start entering measurements.</p>
            <form className="mt-4 space-y-3" onSubmit={createSet}>
              <label className="block text-sm font-semibold text-foreground" htmlFor="measurement-set-name">
                Measurement set name
              </label>
              <input
                id="measurement-set-name"
                value={newSetName}
                onChange={(event) => {
                  setNewSetName(event.target.value);
                  if (createError) {
                    setCreateError(null);
                  }
                }}
                placeholder="Example: Faris - Wedding Suit"
                className="w-full rounded-xl border border-black/12 bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
              />

              <label className="block text-sm font-semibold text-foreground" htmlFor="measurement-unit">
                Units
              </label>
              <select
                id="measurement-unit"
                value={newSetUnit}
                onChange={(event) => setNewSetUnit(event.target.value === "in" ? "in" : "cm")}
                className="w-full rounded-xl border border-black/12 bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
              >
                <option value="cm">Metric (cm)</option>
                <option value="in">Imperial (inch)</option>
              </select>

              {createError ? <p className="text-sm font-medium text-[#9e3b1d]">{createError}</p> : null}

              <button
                type="submit"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0b6a6e]"
              >
                Start measurement set
              </button>
            </form>
          </article>

          <article className="rounded-2xl border border-black/8 bg-white/85 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl tracking-tight">Measurement history</h2>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {measurementSets.length} sets
              </span>
            </div>

            {measurementSets.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-black/20 bg-background px-4 py-4 text-sm text-muted">
                No measurement history yet. Create your first set above.
              </p>
            ) : null}

            <div className="mt-4 space-y-3">
              {measurementSets.map((set) => {
                const filled = countFilledMeasurements(set.measurements);
                const isOpen = draftSet?.id === set.id;
                return (
                  <article
                    key={set.id}
                    className={`rounded-xl border p-4 transition ${
                      isOpen
                        ? "border-accent/45 bg-accent-soft/45"
                        : "border-black/10 bg-surface hover:border-accent/30 hover:bg-white"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{set.name}</h3>
                        <p className="mt-1 text-xs text-muted">Updated {formatDateTime(set.updatedAt)}</p>
                        <p className="mt-1 text-xs text-muted">
                          {filled}/{measurementTotal} completed • {set.units === "cm" ? "Metric" : "Imperial"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openSet(set)}
                          className="rounded-full border border-accent/35 bg-white px-3 py-1.5 text-xs font-semibold text-accent transition hover:bg-accent-soft"
                        >
                          {isOpen ? "Editing" : "Open"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteSet(set.id)}
                          className="rounded-full border border-[#c7532b]/35 bg-white px-3 py-1.5 text-xs font-semibold text-[#9e3b1d] transition hover:bg-[#ffe6dc]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-black/8 bg-white/85 p-5 shadow-sm">
          {!draftSet ? (
            <div className="rounded-xl border border-dashed border-black/18 bg-background px-5 py-10 text-center">
              <h2 className="font-display text-2xl tracking-tight">No set selected</h2>
              <p className="mt-2 text-sm text-muted">
                Open an existing measurement set or create a new one to start entering values.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-muted" htmlFor="active-set-name">
                    Editing measurement set
                  </label>
                  <input
                    id="active-set-name"
                    value={draftSet.name}
                    onChange={(event) => {
                      setDraftSet({ ...draftSet, name: event.target.value });
                      if (editorMessage) {
                        setEditorMessage(null);
                      }
                    }}
                    className="mt-2 w-full rounded-xl border border-black/12 bg-surface px-4 py-2.5 text-base font-semibold text-foreground outline-none transition focus:border-accent"
                  />
                </div>
                <div className="w-full sm:w-44">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-muted" htmlFor="active-set-unit">
                    Units
                  </label>
                  <select
                    id="active-set-unit"
                    value={draftSet.units}
                    onChange={(event) => {
                      setDraftSet({ ...draftSet, units: event.target.value === "in" ? "in" : "cm" });
                      if (editorMessage) {
                        setEditorMessage(null);
                      }
                    }}
                    className="mt-2 w-full rounded-xl border border-black/12 bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
                  >
                    <option value="cm">Metric (cm)</option>
                    <option value="in">Imperial (inch)</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {filledCount}/{measurementTotal} completed
                </span>
                <span className="text-xs text-muted">Fields come from your provided Measurement Set PDF.</span>
                {isDirty ? <span className="text-xs font-semibold text-[#9e3b1d]">Unsaved changes</span> : null}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {measurementFields.map((field) => {
                  const unitLabel = field.kind === "angle" ? "°" : draftSet.units;

                  return (
                    <label key={field.key} className="rounded-xl border border-black/10 bg-surface px-3 py-2.5">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{field.label}</span>
                      <div className="mt-1.5 flex items-center rounded-lg border border-black/12 bg-white px-3 py-1.5">
                        <input
                          type="number"
                          min="0"
                          step={field.kind === "angle" ? "0.5" : "0.1"}
                          value={draftSet.measurements[field.key]}
                          onChange={(event) => {
                            updateDraftField(field.key, event.target.value);
                            if (editorMessage) {
                              setEditorMessage(null);
                            }
                          }}
                          placeholder="0"
                          className="w-full bg-transparent text-sm text-foreground outline-none"
                        />
                        <span className="text-xs font-semibold uppercase text-muted">{unitLabel}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0b6a6e]"
                >
                  Save measurement set
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (draftSet && isDirty) {
                      const shouldDiscard = window.confirm("Discard your unsaved changes?");
                      if (!shouldDiscard) {
                        return;
                      }
                    }
                    setDraftSet(activeSet ? toDraft(activeSet) : null);
                    setEditorMessage(null);
                  }}
                  className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
                >
                  Reset changes
                </button>
              </div>

              {editorMessage ? <p className="mt-4 text-sm font-medium text-muted">{editorMessage}</p> : null}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
