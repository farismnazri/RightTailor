export type MeasurementUnit = "cm" | "in";
export type MeasurementKind = "length" | "angle";

export type MeasurementField = {
  key: string;
  label: string;
  kind: MeasurementKind;
};

export const measurementFields: MeasurementField[] = [
  { key: "ankle_circumference", label: "Ankle circumference", kind: "length" },
  { key: "biceps_circumference", label: "Biceps circumference", kind: "length" },
  { key: "bust_front", label: "Bust front", kind: "length" },
  { key: "bust_point_to_underbust", label: "Bust point to underbust", kind: "length" },
  { key: "bust_span", label: "Bust span", kind: "length" },
  { key: "chest_circumference", label: "Chest circumference", kind: "length" },
  { key: "cross_seam", label: "Cross seam", kind: "length" },
  { key: "cross_seam_front", label: "Cross seam front", kind: "length" },
  { key: "crotch_depth", label: "Crotch depth", kind: "length" },
  { key: "head_circumference", label: "Head circumference", kind: "length" },
  { key: "heel_circumference", label: "Heel circumference", kind: "length" },
  { key: "high_bust", label: "High bust", kind: "length" },
  { key: "high_bust_front", label: "High bust front", kind: "length" },
  { key: "hips_circumference", label: "Hips circumference", kind: "length" },
  { key: "hps_to_bust", label: "HPS to bust", kind: "length" },
  { key: "hps_to_waist_back", label: "HPS to waist back", kind: "length" },
  { key: "hps_to_waist_front", label: "HPS to waist front", kind: "length" },
  { key: "inseam", label: "Inseam", kind: "length" },
  { key: "knee_circumference", label: "Knee circumference", kind: "length" },
  { key: "neck_circumference", label: "Neck circumference", kind: "length" },
  { key: "seat_circumference", label: "Seat circumference", kind: "length" },
  { key: "seat_back", label: "Seat back", kind: "length" },
  { key: "shoulder_slope", label: "Shoulder slope", kind: "angle" },
  { key: "shoulder_to_elbow", label: "Shoulder to elbow", kind: "length" },
  { key: "shoulder_to_shoulder", label: "Shoulder to shoulder", kind: "length" },
  { key: "shoulder_to_wrist", label: "Shoulder to wrist", kind: "length" },
  { key: "underbust", label: "Underbust", kind: "length" },
  { key: "upper_leg_circumference", label: "Upper leg circumference", kind: "length" },
  { key: "waist_circumference", label: "Waist circumference", kind: "length" },
  { key: "waist_back", label: "Waist back", kind: "length" },
  { key: "waist_to_armpit", label: "Waist to armpit", kind: "length" },
  { key: "waist_to_floor", label: "Waist to floor", kind: "length" },
  { key: "waist_to_hips", label: "Waist to hips", kind: "length" },
  { key: "waist_to_knee", label: "Waist to knee", kind: "length" },
  { key: "waist_to_seat", label: "Waist to seat", kind: "length" },
  { key: "waist_to_underbust", label: "Waist to underbust", kind: "length" },
  { key: "waist_to_upper_leg", label: "Waist to upper leg", kind: "length" },
  { key: "wrist_circumference", label: "Wrist circumference", kind: "length" },
];

export type MeasurementKey = (typeof measurementFields)[number]["key"];

export type MeasurementValues = Record<MeasurementKey, string>;

export type MeasurementSet = {
  id: string;
  name: string;
  units: MeasurementUnit;
  measurements: MeasurementValues;
  createdAt: string;
  updatedAt: string;
};

export const createEmptyMeasurementValues = (): MeasurementValues => {
  return measurementFields.reduce<MeasurementValues>((accumulator, field) => {
    accumulator[field.key] = "";
    return accumulator;
  }, {} as MeasurementValues);
};
