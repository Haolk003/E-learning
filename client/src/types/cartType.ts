export type cartType = {
  _id: string;
  userId: string;
  items: {
    courseId: {
      sale: { discount: number };
      thumbnail: {
        public_id: string;
        url: string;
      };
      _id: string;
      title: string;
      price: number;
    };
    price: number;
  }[];
  totalPrice: number;
};

export type cartItemType = {
  courseId: {
    sale: { discount: number };
    thumbnail: {
      public_id: string;
      url: string;
    };
    _id: string;
    title: string;
    price: number;
    author: {
      firstName: string;
      lastName: string;
    };
  };
  price: number;
};
