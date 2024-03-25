import React, { Dispatch, SetStateAction } from "react";

type Props = {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
};
const ProfileNavbarMobile: React.FC<Props> = ({ active, setActive }) => {
  return (
    <div className="md:hidden flex items-center justify-between flex-1 w-[95%] mx-auto text-[16px]">
      <div
        onClick={() => setActive(1)}
        className={`flex-1 py-3  border-b text-center  ${
          active === 1 ? "dark:border-gray12 border-gray4" : "border-gray8"
        }`}
      >
        User Profile
      </div>
      <div
        onClick={() => setActive(2)}
        className={`flex-1 text-center py-3  border-b  ${
          active === 2 ? "dark:border-gray12 border-gray4" : "border-gray8"
        }`}
      >
        Profile picture
      </div>
      <div
        onClick={() => setActive(3)}
        className={`flex-1 py-3 text-center  border-b  ${
          active === 3 ? "dark:border-gray12 border-gray4" : "border-gray8"
        }`}
      >
        Change Password
      </div>
    </div>
  );
};

export default ProfileNavbarMobile;
