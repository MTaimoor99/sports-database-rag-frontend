export interface UserQueryRequest {
  query: string;
}

export interface AnswerBlock {
  type: "text";
  text: string;
}

export interface UserQueryResponse {
  answer: AnswerBlock[];
}

export interface Message {
  role: "user" | "assistant";
  text: string;
}