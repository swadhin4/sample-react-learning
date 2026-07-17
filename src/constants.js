export const INITIAL_EMPLOYEE = {
  firstName: "Sample Learning 1",
  lastName: "Sample Learning 2",
  dob: "Sample Learning 3",
  ssn: "Sample Learning 4"
};

export const INITIAL_CUSTOMER = {
  name: "Sample Learning 5",
  subName: "Sample Learning 6",
  subCode: "Sample Learning 7",
  divSerial: "Sample Learning 8",
  locName: "Sample Learning 9",
  locCode: "Sample Learning 10"
};

export const DEFAULT_CHANNEL = "Sample Learning 19";

export const CATEGORIES_DATA = {
  "Sample Learning 11": [
    "Sample Learning 13",
    "Sample Learning 14",
    "Sample Learning 15"
  ],
  "Sample Learning 12": [
    "Sample Learning 16",
    "Sample Learning 17",
    "Sample Learning 18"
  ]
};

export const FAVORITES = [
  { category: "Sample Learning 11", letter: "Sample Learning 13" },
  { category: "Sample Learning 12", letter: "Sample Learning 16" }
];

export const DISTRIBUTION_METHODS = [
  'Sample Learning 19',
  'Sample Learning 20',
  'Sample Learning 21'
];

export const MOCK_CLAIMS = {
  "CLM-7719": {
    employee: { firstName: "Sample Learning 22", mi: "A", lastName: "Sample Learning 23", dob: "Sample Learning 24", ssn: "Sample Learning 25" },
    customer: { name: "Sample Learning 26", id: "Sample Learning 27", subName: "Sample Learning 28", subCode: "Sample Learning 29", locName: "Sample Learning 30", locCode: "Sample Learning 31" },
    claimInfo: { claimNumber: "CLM-7719", assocClaimNumber: "Sample Learning 32", disabilityDate: "Sample Learning 33", product: "Sample Learning 34", claimStatus: "Sample Learning 35", officeNumber: "Sample Learning 36" },
    benefitInfo: { class: "Sample Learning 37", funding: "Sample Learning 38", banking: "Sample Learning 39", calcs: "Sample Learning 40" }
  },
  "CLM-8820": {
    employee: { firstName: "Sample Learning 41", mi: "B", lastName: "Sample Learning 42", dob: "Sample Learning 43", ssn: "Sample Learning 44" },
    customer: { name: "Sample Learning 45", id: "Sample Learning 46", subName: "Sample Learning 47", subCode: "Sample Learning 48", locName: "Sample Learning 49", locCode: "Sample Learning 50" },
    claimInfo: { claimNumber: "CLM-8820", assocClaimNumber: "Sample Learning 51", disabilityDate: "Sample Learning 52", product: "Sample Learning 53", claimStatus: "Sample Learning 54", officeNumber: "Sample Learning 55" },
    benefitInfo: { class: "Sample Learning 56", funding: "Sample Learning 57", banking: "Sample Learning 58", calcs: "Sample Learning 59" }
  },
  "CLM-9930": {
    employee: { firstName: "Sample Learning 60", mi: "C", lastName: "Sample Learning 61", dob: "Sample Learning 62", ssn: "Sample Learning 63" },
    customer: { name: "Sample Learning 64", id: "Sample Learning 65", subName: "Sample Learning 66", subCode: "Sample Learning 67", locName: "Sample Learning 68", locCode: "Sample Learning 69" },
    claimInfo: { claimNumber: "CLM-9930", assocClaimNumber: "Sample Learning 70", disabilityDate: "Sample Learning 71", product: "Sample Learning 72", claimStatus: "Sample Learning 73", officeNumber: "Sample Learning 74" },
    benefitInfo: { class: "Sample Learning 75", funding: "Sample Learning 76", banking: "Sample Learning 77", calcs: "Sample Learning 78" }
  }
};

export const getClaimData = (claimNum) => {
  const norm = claimNum.toUpperCase().trim();
  if (MOCK_CLAIMS[norm]) {
    return MOCK_CLAIMS[norm];
  }
  return {
    employee: {
      firstName: "Sample Learning 79",
      mi: "D",
      lastName: "Sample Learning 80",
      dob: "Sample Learning 81",
      ssn: "Sample Learning 82"
    },
    customer: {
      name: "Sample Learning 83",
      id: "Sample Learning 84",
      subName: "Sample Learning 85",
      subCode: "Sample Learning 86",
      locName: "Sample Learning 87",
      locCode: "Sample Learning 88"
    },
    claimInfo: {
      claimNumber: norm,
      assocClaimNumber: "Sample Learning 89",
      disabilityDate: "Sample Learning 90",
      product: "Sample Learning 91",
      claimStatus: "Sample Learning 92",
      officeNumber: "Sample Learning 93"
    },
    benefitInfo: {
      class: "Sample Learning 94",
      funding: "Sample Learning 95",
      banking: "Sample Learning 96",
      calcs: "Sample Learning 97"
    }
  };
};
