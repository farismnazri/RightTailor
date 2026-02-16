"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Grainient from "@/components/Grainient";
import Silk from "@/components/Silk";
import {
  createEmptyMeasurementValues,
  measurementFields,
  MeasurementFieldKey,
  MeasurementUnit,
  MeasurementValues,
} from "./measurement-fields";

type TabId = "book_appointment" | "input_measurement";

type Notice = {
  type: "success" | "error";
  message: string;
} | null;

const APPOINTMENT_STORAGE_KEY = "righttailor_appointments_v1";
const MEASUREMENT_STORAGE_KEY = "righttailor_measurement_sets_v1";

const readStoredArray = (key: string): unknown[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const countCompletedFields = (values: MeasurementValues): number => {
  return measurementFields.reduce((total, field) => {
    return values[field.key].trim().length > 0 ? total + 1 : total;
  }, 0);
};

const paxOptions = Array.from({ length: 10 }, (_, index) => String(index + 1));

export default function GetMeasuredPage() {
  const [activeTab, setActiveTab] = useState<TabId>("book_appointment");

  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentEmail, setAppointmentEmail] = useState("");
  const [appointmentPax, setAppointmentPax] = useState("1");
  const [appointmentNotice, setAppointmentNotice] = useState<Notice>(null);

  const [measurementSetName, setMeasurementSetName] = useState("");
  const [measurementImageUrl, setMeasurementImageUrl] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>("cm");
  const [measurementValues, setMeasurementValues] = useState<MeasurementValues>(createEmptyMeasurementValues());
  const [measurementNotice, setMeasurementNotice] = useState<Notice>(null);

  const completedCount = useMemo(() => countCompletedFields(measurementValues), [measurementValues]);

  const submitAppointment = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const normalizedName = appointmentName.trim();
    const normalizedEmail = appointmentEmail.trim();

    if (!normalizedName || !normalizedEmail || !appointmentPax) {
      setAppointmentNotice({
        type: "error",
        message: "Please fill in name, email, and pax before submitting.",
      });
      return;
    }

    const payload = {
      id: crypto.randomUUID(),
      name: normalizedName,
      email: normalizedEmail,
      pax: Number(appointmentPax),
      createdAt: new Date().toISOString(),
    };

    const existing = readStoredArray(APPOINTMENT_STORAGE_KEY);
    window.localStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify([payload, ...existing]));

    setAppointmentNotice({
      type: "success",
      message: "Appointment request saved locally. Backend database integration is next.",
    });
    setAppointmentName("");
    setAppointmentEmail("");
    setAppointmentPax("1");
  };

  const updateMeasurementField = (key: MeasurementFieldKey, rawValue: string): void => {
    if (rawValue !== "" && !/^\d*(\.\d{0,2})?$/.test(rawValue)) {
      return;
    }

    setMeasurementValues((current) => ({
      ...current,
      [key]: rawValue,
    }));
  };

  const submitMeasurementSet = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const normalizedSetName = measurementSetName.trim();
    if (!normalizedSetName) {
      setMeasurementNotice({
        type: "error",
        message: "Measurement set name is required.",
      });
      return;
    }

    const payload = {
      id: crypto.randomUUID(),
      name: normalizedSetName,
      imageUrl: measurementImageUrl.trim() || null,
      units: measurementUnit,
      measurements: measurementValues,
      createdAt: new Date().toISOString(),
      source: "input_measurement_tab",
    };

    const existing = readStoredArray(MEASUREMENT_STORAGE_KEY);
    window.localStorage.setItem(MEASUREMENT_STORAGE_KEY, JSON.stringify([payload, ...existing]));

    setMeasurementNotice({
      type: "success",
      message: "Measurement set saved locally. Backend database integration is next.",
    });
    setMeasurementSetName("");
    setMeasurementImageUrl("");
    setMeasurementUnit("cm");
    setMeasurementValues(createEmptyMeasurementValues());
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-clip pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={0} rotation={0} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="h-full w-full opacity-40">
          <Grainient
            color1="#1c5182"
            color2="#002757"
            color3="#04060c"
            timeSpeed={0.55}
            colorBalance={-0.2}
            warpStrength={4}
            warpFrequency={12}
            warpSpeed={0.3}
            warpAmplitude={80}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={1.25}
            grainAmount={0}
            grainScale={2}
            grainAnimated={false}
            contrast={1.05}
            gamma={1.3}
            saturation={1}
            centerX={0.25}
            centerY={-0.21}
            zoom={0.9}
          />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020611]/20 to-[#020611]/45" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#2f7ab8]/28 blur-3xl" />
        <div className="absolute -right-24 bottom-[-100px] h-[360px] w-[360px] rounded-full bg-[#031e45]/55 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-8 pt-8 sm:px-10 lg:px-12">
        <Link href="/" className="text-sm font-semibold text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.75)]">
          Back to home
        </Link>

        <header className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.75)]">
            Measurement workspace
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-5xl">
            Get measured
          </h1>
          <p className="mt-3 max-w-3xl text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.72)]">
            Book appointments or input full measurement sets from the FreeSewing Measurement Set structure. Entries are
            saved locally for now until backend database wiring is added.
          </p>
        </header>

        <section className="glass-card mt-8 rounded-3xl border border-white/15 p-5 shadow-sm sm:p-8">
          <div className="inline-flex rounded-2xl border border-black/10 bg-white/70 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("book_appointment")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === "book_appointment"
                  ? "bg-accent text-white"
                  : "text-foreground/70 hover:bg-white hover:text-foreground"
              }`}
            >
              Book appointment
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("input_measurement")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === "input_measurement"
                  ? "bg-accent text-white"
                  : "text-foreground/70 hover:bg-white hover:text-foreground"
              }`}
            >
              Input measurement
            </button>
          </div>

          {activeTab === "book_appointment" ? (
            <form className="mt-6 max-w-xl space-y-4" onSubmit={submitAppointment}>
              <div>
                <label className="text-sm font-semibold text-foreground" htmlFor="appointment-name">
                  Name
                </label>
                <input
                  id="appointment-name"
                  type="text"
                  value={appointmentName}
                  onChange={(event) => {
                    setAppointmentName(event.target.value);
                    if (appointmentNotice) {
                      setAppointmentNotice(null);
                    }
                  }}
                  className="mt-1 w-full rounded-xl border border-black/12 bg-white/90 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground" htmlFor="appointment-email">
                  Email
                </label>
                <input
                  id="appointment-email"
                  type="email"
                  value={appointmentEmail}
                  onChange={(event) => {
                    setAppointmentEmail(event.target.value);
                    if (appointmentNotice) {
                      setAppointmentNotice(null);
                    }
                  }}
                  className="mt-1 w-full rounded-xl border border-black/12 bg-white/90 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground" htmlFor="appointment-pax">
                  Get tailored: pax
                </label>
                <select
                  id="appointment-pax"
                  value={appointmentPax}
                  onChange={(event) => {
                    setAppointmentPax(event.target.value);
                    if (appointmentNotice) {
                      setAppointmentNotice(null);
                    }
                  }}
                  className="mt-1 w-full rounded-xl border border-black/12 bg-white/90 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
                >
                  {paxOptions.map((pax) => (
                    <option key={pax} value={pax}>
                      {pax}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b6a6e]"
              >
                Submit appointment
              </button>

              {appointmentNotice ? (
                <p
                  className={`text-sm font-medium ${
                    appointmentNotice.type === "success" ? "text-[#0f7f84]" : "text-[#a83c1f]"
                  }`}
                >
                  {appointmentNotice.message}
                </p>
              ) : null}
            </form>
          ) : (
            <form className="mt-6" onSubmit={submitMeasurementSet}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-foreground" htmlFor="measurement-name">
                    Measurement set name
                  </label>
                  <input
                    id="measurement-name"
                    type="text"
                    value={measurementSetName}
                    onChange={(event) => {
                      setMeasurementSetName(event.target.value);
                      if (measurementNotice) {
                        setMeasurementNotice(null);
                      }
                    }}
                    className="mt-1 w-full rounded-xl border border-black/12 bg-white/90 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
                    placeholder="Example: Faris - Suit v1"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground" htmlFor="measurement-image-url">
                    Image URL (optional)
                  </label>
                  <input
                    id="measurement-image-url"
                    type="url"
                    value={measurementImageUrl}
                    onChange={(event) => setMeasurementImageUrl(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/12 bg-white/90 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-foreground">Units:</span>
                <button
                  type="button"
                  onClick={() => setMeasurementUnit("cm")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    measurementUnit === "cm"
                      ? "bg-accent text-white"
                      : "border border-black/15 bg-white text-foreground hover:border-accent/45"
                  }`}
                >
                  Metric (cm)
                </button>
                <button
                  type="button"
                  onClick={() => setMeasurementUnit("in")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    measurementUnit === "in"
                      ? "bg-accent text-white"
                      : "border border-black/15 bg-white text-foreground hover:border-accent/45"
                  }`}
                >
                  Imperial (inch)
                </button>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {completedCount}/{measurementFields.length} completed
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {measurementFields.map((field) => (
                  <label key={field.key} className="rounded-xl border border-black/10 bg-white/85 px-3 py-2.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{field.label}</span>
                    <div className="mt-1.5 flex items-center rounded-lg border border-black/12 bg-white px-3 py-1.5">
                      <input
                        type="number"
                        min="0"
                        step={field.kind === "angle" ? "0.5" : "0.1"}
                        value={measurementValues[field.key]}
                        onChange={(event) => updateMeasurementField(field.key, event.target.value)}
                        placeholder="0"
                        className="w-full bg-transparent text-sm text-foreground outline-none"
                      />
                      <span className="text-xs font-semibold uppercase text-muted">
                        {field.kind === "angle" ? "°" : measurementUnit}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b6a6e]"
              >
                Save measurement set
              </button>

              {measurementNotice ? (
                <p
                  className={`mt-4 text-sm font-medium ${
                    measurementNotice.type === "success" ? "text-[#0f7f84]" : "text-[#a83c1f]"
                  }`}
                >
                  {measurementNotice.message}
                </p>
              ) : null}
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
