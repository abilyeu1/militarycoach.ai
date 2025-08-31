export interface IChat {
  _id: string;
  userID: string;
  toolName: string;
  conversation: IConversation[];
  createdAt: string;
  __v: number;
}

export interface IConversation {
  role: string;
  content: string;
}
