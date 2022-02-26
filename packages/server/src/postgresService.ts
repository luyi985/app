import { SingleService } from "./types";

export const postgresService: SingleService<{ d: any }> = (envs) => {
  return { d: "" };
};
