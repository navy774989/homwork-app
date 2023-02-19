import { httpClient } from "./httpClient";
import { TagProps } from "./types/TagProps";

export const getTags = () => {
  return httpClient.get<TagProps>(
    "tags?pagesize=10&order=desc&sort=popular&site=stackoverflow"
  );
};
