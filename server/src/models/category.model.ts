import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  coursecount: number;
  icon: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  coursecount: {
    type: Number,
    default: 0,
  },
});
const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
