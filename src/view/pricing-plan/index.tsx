// next imports
import Image from "next/image";

// public imports
import add from "../../../public/assets/add.svg";

// button imports
import { IStripePlan } from "@/types/plans.interface";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store/store";
import { POST } from "@/services/API/AxiosRequests";
import { URL } from "@/services/API";
import { useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const PricingPlan = ({ plans }: { plans: IStripePlan[] }) => {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);

  const token = useAppSelector((state) => state.auth.token);

  const getInterval = (interval_count: number, interval: string) => {
    if (interval_count === 1) {
      return interval;
    } else {
      return `${interval_count} ${interval}s`;
    }
  };

  const handleCheckout = async (
    priceID: string,
    userSelectedPriceID: string | undefined,
  ) => {
    if (userSelectedPriceID === priceID) {
      toast.error("You can not buy the same plan!", {
        position: "top-right",
      });
      return;
    }
    try {
      setIsLoading((prevState) => ({
        ...prevState,
        [priceID]: true,
      }));

      const payload = {
        priceId: priceID,
        customerID: user?.stripeCustomerId,
      };
      const session = await POST(
        URL.CREATE_CHECKOUT_SESSION,
        payload,
        token as string,
      );

      setIsLoading((prevState) => ({
        ...prevState,
        [priceID]: true,
      }));

      router.push(session.url);
    } catch (error: any) {
      setIsLoading((prevState) => ({
        ...prevState,
        [priceID]: true,
      }));

      const errorMessage =
        error?.response?.data?.message ?? "Something went wrong";

      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  };

  // console.log("plans", plans);

  return (
    <div className="container mx-auto flex flex-col ">
      <div className="block lg:flex">
        {plans.map((plan: IStripePlan, index: number) => (
          <div
            className="mx-0 my-5 w-full rounded-xl border border-GrayBorder p-4 sm:mx-2 lg:w-[48%]  xl:w-[33%]"
            key={`plan-${index}`}
          >
            <div className="flex items-center justify-between border-b border-GrayBorder pb-4">
              <div>
                <p className="text-[20px] font-semibold text-primary md:text-[24px]">
                  {plan.name}
                </p>
                <p className="mt-1">{plan.metadata.subHeading}</p>
              </div>
              <div>
                <span className="text-[18px] ">$</span>
                <span className="text-[20px] font-semibold md:text-[36px]">
                  {plan.default_price?.unit_amount / 100}
                </span>
                <span className="text-textGray">
                  &nbsp;/&nbsp;
                  {getInterval(
                    plan.default_price?.recurring.interval_count,
                    plan.default_price?.recurring.interval,
                  )}
                </span>
              </div>
            </div>
            <div className="min-h-[137px] border-b border-GrayBorder">
              <div className="my-2  items-center">
                {plan.features.map((feature, index: number) => (
                  <div className="flex" key={`${feature.name}-${index}`}>
                    <Image src={add} alt="add icon" width={18} height={16} />
                    <p className="ml-2 text-textGray">{feature.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`mt-5 flex w-full items-center justify-center rounded-xl border border-GrayBorder py-3 font-medium ${
                user?.stripePriceId !== plan.default_price?.id
                  ? "bg-primary text-white"
                  : ""
              }`}
              onClick={() =>
                handleCheckout(plan?.default_price.id, user?.stripePriceId)
              }
            >
              {isLoading[plan?.default_price?.id] ? (
                <div className="flex justify-center">
                  <TailSpin
                    height="20"
                    width="40"
                    color={
                      user?.stripePriceId === plan?.default_price?.id
                        ? "#fff"
                        : "#63B017"
                    }
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    strokeWidth={6}
                  />
                </div>
              ) : (
                "Current Plan"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;
