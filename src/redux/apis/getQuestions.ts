import { httpClient } from "./httpClient";
import { QuestionsProps } from "./types/QuestionsProps";

export const getQuestions = ({
  q,
  tags,
  page,
}: {
  q?: string;
  tags?: string;
  page?: number;
}) => {
  return httpClient.get<QuestionsProps>("search/advanced", {
    params: {
      q: q ?? "",
      pagesize: 20,
      order: "desc",
      sort: "activity",
      site: "stackoverflow",
      tagged: tags,
      page: page ?? 0,
    },
  });
};
