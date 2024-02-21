import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  parent_id: mongoose.Schema.Types.ObjectId;
  description: string;
  isCategory: boolean;
  courseCount: number;
}

const categorySchema = new mongoose.Schema<ICategory>({
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  name: String,
  description: String,
  isCategory: {
    type: Boolean,
    default: true,
  },
  courseCount: {
    type: Number,
    default: 0,
  },
});
const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
