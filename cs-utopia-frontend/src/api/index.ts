import axios from "axios";
import { AnswerApi } from "./answer";
import { ModuleApi } from "./modules";
import { QuestionApi } from "./question";

interface ApiReturnType {
  question: ReturnType<typeof QuestionApi>;
  module: ReturnType<typeof ModuleApi>;
  answer: ReturnType<typeof AnswerApi>;
}

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: "https://ps-utopia-server.up.railway.app/api",
  });

  return {
    answer: AnswerApi(instance),
    question: QuestionApi(instance),
    module: ModuleApi(instance),
  };
};
