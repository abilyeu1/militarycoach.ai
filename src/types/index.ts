import { Dispatch, SetStateAction } from "react";
import { boolean, string } from "yup";
import { IChat } from "./chat.interface";

export interface SignUpFormValues {
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface WorkExperience {
  careerField: string;
  jobTitle: string;
  skillsLeveragedInCareerField: string[];
}

export interface Education {
  levelOfEducation: string;
  nameOfInstitution: string;
  degreeAndFieldOfStudy: string;
}

export interface Certificate {
  certificateName?: string;
  name?: string;
}

export type Industryofinterest = {
  subOptions?: any;
  value: string;
  label: string;
};
export type JobPositionLevel = {
  value: string;
  label: string;
};
export type Style = {
  value: string;
  label: string;
};
export type Tone = {
  value: string;
  label: string;
};
export type Ranks = {
  value: string;
  label: string;
};
export type BranchOfServices = {
  value: string;
  label: string;
};
export type LevelOfEducation = {
  value: string;
  label: string;
};

export interface EducationProps {
  handleStepClick: (a: number) => void;
  handleAddEducation: () => void;
  levelOfEducation: LevelOfEducation[];
  educations: Education[];
  editIndex: number;
  handleCancelEdit: (a: number) => void;
  handleDelete: (a: number) => void;
  certficates: Certificate[];
  handleEdit: (a: number) => void;
  handleEditCertificate: (a: number) => void;
  handleInputChangeCertificate: any;
  handleSaveEditCertificate: (a: number) => void;
  handleCancelEditCertificate: (a: number) => void;
  handleDeleteCertificate: (a: number) => void;
  handleEditChangeCertificate: any;
  handleSaveEdit: (a: number) => void;
  handleAddCertificate: any;
  handleInputChange: any;
  handleEditChange: any;
  formik: any;
  educationsEditIndex: any;
  educationErrorMessage: string;
  certificateErrorMessage: string;
}

export interface WorkExperienceProps {
  handleAddExperience: any;
  handleInputChange: any;
  editIndex: number;
  handleEditChange: any;
  handleSaveEdit: (a: number) => void;
  handleCancelEdit: () => void;
  handleEdit: (a: number) => void;
  handleDelete: (a: number) => void;
  handleStepClick: (a: number, previous?: boolean) => void;
  errorMessage: string;
  formik: any;
  skills: any;
  onChipsChange?: (chips: string[]) => void;
  chips: any;
  inputValue?: any;
  handleInputChanges: any;
  handleInputKeyPress: any;
  handleChipDelete: any;
  inputValueSkillsEdit: any;
  handleInputClickSkills: any;
  displaySuggestions: any;
  onInputClick: any;
  onInputChange: any;
  selectedSuggestion: any;
  onSuggestionClick: any;
  setDisplaySuggestions: any;
}

export interface Skill {
  value: string;
  label: string;
}

export interface Chip {
  id: number;
  text: string;
}

export interface BulletProps {
  isCopied: boolean;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  handleInputChange: (e: any) => void;
  handleButtonClick: any;
  handleCopyClick: any;
  text: string;
  translatedData: string;
  handleLikeClick: () => void;
  deleteFav: (id: string) => void;
  addFav: () => void;
  getFavourites: any;
}

export interface LikedResponse {
  id: number;
  data: string;
  prompt: string;
}
export interface FavoriteItem {
  bullet: string;
  translation: string;
}

export type InterviewQuestion = {
  title: string;
  description: string;
};

export type Quotes = {
  title: string;
  id: number;
};

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  [key: string]: any;
}

export interface LeftBarProps {
  children: React.ReactNode;
  title: string;
  description: string;
  routerPath: string;
  className: string;
}

export interface RightBarProps {
  children: React.ReactNode;
  className: string;
}

export interface HOCIProps {
  children: React.ReactNode;
}

export interface TipsProps {
  children?: React.ReactNode;
  [key: string]: any;
  position: string;
  top: string;
}

export interface HistoryProps {
  slug: string;
  chats: IChat[];
}
