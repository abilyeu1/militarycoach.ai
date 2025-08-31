// react imports

import { FC } from "react";

// public imports
import circle_arrow from "../../../public/assets/circle-arrow.png";
import downarrow from "../../../public/assets/downarrow.png";
import translator_icon from "../../../public/assets/translator_icon.svg";

import Image from "next/image";
// react icons imports
import { FiRepeat } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
//hooks imports

import { useDimension } from "@/hooks/useDimension";
import { useAppSelector } from "@/redux/store/store";
import { BulletProps } from "@/types";
import star_icon from "../../../public/assets/star.svg";
import { BiErrorCircle } from "react-icons/bi";
import Link from "next/link";

const Translator: FC<BulletProps> = ({
  isCopied,
  loader,
  errorMessage,
  handleInputChange,
  handleButtonClick,
  handleCopyClick,
  text,
  translatedData,
  addFav,
}) => {
  const [width] = useDimension();
  const userData = useAppSelector((state) => state.auth.user);

  return (
    <>
      <div className="block items-center md:flex">
        <div className="w-full md:w-[49%]">
          <p className="mb-2 text-[18px]">Bullet</p>
          <div className="h-[248px]">
            <div>
              <textarea
                className="w-full rounded-lg border border-primary  p-3 focus:outline-none "
                rows={9}
                placeholder="Enter Bullets | Revamp'd dev performance fdbk process; 84 FTE/111 entries--resolv'd 7 psrnl issues/establish'd s/w contract best prac"
                value={text}
                onChange={handleInputChange}
              />

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <div className="mt-2 flex justify-end ">
              <div
                onClick={handleButtonClick}
                className={`flex cursor-pointer rounded-lg bg-primary  px-6 py-3 text-white ${
                  (loader || userData?.freeMessagesLimitExhausted) &&
                  "pointer-events-none cursor-not-allowed opacity-50"
                }`}
              >
                <Image
                  src={translator_icon}
                  alt="translator-icon"
                  width={24}
                  height={24}
                  className={`${loader && "animate-spin "}`}
                />
                <p className="pl-2">Translate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 my-4 w-full md:w-[3%]">
          <Image
            src={width > 1024 ? circle_arrow : downarrow}
            alt="circle_arrow"
            height={width > 768 ? 55 : 45}
            width={width > 768 ? 55 : 45}
          />
        </div>

        <div className="w-full md:w-[49%]">
          <p className="mb-2 text-[18px]">Translation</p>
          <div className="h-[248px]">
            <div className="h-[248px] overflow-y-auto break-words rounded-xl bg-[#F4FFEA] p-4">
              <p className="text-primary">{translatedData}</p>
            </div>
            <div className="mt-2 flex justify-end">
              <div className="my-2 flex items-center justify-end">
                <MdContentCopy
                  className={`mx-1 text-[24px] text-primary ${
                    isCopied
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }`}
                  onClick={handleCopyClick}
                />

                <FiRepeat
                  className="mx-1 cursor-pointer text-[24px] text-primary"
                  onClick={handleButtonClick}
                />

                <Image
                  src={star_icon}
                  alt="star"
                  height={28}
                  width={28}
                  onClick={addFav}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
