import { httpClient } from "./httpClient";
import { TagProps } from "./types/TagProps";

export const getTags = () => {
  return httpClient.get<TagProps>("tags", {
    params: {
      pagesize: 10,
      order: "desc",
      sort: "popular",
      site: "stackoverflow",
      key: "Wdfc9cBtdTIgfost7oOE0A((",
    },
  });
};
