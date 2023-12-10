import * as Yup from "yup";

export const courseInfoValidate = Yup.object({
  title: Yup.string().required("Course Name is required"),
  description: Yup.string()
    .required("Course Description is required")
    .min(8, "Course Description is required"),
  price: Yup.number().required("Course Price is required"),

  tags: Yup.string().required("Course Tags is required"),
  category: Yup.string().required("Course Categories is required"),
  level: Yup.string().required("Course Lever is required"),
  demoUrl: Yup.object({
    url: Yup.string().required("Demo Url is required"),
    public_id: Yup.string().required("Demo Url is required"),
  }),
});
interface CourseContentDataType {
  test: {
    videoSection: string;
    description: string;
    lectures: {
      title: string;
      videoUrl: { public_id: string; url: string } | null;
      videoLenght: number;
    }[];
  }[];
}
export const CourseContentDataValidate =
  Yup.object<CourseContentDataType>().shape({
    test: Yup.array()
      .required()
      .of(
        Yup.object().shape({
          videoSection: Yup.string().required(),
          description: Yup.string().required(),
          lectures: Yup.array()
            .required()
            .of(
              Yup.object().shape({
                title: Yup.string().required(),
                videoUrl: Yup.object().shape({
                  public_id: Yup.string().required(),
                  url: Yup.string().required(),
                }),
                duration: Yup.number().required(),
              })
            ),
        })
      ),
  });
