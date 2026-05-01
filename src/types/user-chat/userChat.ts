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
