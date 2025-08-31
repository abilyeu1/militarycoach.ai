//hooks imports
import { useDimension } from "@/hooks/useDimension";
// view imports
import Tips from "@/components/tips/Tips";
import Translator from "@/view/bullet-translator/translator";
// react imports
import React, { Fragment, useRef, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import TranslatorSlider from "@/view/bullet-translator/translator-slider";
//redux imports
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { updateUser } from "@/redux/slices/authSlice";

//types imports
import { LikedResponse } from "@/types";

//react icons imports
import { BiErrorCircle } from "react-icons/bi";

//axios imports
import { URL } from "@/services/API";
import { io } from "socket.io-client";
import { DELETE, GET, POST } from "@/services/API/AxiosRequests";
import { Tools } from "@/utils/enums";

//next imports
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

const BulletTranslatorPage = ({ fav }: any) => {
  const [isCopied, setIsCopied] = useState(false);

  const [text, setText] = useState<string>("");

  const [loader, setLoader] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [translatedData, setTranslatedData] = useState<string>("");

  const [likedResponses, setLikedResponses] = useState<LikedResponse[]>([]);

  const [getFavourites, setGetFavourites] = useState(fav.favourites);

  const userData = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const trackClick = useRef<boolean>(false);

  const token = Cookies.get("accessToken");

  let socket: any;

  const handleButtonClick = async () => {
    if (text === "") {
      setErrorMessage("Bullets should not be empty.");
      toast.error("Bullets should not be empty.");
      return;
    }

    setErrorMessage("");

    try {
      const requestBody = {
        bullet: text,
      };

      setLoader(true);

      const response = await POST(URL.BULLET_TRANSLATOR, requestBody, token);

      setTranslatedData(response.message);

      dispatch(updateUser(response.user));
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ?? "something went wrong";

      toast.error(errorMessage);

      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const addFav = async () => {
    if (!translatedData) {
      toast.error("Bullet field should not be empty.");
      return;
    }

    try {
      const requestBody = {
        toolName: Tools.BULLET_TRANSLATOR,
        bullet: text,
        translation: translatedData,
      };
      const addFavRes = await POST(URL.ADD_FAV, requestBody, token);
      setGetFavourites(addFavRes.favourites);

      toast.success("Successfully added into favorites");
    } catch (error: any) {
      const errorMessage =
        error.response.data.message[0] ?? "something went wrong";
      toast.error(errorMessage);
      console.log("error", errorMessage[0]);
    }
  };

  const handleLikeButtonClick = () => {
    const likedResponse: LikedResponse = {
      id: likedResponses.length + 1,
      data: translatedData,
      prompt: text,
    };

    setLikedResponses([...likedResponses, likedResponse]);
  };

  const deleteFav = async (id: string) => {
    try {
      const response = await DELETE(URL.DELETE_FAV(id), token as string);
      toast.success("Bullet deleted!");

      setGetFavourites(response.favourites);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = (event: any) => {
    setErrorMessage("");
    setText(event.target.value);
  };

  const socketInitializer = () => {
    socket = io(process.env.NEXT_PUBLIC_API_URL!, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Connected to sockets.");
    });

    socket.on("error", (error: any) => {
      console.error("error", error);
    });

    const socketEvent = `${userData?._id}_${Tools.BULLET_TRANSLATOR}`;

    socket.on(socketEvent, handleIncomingMessage);
  };

  const handleIncomingMessage = (message: string) => {
    if (trackClick.current) {
      setTranslatedData((prevTranslateData) => "");
      trackClick.current = false;
    }

    setTranslatedData((prevTranslateData) => prevTranslateData + message);
  };

  React.useEffect(() => {
    socketInitializer();
    return () => {
      socket.off(
        `${userData?._id}_${Tools.BULLET_TRANSLATOR ?? ""}`,
        handleIncomingMessage,
      );

      socket.disconnect();
    };
  }, []);

  const handleCopyClick = () => {
    if (!translatedData) return;

    navigator.clipboard.writeText(translatedData).then(() => {
      setIsCopied(true);

      toast.success("Copied");

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  return (
    <>
      <Fragment>
        <Head>
          <title>militarycoach.ai | Bullet Translator</title>
        </Head>
      </Fragment>

      <div className="flex min-h-[92vh] flex-col justify-center px-4 py-10 md:px-16 ">
        <div className="my-10 flex w-full flex-col justify-start rounded-xl border border-GrayBorder bg-white p-5 px-4 pt-10 md:my-0">
          <div className="block items-center justify-between md:flex">
            <div>
              <p className="text-[26px] font-bold md:text-[30px]">
                Bullet Translator
              </p>
              <p className="text-[12px] tracking-wide text-textGray md:text-[16px]">
                Translates (legacy version) military bullets into CV/Resume
                bullets
              </p>
              <div className="my-4">
                {userData?.freeMessagesLimitExhausted && (
                  <div className="flex justify-between rounded-lg bg-pink-200 p-4">
                    <div>
                      <BiErrorCircle size={24} className="text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="max-w-5xl text-[#565656]">
                        Out of messages! Time to unlock more with an
                        <Link
                          href="/pricing"
                          className="font-bold text-[#648940]"
                        >
                          {" "}
                          Upgraded Plan{" "}
                        </Link>{" "}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Tips className="w-[287px]" position="items-end" top="top-[60%]">
                New feature! Insert a performance bullet straight from your
                military performance report!
              </Tips>
            </div>
          </div>
          <Translator
            isCopied={isCopied}
            setIsCopied={setIsCopied}
            loader={loader}
            setLoader={setLoader}
            errorMessage={errorMessage}
            handleInputChange={handleInputChange}
            handleButtonClick={() => {
              handleButtonClick();
              trackClick.current = true;
            }}
            handleCopyClick={handleCopyClick}
            text={text}
            translatedData={translatedData}
            handleLikeClick={handleLikeButtonClick}
            addFav={addFav}
            deleteFav={deleteFav}
            getFavourites={getFavourites}
          />

          <div className="mt-16">
            <TranslatorSlider
              likedResponses={likedResponses}
              getFavourites={getFavourites}
              handleLikeClick={handleLikeButtonClick}
              deleteFav={deleteFav}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BulletTranslatorPage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;

  const fav = await GET(URL.GET_FAV, token);
  return {
    props: {
      fav,
    },
  };
};
