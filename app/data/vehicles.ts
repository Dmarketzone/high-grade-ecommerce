// UI examples, deliberately independent of product fitment. These are not
// assertions that a model was sold in every year offered by the selector.
export const VEHICLE_MAKES = [
  {
    id: 'porsche',
    name: 'Porsche',
    models: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  },
  {
    id: 'bmw',
    name: 'BMW',
    models: ['3 Series', '5 Series', 'M3', 'M4', 'X3', 'X5'],
  },
  {
    id: 'mercedes-benz',
    name: 'Mercedes-Benz',
    models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'G-Class'],
  },
] as const;
export const VEHICLE_YEARS = Array.from({length: 17}, (_, index) =>
  String(2026 - index),
);
export interface VehicleSelection {
  make: string;
  model: string;
  year: string;
  trim?: string;
  generation?: string;
  factoryAudio?: string;
}
export type FitmentResult =
  | {status: 'needs-verification'; selection: VehicleSelection; message: string}
  | {status: 'incomplete'; message: string};
export function resolveVehicle(selection: VehicleSelection): FitmentResult {
  const make = VEHICLE_MAKES.find((item) => item.id === selection.make);
  if (
    !make ||
    !make.models.some((model) => model === selection.model) ||
    !VEHICLE_YEARS.includes(selection.year)
  ) {
    return {
      status: 'incomplete',
      message:
        'Choose a make, model and year to prepare a compatibility consultation.',
    };
  }
  return {
    status: 'needs-verification',
    selection,
    message:
      'Fitment is not yet verified. Factory audio, generation and installation requirements must be checked by High Grade.',
  };
}
