export interface LocationOption {
  id: string;
  name: string;
}

export interface PollingUnitOption extends LocationOption {
  code: string;
}

export interface ResultUploadLocations {
  states: LocationOption[];
  lgas: (LocationOption & { stateId: string })[];
  wards: (LocationOption & { lgaId: string })[];
  pollingUnits: (PollingUnitOption & { wardId: string })[];
}
