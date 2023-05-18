import { ResponseAnswer } from "@/models/IAnswer";
import { getIAnswer } from "@/utils/transform-obj";
import { AxiosInstance } from "axios";

export const AnswerApi = (instance: AxiosInstance) => ({
  async getAnswersByQuestion(id: number) {
    const {
      data: { data },
    } = await instance.get<{ data: ResponseAnswer[] }>(
      "/answers?filters[question][id][$eq]=" + id
    );

    const transformed = getIAnswer(data);

    return transformed;
  },
});
