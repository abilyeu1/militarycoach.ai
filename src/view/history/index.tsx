import Button from "@/components/atoms/Button";
import { useDimension } from "@/hooks/useDimension";
import { URL } from "@/services/API";
import { DELETE } from "@/services/API/AxiosRequests";
import { IChat, IConversation } from "@/types/chat.interface";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import trash from "../../../public/assets/trash.svg";
import DeleteModal from "./deleteModal";
import Markdown from "react-markdown";
import { HistoryProps } from "@/types";
import ReactMarkdown from "react-markdown";

const History: FC<HistoryProps> = ({ chats, slug }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [history, setHistory] = useState<IChat[]>(chats);

  const [open, setOpen] = useState(false);

  const [width] = useDimension();

  const router = useRouter();
  const renderLink = (props: any) => {
    const { href, children } = props;
    const isExternal = /^(https?:)?\/\//.test(href);

    const linkProps = {
      href,
      target: isExternal ? "_blank" : undefined,
      rel: isExternal ? "noopener noreferrer" : undefined,
      className: isExternal ? "external-link" : undefined,
    };

    return <a {...linkProps}>{children}</a>;
  };

  const components = {
    a: renderLink, // Use the renderLink function for rendering links
  };

  useEffect(() => {
    if (history && history.length > 0) {
      setSelectedId(history[0]._id);
    }
  }, []);

  return (
    <>
      {width > 768 ? (
        <div className="min-h-[92vh] bg-[#FCFFF5;]">
          <div className="px-4 md:px-8">
            <div className="mb-5 flex items-center justify-between pt-10">
              <div className="flex  items-center">
                <BsArrowLeft
                  onClick={() => router.push(`/${slug}`)}
                  className="mr-2 cursor-pointer text-[20px] font-bold text-black"
                />
                <p className="text-[22px] font-bold md:text-[32px]">History</p>
                <p
                  className="ml-2 cursor-pointer text-[18px] font-bold capitalize text-primary md:text-[24px]"
                  onClick={() => router.push(`/${slug}`)}
                >
                  {slug}
                </p>
              </div>

              {history && history.length > 0 ? (
                <Button
                  onClick={() => {
                    router.push(`/${slug}?chatID=${selectedId}`);
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    router.push(`/${slug}`);
                  }}
                >
                  Create Chat
                </Button>
              )}
            </div>

            <div className="block md:flex">
              <div className="mr-0 mt-4 min-h-[75vh] w-full rounded-lg border border-GrayBorder bg-white p-3 shadow md:mr-6 md:w-[40%] lg:w-[20%] ">
                <div>
                  {history?.map((item: IChat, index: number) => (
                    <div
                      key={index}
                      className={`flex cursor-pointer items-center justify-between border-b border-GrayBorder py-3  `}
                    >
                      <p
                        onClick={() => setSelectedId(item._id)}
                        className={`${
                          selectedId === item._id
                            ? "font-semibold text-primary"
                            : "text-black" // Change the text color based on the condition
                        }`}
                      >
                        {item.toolName.includes("cover-letter-wizard")
                          ? item.conversation[0]?.content.substring(0, 20)
                          : item.conversation
                              .slice(2)[0]
                              ?.content.substring(0, 20)}
                      </p>

                      <Image
                        onClick={() => {
                          setOpen(true);
                          setSelectedId(item._id);
                        }}
                        src={trash}
                        alt="delete"
                        width={24}
                        height={24}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {width > 768 && (
                <div
                  className={`scrollbar mt-4 h-[75vh] w-full overflow-auto overflow-x-hidden rounded-lg border border-GrayBorder bg-white   p-3 shadow  md:w-[60%] lg:w-[80%]`}
                >
                  <div>
                    {history && history.length > 0 ? (
                      selectedId && (
                        <>
                          {history.map((item: IChat, index: number) => {
                            if (item._id === selectedId) {
                              return (
                                <div key={index}>
                                  {item.toolName.includes(
                                    "cover-letter-wizard",
                                  ) ? (
                                    <div className=" whitespace-break-spaces p-2 md:p-5">
                                      {item.conversation.map(
                                        (
                                          conversationItem: IConversation,
                                          i: number,
                                        ) => (
                                          <div
                                            key={i}
                                            className={`${
                                              conversationItem.role === "user"
                                                ? "flex justify-end"
                                                : "flex justify-start"
                                            }`}
                                          >
                                            {/* <p
                                              className={`my-5 ${
                                                conversationItem.role === "user"
                                                  ? " my-2 rounded-xl border border-primary p-2 text-left text-primary md:max-w-[60%] lg:p-3 lg:text-right"
                                                  : "rounded-xl bg-[#F5F5F5] p-5 md:max-w-[60%]"
                                              }`}
                                            >
                                              {conversationItem.content.replace(
                                                /^##.*$/gm,
                                                "",
                                              )}
                                            </p> */}

                                            <ReactMarkdown
                                              className={`my-5 whitespace-pre-wrap ${
                                                conversationItem.role === "user"
                                                  ? " my-2 rounded-xl border border-primary p-2 text-left text-primary md:max-w-[60%] lg:p-3 lg:text-right"
                                                  : "rounded-xl bg-[#F5F5F5] p-5 md:max-w-[90%]"
                                              }`}
                                              components={components} // Use components prop for customization
                                            >
                                              {conversationItem.content
                                                .split("##")[0]
                                                .replaceAll("\n\n", "\n")}
                                            </ReactMarkdown>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  ) : (
                                    <div className=" whitespace-break-spaces p-2 md:p-5">
                                      {item.conversation
                                        .slice(2)
                                        .map(
                                          (
                                            conversationItem: any,
                                            i: number,
                                          ) => (
                                            <div
                                              key={i}
                                              className={`${
                                                conversationItem.role === "user"
                                                  ? "flex justify-end"
                                                  : "flex justify-start"
                                              }`}
                                            >
                                              <ReactMarkdown
                                                className={`my-5 whitespace-pre-wrap ${
                                                  conversationItem.role ===
                                                  "user"
                                                    ? " my-2 rounded-xl border border-primary p-2 text-left text-primary md:max-w-[60%] lg:p-3 lg:text-right"
                                                    : "rounded-xl bg-[#F5F5F5] p-5 md:max-w-[90%]"
                                                }`}
                                                components={components} // Use components prop for customization
                                              >
                                                {conversationItem.content
                                                  .split("##")[0]
                                                  .replaceAll("\n\n", "\n")}
                                              </ReactMarkdown>
                                            </div>
                                          ),
                                        )}
                                    </div>
                                  )}
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </>
                      )
                    ) : (
                      <div className=" flex h-[70vh] items-center justify-center">
                        <p className="text-[1.5rem] text-textGray text-opacity-80">
                          No History for &nbsp;
                        </p>
                        <p className="text-[1.5rem] text-primary text-opacity-80">
                          {slug}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="min-h-[92vh] bg-[#FCFFF5;]">
            <div className="px-4 md:px-8">
              <div className="mb-5 flex items-center justify-between pt-10">
                <div className="flex  items-center">
                  <BsArrowLeft
                    onClick={() => router.push(`/${slug}`)}
                    className="mr-2 cursor-pointer text-[20px] font-bold text-black"
                  />
                  <p className="text-[20px] font-bold md:text-[32px]">
                    History
                  </p>
                  <p
                    className="ml-2 cursor-pointer text-[16px] font-bold capitalize text-primary md:text-[24px]"
                    onClick={() => router.push(`/${slug}`)}
                  >
                    {slug}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    router.push(`/${slug}?chatID=${selectedId}`);
                  }}
                >
                  Continue
                </Button>
              </div>

              <div className="block md:flex">
                <div className="scrollbar mr-0 mt-4 h-[30vh] w-full overflow-auto overflow-x-hidden rounded-lg border border-GrayBorder bg-white p-3 shadow md:mr-6 md:w-[40%]  lg:w-[20%] ">
                  <div>
                    {history?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-between border-b border-GrayBorder py-3"
                      >
                        <p
                          onClick={() => setSelectedId(item._id)}
                          className={`cursor-pointer ${
                            selectedId === item._id
                              ? "font-semibold text-primary"
                              : "text-black" // Change the text color based on the condition
                          }`}
                        >
                          {/* {item.conversation?.slice(2)[0]?.content.substring(0, 20)}
                           */}

                          {item.toolName.includes("cover-letter-wizard")
                            ? item.conversation[0]?.content.substring(0, 20)
                            : item.conversation
                                .slice(2)[0]
                                ?.content.substring(0, 20)}
                        </p>

                        <Image
                          onClick={() => {
                            setOpen(true);
                            setSelectedId(item._id);
                          }}
                          src={trash}
                          alt="delete"
                          width={24}
                          height={24}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`scrollbar mt-4 h-[45vh] w-full overflow-auto overflow-x-hidden rounded-lg border border-GrayBorder bg-white  p-3 shadow md:w-[60%] lg:w-[80%]`}
                >
                  <div>
                    {selectedId && (
                      <>
                        {history.map((item: IChat, index: number) => {
                          if (item._id === selectedId) {
                            return (
                              <div key={index}>
                                {item.toolName.includes(
                                  "cover-letter-wizard",
                                ) ? (
                                  <div className=" whitespace-break-spaces p-2 md:p-5">
                                    {item.conversation.map(
                                      (conversationItem: any, i: number) => (
                                        <div
                                          key={i}
                                          className={`${
                                            conversationItem.role === "user"
                                              ? "flex justify-end"
                                              : "flex justify-start"
                                          }`}
                                        >
                                          <p
                                            className={`my-5 ${
                                              conversationItem.role === "user"
                                                ? " my-2 rounded-xl border border-primary p-2 text-left text-primary md:max-w-[60%] lg:p-3 lg:text-right"
                                                : "rounded-xl bg-[#F5F5F5] p-5 md:max-w-[60%]"
                                            }`}
                                          >
                                            {conversationItem.content.replace(
                                              /^##.*$/gm,
                                              "",
                                            )}
                                          </p>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                ) : (
                                  <div className=" whitespace-break-spaces p-2 md:p-5">
                                    {item.conversation
                                      .slice(2)
                                      .map(
                                        (
                                          conversationItem: IConversation,
                                          i: number,
                                        ) => (
                                          <div
                                            key={i}
                                            className={`${
                                              conversationItem.role === "user"
                                                ? "flex justify-end"
                                                : "flex justify-start"
                                            }`}
                                          >
                                            {/* <p
                                              className={`my-5 ${
                                                conversationItem.role === "user"
                                                  ? " my-2 rounded-xl border border-primary p-2 text-left text-primary md:max-w-[60%] lg:p-3 lg:text-right"
                                                  : "rounded-xl bg-[#F5F5F5] p-5 md:max-w-[60%]"
                                              }`}
                                            >
                                              {conversationItem.content.replace(
                                                /^##.*$/gm,
                                                "",
                                              )}
                                            </p> */}

                                            <ReactMarkdown
                                              className={`my-5 whitespace-pre-wrap ${
                                                conversationItem.role === "user"
                                                  ? " my-2 rounded-xl border border-primary p-2 text-left text-primary md:max-w-[60%] lg:p-3 lg:text-right"
                                                  : "rounded-xl bg-[#F5F5F5] p-5 md:max-w-[90%]"
                                              }`}
                                              components={components} // Use components prop for customization
                                            >
                                              {conversationItem.content
                                                .split("##")[0]
                                                .replaceAll("\n\n", "\n")}
                                            </ReactMarkdown>
                                          </div>
                                        ),
                                      )}
                                  </div>
                                )}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </>
                    )}
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <DeleteModal
        open={open}
        setOpen={setOpen}
        setHistory={setHistory}
        chatID={selectedId as string}
      />
    </>
  );
};

export default History;
