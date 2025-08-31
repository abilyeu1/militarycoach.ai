import { Certificate, Education, LevelOfEducation } from ".";

export interface PersonalDetailsProps {
  handleStepClick: (a: number) => void;
  formik: any;
  handleFileChange: any;
  langError?: boolean;
  onSelectLang: (selectedList: any) => void;
  languages: string[];
  setLanguages: (languages: string[]) => void;
}

export interface WorkExperienceProps {
  handleAddExperience: () => void;
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
}

export interface EducationProps {
  handleStepClick: (a: number) => void;
  handleAddEducation: () => void;
  levelOfEducation: LevelOfEducation[];
  educations: Education[];
  editIndex: number;
  handleCancelEdit: (a: number) => void;
  handleDelete: (a: number) => void;
  certificates: Certificate[];
  handleEdit: (a: number) => void;
  handleEditCertificate: (a: number) => void;
  handleInputChangeCertificate: any;
  handleSaveEditCertificate: (a: number) => void;
  handleCancelEditCertificate: (a: number) => void;
  handleDeleteCertificate: (a: number) => void;
  handleEditChangeCertificate: any;
  handleSaveEdit: (a: number) => void;
  handleAddCertificate: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Education,
  ) => void;
  formik: any;
  educationsEditIndex: number;
  educationErrorMessage: string;
  certificateErrorMessage: string;
  formSubmissionLoader: boolean;
}
