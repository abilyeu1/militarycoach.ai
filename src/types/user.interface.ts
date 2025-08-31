export interface IUser {
  _id: string;
  email: string;
  createdAt: string;
  dateOfBirth: string;
  profilePicture: string;
  type: string;
  password: string;
  firstName: string;
  lastName: string;
  militaryEmail: string;
  languages: string[];
  branchOfService: string;
  militaryRank: string;
  organizationID: string;
  organizationName: string;
  industryOfInterest: string;
  jobPositionOfInterest: string;
  jobPositionLevel: string;
  workExperience: WorkExperience[];
  education: any[];
  certificates: any[];
  stripeSubscriptionId: string;
  stripeSubscriptionStatus: string;
  isAdmin: boolean;
  freeMessagesLimitExhausted: boolean;
  messagesConsumed: number;
  messagesLimit: number;
  freeUserHoursLimit: number;
  profileStatus: string;
  resumeLink: any;
  __v: number;
  sheerIdApprovalStatus: any;
  stripeCustomerId: string;
  stripePriceId: string;
  age: any;
  fullName: string;
}

export interface WorkExperience {
  _id: string;
  careerField: string;
  jobTitle: string;
  skillsLeveragedInCareerField: string[];
}
