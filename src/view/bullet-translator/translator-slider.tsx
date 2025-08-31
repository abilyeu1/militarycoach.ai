import { FavoriteItem, LikedResponse } from "@/types";
import React, { FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Iprops {
  likedResponses: LikedResponse[];
  handleLikeClick: any;
  getFavourites: any;
  deleteFav: any;
}
const TranslatorSlider: FC<Iprops> = ({ getFavourites, deleteFav }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {getFavourites && getFavourites.length > 0 ? (
        <React.Fragment>
          <div>
            <p className="mt-10 text-[22px] font-bold">Favorites</p>
          </div>
          <Carousel responsive={responsive}>
            {getFavourites.map((liked: any, index: number) => (
              <div className="mt-10" key={index}>
                <RxCross2
                  className="mx-1  cursor-pointer text-[24px] text-primary"
                  onClick={async () => await deleteFav(liked._id)}
                />
                <div className=" mx-3 md:mx-10">
                  <p className="mb-2 text-left text-[18px]">{liked.bullet}</p>

                  <p className="text-left text-lightGray">
                    {liked.translation}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </React.Fragment>
      ) : (
        <div className="flex h-[20vh] items-center justify-center">
          <p className="flex justify-center font-bold text-primary">
            No Favorites
          </p>
        </div>
      )}
    </>
  );
};

export default TranslatorSlider;
