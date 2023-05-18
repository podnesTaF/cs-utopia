import { IAnswer, ResponseAnswer } from "@/models/IAnswer";
import { IModule, ResponseModule } from "@/models/IModule";
import { IQuestion, ResponseQuestion } from "@/models/IQuestion";

export const getIModules = (data: ResponseModule[]): IModule[] => {
  return data.map((module) => (getIModule(module)))
};

export const getIQuestions = (data: ResponseQuestion[]): IQuestion[] => {
  return data.map((question: ResponseQuestion) => ({
    id: question.id,
    ...question.attributes,
    answers: getIAnswer(question.attributes.answers.data),
  }));
};

export const getIAnswer = (data: ResponseAnswer[]): IAnswer[] => {
  return data.map((answer) => ({
    id: answer.id,
    ...answer.attributes,
  }));
};

export const getIModule = (data: any): IModule => {
  if (data.attributes.theme.data) {
    const { primary, secondary } = data.attributes.theme.data.attributes;
    const theme = { primary, secondary };
    return {
      id: data.id,
      ...data.attributes,
      theme,
    };
  }
  return {
    id: data.id,
    ...data.attributes,
    theme: null,
  };
};
