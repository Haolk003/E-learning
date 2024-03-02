export type notifyType = {
  _id: string;
  message: string;
  status: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: {
      public_id: string;
      url: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  receiver: string;
};
