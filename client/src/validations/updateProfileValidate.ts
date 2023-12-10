import * as Yup from "yup";

export const updateProfileSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  headline: Yup.string().max(60),
  bio: Yup.string(),
  linkedin: Yup.string(),
  facebookLink: Yup.string(),
  youtubeLink: Yup.string(),
  twitterLink: Yup.string(),
  websiteLink: Yup.string(),
});

export const ChangePasswordShema = Yup.object({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .test("password-match", "Password is not match", function (value) {
      return value === this.resolve(Yup.ref("newPassword"));
    }),
});
