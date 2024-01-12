import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  courseCount: number;
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
  courseCount: {
    type: Number,
    default: 0,
  },
});
const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
