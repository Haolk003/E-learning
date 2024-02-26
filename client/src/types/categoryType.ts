export type CategoryType = {
  _id: string;
  name: string;
  courseCount: number;
  parent_id: string | null;
  description: string;
  isCategory: boolean;
  subcategories: CategoryType[];
};

export type CategoryTypePopulate = {
  _id: string;
  name: string;
  parent_id: {
    name: string;
    _id: string;
  };
};
