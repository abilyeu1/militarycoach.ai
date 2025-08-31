import * as Yup from "yup";

export const militarianRegistrationForm = {
  // =================================== Personal Details ===================================

  fullName: Yup.string()
    .min(2, "First Name is too short (minimum 2 characters)")
    .required("Full Name is required")
    .max(50, "First Name is too long (maximum 50 characters)"),

  age: Yup.string().matches(
    /^(1[89]|[2-9]\d|\d)$/,
    "Age should be a number between 18 and 100",
  ),
  // Other fields...

  branchOfServices: Yup.string()
    .required()
    .max(50, "Branch of Services is too long (maximum 50 characters)"),

  languages: Yup.array().of(Yup.string().required("Language is required")),

  rank: Yup.string()
    .required()
    .max(50, "Rank is too long (maximum 50 characters)"),

  // =================================== Work Experience ===================================

  careerField: Yup.string().max(
    50,
    "Career Field is too long (maximum 50 characters)",
  ),

  jobPositionLevel: Yup.string().max(
    50,
    "Job Position Level is too long (maximum 50 characters)",
  ),
  jobTitle: Yup.string().max(
    200,
    "Job Title is too long (maximum 50 characters)",
  ),

  dischargeDate: Yup.date(),

  levelOfEducation: Yup.string().max(
    50,
    "Education Type is too long (maximum 50 characters)",
  ),

  positionOfInterest: Yup.string().max(
    50,
    "Position of Interest is too long (maximum 50 characters)",
  ),
  nameOfInstitution: Yup.string().max(
    100,
    "Name of Institute is too long (maximum 100 characters)",
  ),
  degreeAndFieldOfStudy: Yup.string().max(
    100,
    "Field of Study is too long (maximum 100 characters)",
  ),
  name: Yup.string().max(
    100,
    "Certificate Name is too long (maximum 100 characters)",
  ),
};

export const militarianRegistrationFormInitialValues = {
  fullName: "",
  age: 0,
  branchOfServices: "",
  rank: "",
  languages: [],
  levelOfEducation: "",
  experience: [],
  careerField: "",
  jobTitle: "",
  careerfieldEdit: "",
  jobTitleEdit: "",
  skillsLeveragedInCareerFieldEdit: [],
  skillsInCareerField: [],
  industryOfInterest: "",
  positionOfInterest: "",
  jobPositionLevel: "",
  nameOfInstitution: "",
  degreeAndFieldOfStudy: "",
  JobLocation: "",
  name: "",
  edu: [],
  certificates: [],
};

export interface IMilitarianRegistrationForm {
  fullName: string;
  age: number;
  branchOfServices: string;
  rank: string;
  languages: string[];
  levelOfEducation: string;
  workExperience: any[];
  careerField: string;
  jobTitle: string;
  careerfieldEdit: string;
  jobTitleEdit: string;
  skillsLeveragedInCareerFieldEdit: string[];
  skillsInCareerField: string[];
  industryOfInterest: string;
  positionOfInterest: string;
  jobPositionLevel: string;
  nameOfInstitution: string;
  degreeAndFieldOfStudy: string;
  name: string;
  education: any[];
  certificates: any[];
  email: string;
  password: string;
  type: string;
  profilePicture: string;
  militaryRank: string;
  branchOfService: string;
  jobPositionOfInterest: String;
  JobLocation: String;
  isAdmin: boolean;
  resumeLink: string | null;
}
