// view imports
import Button from "@/components/atoms/Button";

//atoms imports
import { updateUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";

//axios imports
import { URL } from "@/services/API";
import { GET, POST } from "@/services/API/AxiosRequests";

//next imports
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";

//components imports
import PricingPlan from "@/view/pricing-plan";

//react imports
import React, { Fragment, useEffect, useState } from "react";

import { IStripePlan } from "@/types/plans.interface";
import { IUser } from "@/types/user.interface";

import { Rings, TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import PricingDetails from "@/view/pricingDetails";
import { IStripeSubscription } from "@/types/stripe_subscription.interface";

// custom-elements.d.ts

// Define the interface for your custom element attributes

const Pricing = ({
  current_subscription,
  updatedUser,
}: {
  current_subscription: IStripeSubscription;
  updatedUser: IUser;
}) => {
  const [loader, setLoader] = useState<boolean>(false);

  const router = useRouter();

  const user = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const manageSubscription = async () => {
    if (!updatedUser?.stripeSubscriptionId) {
      toast.error("You are not subscribed to any plan");
      return;
    }
    try {
      setLoader(true);
      const payload = {
        customerID: updatedUser?.stripeCustomerId,
        subscriptionID: updatedUser?.stripeSubscriptionId,
      };
      const { url } = await POST(
        URL.MANAGE_SUBSCRIPTION,
        payload,
        user.token as string,
      );

      router.push(url);

      setLoader(false);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? "Something went wrong";

      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  };

  // Creating stripe-pricing-table element using createElement
  const stripePricingTable = React.createElement("stripe-pricing-table", {
    "pricing-table-id": process.env
      .NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID as string,
    "publishable-key": process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    "client-reference-id": updatedUser?._id as string,
    "customer-email": updatedUser?.email as string,
  });

  useEffect(() => {
    if (updatedUser) {
      dispatch(updateUser(updatedUser));
    }
  }, [updatedUser]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Subscription</title>
      </Head>
      {updatedUser?.stripeSubscriptionStatus === "active" ? (
        <PricingDetails
          updatedUser={updatedUser}
          subscription={current_subscription}
        />
      ) : (
        <div className="flex min-h-[92vh] flex-col justify-center bg-lightYellow px-4 md:px-16">
          <div className="my-5 flex w-full flex-col items-start justify-center sm:mb-0 sm:items-center">
            <p className="text-[26px] font-bold  sm:text-[42px]">
              Get Started For Free!
            </p>
            <p className="text-textGray">
              Free Tier = 12 messages/month forever. Subscribe for higher
              message limits!
            </p>
            <div className="my-5 flex">
              <p className="pr-1 font-normal text-textGray">
                Verify your Active Duty Status for 50% off a Platinum
                Membership!
                <span
                  onClick={() =>
                    window.open(
                      process.env.NEXT_PUBLIC_SHEER_ID_VERIFY_URL as string,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="mx-1 cursor-pointer font-semibold text-primary"
                >
                  Click here
                </span>
              </p>
            </div>
          </div>

          {stripePricingTable}
        </div>
      )}
    </Fragment>
  );
};

export default Pricing;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;

  const user = await GET(URL.GET_USER, token);

  let current_subscription = null;
  try {
    current_subscription = await GET(URL.GET_CURRENT_SUBSCRIPTION, token);
  } catch (err) {
    console.log("🚀 ~ err:", err);
  }

  return {
    props: {
      updatedUser: user,
      current_subscription,
    },
  };
};
