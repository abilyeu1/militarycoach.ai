import { URL } from "@/services/API";
import { GET } from "@/services/API/AxiosRequests";
import { IChat } from "@/types/chat.interface";
import History from "@/view/history";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { Fragment } from "react";

const HistoryDynamicPage = ({
  query,
  chats,
}: {
  query: { slug: string };
  chats: IChat[];
}) => {
  return (
    <Fragment>
      <Head>
        <title>History | {query.slug}</title>
      </Head>
      <History chats={chats} slug={query.slug} />
    </Fragment>
  );
};

export default HistoryDynamicPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

  const token = context.req.cookies.accessToken;

  try {
    const res = await GET(
      URL.HISTORY_DATA(query.slug as string),
      token as string
    );

    console.log(res, "res");

    return {
      props: {
        query,
        chats: res.chats,
      },
    };
  } catch (error) {
    return {
      props: {
        query,
        chats: [],
      },
    };
  }
};
