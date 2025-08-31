// React Imports
import { FC, Fragment, useState } from "react";

// Next JS Imports
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// Custom Component & Hook Imports
import Button from "@/components/atoms/Button";
import { useDimension } from "@/hooks/useDimension";

// Service Imports
import { POST } from "@/services/API/AxiosRequests";
import { URL } from "@/services/API";

// Assets Imports
import guidanceImage from "../../../public/assets/login-side-img.png";

// Redux Imports
import { useAppSelector } from "@/redux/store/store";

// Npm package Imports
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

// Types Imports
import { IUser } from "@/types/user.interface";
import { IStripeSubscription } from "@/types/stripe_subscription.interface";

interface IPricingDetailsProps {
  updatedUser: IUser;
  subscription: IStripeSubscription;
}

interface SubscriptionDetails {
  subscriptionStartDate: string;
  subscriptionExpiryDate: string;
  subscriptionRenewalDate: string;
  subscriptionDaysLeft: number;
  subscribedProductPrice: string;
  subscribedProductPlanName: string;
  subscriptionType: string;
}

const PricingDetails: FC<IPricingDetailsProps> = ({
  updatedUser,
  subscription,
}) => {
  const [loader, setLoader] = useState<boolean>(false);

  const [width] = useDimension();

  const token = useAppSelector((state) => state.auth.token);

  const router = useRouter();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.toLocaleString("en-GB", { day: "numeric" });
    const month = months[date.getMonth()];
    const year = date.toLocaleString("en-GB", { year: "numeric" });
    const time = date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${day}-${month}-${year} - ${time}`;
  };

  const unitAmountDecimal =
    subscription.items.data[0].price.unit_amount_decimal;

  const amountInDollars = parseFloat(unitAmountDecimal) / 100;

  const formattedPrice =
    subscription.items.data[0].plan.interval === "month"
      ? `$${amountInDollars.toFixed(2)} / month`
      : `$${amountInDollars.toFixed(2)} / year`;

  const subscriptionDetails: SubscriptionDetails = {
    subscriptionStartDate: formatDate(subscription.start_date),
    subscriptionExpiryDate: formatDate(subscription.current_period_end),
    subscriptionRenewalDate: formatDate(subscription.current_period_end),
    subscriptionDaysLeft: Math.floor(
      (subscription.current_period_end - Date.now() / 1000) / (60 * 60 * 24),
    ),
    subscribedProductPrice: formattedPrice,
    subscribedProductPlanName: subscription.items.data[0].price.product.name,
    subscriptionType:
      subscription.items.data[0].plan.interval === "month"
        ? "Monthly"
        : "Annual",
  };

  console.log(subscriptionDetails);

  /**
   * @description This function is used to manage subscription
   * @returns void
   */
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
        token as string,
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

  return (
    <Fragment>
      <div className="flex items-center bg-[#FBFBFB] ">
        <div className="flex w-full flex-col  items-center justify-center">
          <div className="my-10 flex w-full flex-col items-center justify-center px-5 text-center lg:max-w-[32%]">
            <p className="mt-10 text-[18px] font-bold lg:text-[26px]">
              Manage Your Subscription
            </p>
            <p className="font-normal text-textGray">
              Welcome to militarycoach.ai, your premier destination for coaching
              and guidance as you navigate the journey from military service to
              civilian life.
            </p>
          </div>
          <div className=" w-[90%] rounded-lg  border-GrayBorder  bg-white p-10 shadow md:w-[70%] lg:w-[50%] xl:w-[35%]">
            <p className="relative top-2 mb-4 text-3xl font-extrabold text-primary">
              Payment Details
            </p>
            <p className="font-bold">Platinum Monthly</p>

            <div className="my-4 h-[1px]  border-0 bg-GrayBorder" />

            <div className="my-6 pl-2">
              <div className="block justify-between md:flex">
                <p className="text-[18px] font-bold text-black">
                  Subscription Name
                </p>
                <p className="mb-2 text-base font-normal text-textGray">
                  {subscriptionDetails.subscribedProductPlanName}
                </p>
              </div>

              <div className="block justify-between md:flex">
                <p className="text-[18px] font-bold text-black">
                  Subscription Tenure
                </p>
                <p className="mb-2 text-base font-normal text-textGray">
                  {subscriptionDetails.subscriptionType}
                </p>
              </div>
              <div className="block justify-between md:flex">
                <p className="text-[18px] font-bold text-black">
                  Subscription Price
                </p>
                <p className="mb-2 text-base font-normal text-textGray">
                  {subscriptionDetails.subscribedProductPrice}
                </p>
              </div>

              <div className="block justify-between md:flex">
                <p className="text-[18px] font-bold text-black">
                  Subscription Start Date
                </p>
                <p className="mb-2 text-base font-normal text-textGray">
                  {subscriptionDetails.subscriptionStartDate}
                </p>
              </div>
              <div className="block justify-between md:flex">
                <p className="text-[18px] font-bold text-black">
                  Subscription Expiry Date
                </p>
                <p className="mb-2 text-base font-normal text-textGray">
                  {subscriptionDetails.subscriptionExpiryDate}
                </p>
              </div>
              <div className="block justify-between md:flex">
                <p className="text-[18px] font-bold text-black">
                  Subscription Renewal Date
                </p>
                <p className="mb-2 text-base font-normal text-textGray">
                  {subscriptionDetails.subscriptionRenewalDate}
                </p>
              </div>

              <div className="block justify-between md:flex">
                <p className="text-[18px] font-bold text-black">
                  Subscription Days Left
                </p>
                <p className="mb-2 text-base font-normal text-textGray">
                  {subscriptionDetails.subscriptionDaysLeft}
                </p>
              </div>
            </div>

            <Button className="w-full" onClick={manageSubscription}>
              {loader ? (
                <div className="flex justify-center">
                  <TailSpin
                    height="20"
                    width="40"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    strokeWidth={4}
                  />
                </div>
              ) : (
                "Manage Subscription"
              )}
            </Button>
          </div>

          <div className="my-5 flex px-5 text-center">
            <p className="pr-1 text-[18px] font-normal text-textGray">
              Verify your military account and get special discount,
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
              to verify. 😍
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PricingDetails;
