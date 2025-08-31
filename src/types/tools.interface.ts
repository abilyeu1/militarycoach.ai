export interface CareerWizardRequirementBarProps {
  fields: any;
  setFields: any;
  handleCareerWizardResponse: any;
  loader: boolean;
  history: any;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isGenerating: boolean;
  recommendations: string[];
  setRecommendations: Function;
  jobLocation: string;
  setJobLocation: React.Dispatch<React.SetStateAction<string>>;
}

export interface CareerWizardChatBarProps {
  careerWizardResponse: string;
  questions: any;
  handleQuestionClick: (ques: any) => void;
  selectedQuestion: string;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleCareerWizardResponse: any;
  setStartConversation: React.Dispatch<React.SetStateAction<boolean>>;
  startConversation: boolean;
  loader: boolean;
  clearConversation: any;
  saveChat: any;
  history: any;
  isGenerating: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isSkeletonCodeVisible: boolean;
  setIsSkeletonCodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MockInterViewPrepChatBarProps {
  careerWizardResponse: string;
  questions: any;
  handleQuestionClick: (ques: any) => void;
  selectedQuestion: string;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleCareerWizardResponse: any;

  setStartConversation: React.Dispatch<React.SetStateAction<boolean>>;
  startConversation: boolean;
  loader: boolean;
  clearConversation: any;
  saveChat: any;
  history: any;
  isGenerating: boolean;
  isSkeletonCodeVisible: boolean;
}

export interface MockInterViewPrepRequirementBarProps {
  fields: any;
  setFields: any;
  handleCareerWizardResponse: any;
  loader: boolean;
  history: any;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isGenerating: boolean;
}

export interface CoverLetterWizardChatBarProps {
  coverLetterResponse: any;
  isEditing: boolean;
  handleSaveClick: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedText: any;
  handleEditClick: () => void;
  editedText: any;
  handleCopyClick: () => void;
  saveChat: any;
  loader: boolean;
  isGenerating: boolean;
  clearConversation: any;
  isSkeletonCodeVisible: boolean;
  setIsSkeletonCodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface CoverLetterWizardRequirementBarProps {
  handleGenerate: any;
  setFields: any;
  fields: any;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isGenerating: boolean;
  coverLetterResponse: string;
}

export interface SkillsGapAnalysisChatBarProps {
  careerWizardResponse: any;
  questions: any;
  handleQuestionClick: (ques: any) => void;
  selectedQuestion: string;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleCareerWizardResponse: any;
  setStartConversation: any;
  startConversation: boolean;
  loader: boolean;
  clearConversation: any;
  saveChat: any;
  history: any;
  isGenerating: boolean;
  isSkeletonCodeVisible: any;
}

export interface SkillsGapAnalysisRequirementBarProps {
  fields: any;
  setFields: any;
  handleCareerWizardResponse: any;
  loader: boolean;
  history: any;
  errorMessage: string;
  setErrorMessage: any;
  isGenerating: boolean;
}
