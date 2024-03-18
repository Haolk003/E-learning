import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { openLogin } from "@/features/layout/layoutSlice";
import { CategoryType } from "@/types/categoryType";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

type Props = {
  active: boolean;
  categories: CategoryType[];
  handleLogout: () => void;
};

const HeaderMobile: React.FC<Props> = ({
  active,
  categories,
  handleLogout,
}) => {
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpenSubcategory, setIsOpenSubCategory] = useState(false);
  const [subCategory, setSubCategory] = useState<CategoryType | null>(null);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const dispatch = useAppDispatch();

  const handleOpenLogin = () => {
    setIsOpenMenu(false);
    dispatch(openLogin(""));
  };

  const handleOpenSubCategory = (categoryId: string) => {
    const findSubCategory = categories.find((item) => item._id === categoryId);
    if (findSubCategory) {
      setIsOpenSubCategory(true);
      setSubCategory(findSubCategory);
    }
  };
  const handleCloseSubCategory = () => {
    setIsOpenSubCategory(false);
    setSubCategory(null);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search !== "") {
      router.push(`/courses/search?q=${search}`);
    }
  };

  const user = useAppSelector((state) => state.auth.user);
  return (
    <div
      className={`md:hidden block fixed left-0 top-0  ${
        active
          ? "bg-opacity-80 text-black dark:text-white bg-gradient-to-b  from-gray12 to-white dark:from-gray-900 dark:to-black"
          : "w-full border-b dark:border-[#ffffff1c]   dark:shadow-xl"
      }  w-full h-[60px] px-3  z-[100] `}
    >
      <div className="flex items-center h-full  justify-between">
        <Dialog.Root open={isOpenMenu} onOpenChange={setIsOpenMenu}>
          <Dialog.Trigger>
            <IoIosMenu />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA3 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Close className="absolute left-[62%] top-6 text-[45px] dark:text-black text-white">
              <IoIosCloseCircle />
            </Dialog.Close>
            <Dialog.Content className="dark:bg-gray3 bg-white w-[60%] h-screen fixed top-0 left-0 z-[999] data-[state=open]:animate-slideRightAndFade">
              <div className="flex flex-col gap-3">
                {!user ? (
                  <div className="py-5 px-4 border-b border-gray8 text-violet10 text-[14px]  gap-2">
                    <button onClick={handleOpenLogin}>Login</button>
                  </div>
                ) : (
                  <div className=" py-5 px-4 border-b border-gray8 ">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 mb-3"
                    >
                      <Image
                        src={
                          user.avatar ? user.avatar.url : "/assets/avatar.jpg"
                        }
                        alt=""
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px] object-cover rounded-full"
                      />
                      <p className="font-semibold text-[17px]">
                        {user.lastName} {user.firstName}
                      </p>
                    </Link>
                    {user.role === "instructor" && (
                      <Link
                        href="/instructor/overview"
                        className="text-violet11 mt-4 text-[15px]"
                      >
                        Switch to instructor view
                      </Link>
                    )}
                    {user.role === "user" && (
                      <Link
                        href="/become-instructor"
                        className="text-violet11 mt-4 text-[15px]"
                      >
                        Become an Instructor
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link
                        href={"/admin"}
                        className="text-violet11  text-[15px]"
                      >
                        Switch to admin view
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div className="border-b border-gray8 py-5 px-4">
                <p className="font-semibold mb-3">Learn</p>
                <Link href={`/my-courses/learning`}>My Learning</Link>
              </div>
              <div className="border-b border-gray8 py-5 px-4">
                <p className="font-semibold mb-3">Categories</p>
                <ul className="flex flex-col gap-4">
                  {categories.map((category) => (
                    <li
                      className="flex items-center justify-between"
                      key={category._id}
                    >
                      <Link href={`/courses/${category._id}`}>
                        {category.name}
                      </Link>
                      <button
                        className="flex items-center justify-center"
                        onClick={() => handleOpenSubCategory(category._id)}
                      >
                        <FaChevronRight size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
                <Link href={`/my-courses/learning`}>My Learning</Link>
              </div>
              {isOpenSubcategory && (
                <div className="absolute top-0 left-0 w-full h-full dark:bg-gray3 bg-white">
                  <button
                    className="flex items-center gap-4 border-b w-full border-gray8 py-4 px-4 mb-4"
                    onClick={handleCloseSubCategory}
                  >
                    <FaChevronLeft />
                    <p>Menu</p>
                  </button>
                  <div className="flex flex-col gap-4 p-4">
                    {subCategory &&
                      subCategory.subcategories.map((item) => (
                        <Link
                          href={`/courses/${subCategory._id}/${item._id}`}
                          key={item._id}
                          className=""
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
              <button
                className=" py-5 px-4 text-violet11"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Link href={"/"} className="z-[30]">
          <Image
            src={"/assets/logo2.png"}
            alt=""
            width={60}
            height={60}
            className="w-[60px] h-[60px] object-cover "
          />
        </Link>

        <div className="flex items-center gap-4">
          <Dialog.Root open={isOpenSearch} onOpenChange={setIsOpenSearch}>
            <Dialog.Trigger className="flex items-center justify-center text-[20px]">
              <IoIosSearch />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content className="w-full h-full dark:bg-gray1 bg-white fixed left-0 top-0 z-[999]">
                <div className="h-[70px] w-full shadow-gray3 shadow-sm flex items-center justify-between px-4">
                  <form
                    className="flex items-center gap-4"
                    onSubmit={handleSubmit}
                  >
                    <button className="flex items-center justify-center">
                      <IoIosSearch />
                    </button>

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="Search for anything"
                      className="border-none outline-none bg-transparent"
                    />
                  </form>
                  <button
                    onClick={() => setIsOpenSearch(false)}
                    className="flex items-center justify-center text-[30px]"
                  >
                    <IoIosClose />
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <button className="flex items-center justify-center text-[20px]">
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
