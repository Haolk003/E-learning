export type reviewContentPublic = {
  _id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: {
      public_id: string;
      url: string;
    };
  };
  rating: number;
  courseId: string;
};
