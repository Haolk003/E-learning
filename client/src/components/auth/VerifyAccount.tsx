import React, {
  Dispatch,
  SetStateAction,
  useRef,
  FC,
  useEffect,
  useState,
} from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import { useVerifyAccountMutation } from "@/features/auth/authApi";
import { useAppSelector } from "@/store/hook";
import toast from "react-hot-toast";

type VerifyNumber = {
  0: "";
  1: "";
  2: "";
  3: "";
};
type Props = {
  setRoute: Dispatch<SetStateAction<string>>;
};
const VerifyAccount: FC<Props> = ({ setRoute }) => {
  const [verifyUser, { isLoading, isSuccess, error }] =
    useVerifyAccountMutation();
  const token = useAppSelector((state) => state.auth.token);
  const inputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newVerifyNumber = { ...verifyNumber, [index]: value };
      setVerifyNumber(newVerifyNumber);
    }
    if (value !== "" && index < 3) {
      inputRef[index + 1].current?.focus();
    }
  };
  const handleKeyBack = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0) {
      inputRef[index - 1].current?.focus();
      const newVerifyNumber = { ...verifyNumber, [index]: "" };
      setVerifyNumber(newVerifyNumber);
    }
  };
  const handleSubmit = async () => {
    const fomattedVerifyNumber = Object.values(verifyNumber).reduce(
      (total, value) => {
        return total + value;
      },
      " "
    );
    await verifyUser({
      activation_code: Number(fomattedVerifyNumber),
      token: token,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Verified Successfully");
      setRoute("sign-in");
    }
    if (error && "data" in error) {
      const Error = error as any;
      toast.error(Error.data.message);
    }
  }, [isSuccess, error]);
  return (
    <div className="flex flex-col gap-7 items-center w-[90%] mx-auto">
      <h2 className="text-3xl font-[500]">Verify Your Account</h2>
      <div className="text-5xl w-[80px] h-[80px] rounded-full bg-blue11 text-white flex items-center justify-center">
        <VscWorkspaceTrusted />
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        {Object.keys(verifyNumber).map((item, index) => {
          return (
            <input
              key={index}
              type="number"
              pattern="[0-9]*"
              ref={inputRef[index]}
              onChange={(e) => handleInputChange(e, index)}
              value={verifyNumber[item as unknown as keyof VerifyNumber]}
              className="border-[3px] text-center dark:text-white text-lg rounded-md bg-transparent dark:border-white text-black border-black w-[60px] h-[60px]"
              maxLength={1}
              onKeyDown={(e) => handleKeyBack(e, index)}
            />
          );
        })}
      </div>
      <button className="button-auth" onClick={handleSubmit}>
        Verify OTP
      </button>
      <p className="dark:text-white text-black">
        Go back to sign in?{" "}
        <span
          className="cursor-pointer text-blue9"
          onClick={() => setRoute("sign-in")}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default VerifyAccount;
