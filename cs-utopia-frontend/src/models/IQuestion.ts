import { IAnswer, ResponseAnswer } from "./IAnswer";

export type ResponseQuestion = {
  id: number;
  attributes: {
    title: string;
    type: QuestionType;
    hint: string;
    snippet: null | string;
    boxes: null | string;
    answers: {
      data: ResponseAnswer[];
    };
  };
};

export enum QuestionType {
  single = "single",
  multiple = "multiple",
  dragable = "dragable",
  order = "order",
}

export type IQuestion = {
  id: number;
  title: string;
  type: QuestionType;
  hint: string;
  snippet: null | string;
  boxes: null | string;
  answers: IAnswer[];
};
