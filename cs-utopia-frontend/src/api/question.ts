import { ResponseQuestion } from "@/models/IQuestion";
import { getIQuestions } from "@/utils/transform-obj";
import { AxiosInstance } from "axios";

export const QuestionApi = (instance: AxiosInstance) => ({
  async getByModule(id: number) {
    const {
      data: { data },
    } = await instance.get<{ data: ResponseQuestion[] }>(
      "/questions?populate=answers&filters[module][id][$eq]=" + id
    );

    const transformed = getIQuestions(data);

    return transformed;
  },
});
