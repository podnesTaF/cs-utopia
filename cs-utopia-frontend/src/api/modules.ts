import { ResponseModule } from "@/models/IModule";
import { getIModule, getIModules } from "@/utils/transform-obj";
import { AxiosInstance } from "axios";

export const ModuleApi = (instance: AxiosInstance) => ({
  async getModules() {
    const {
      data: { data },
    } = await instance.get<{ data: ResponseModule[] }>("/modules?populate=theme.primary,theme.secondary");
    return getIModules(data);
  },
  async getModule(id: number) {
    const {
      data: { data },
    } = await instance.get<{ data: any }>(
      "/modules/" + id + "?fields=name,content&populate=theme.primary,theme.secondary"
    );
    return getIModule(data);
  }
});
