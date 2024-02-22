export type CategoryType = {
  _id: string;
  name: string;
  courseCount: number;
  parent_id: string | null;
  description: string;
  isCategory: boolean;
  subcategories: CategoryType[];
};
