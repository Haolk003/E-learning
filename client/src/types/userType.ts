export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  myLearning: string[];
  bio?: string;
  headline?: string;
  linkedin?: string;
  facebookLink?: string;
  youtubeLink?: string;
  twitterLink?: string;
  website?: string;
  loginType: string;
};
