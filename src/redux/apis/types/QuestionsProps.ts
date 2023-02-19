export interface QuestionsProps {
  items: QuestionProps[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface QuestionProps {
  tags: string[];
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  content_license: string;
  link: string;
  title: string;
  last_edit_date?: number;
  accepted_answer_id?: number;
}

export interface Owner {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: string;
  profile_image: string;
  display_name: string;
  link: string;
  accept_rate?: number;
}
