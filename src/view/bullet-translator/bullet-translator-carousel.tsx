//react imports

import React, { FC } from "react";
//react-icons imports

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import { Carousel } from "react-responsive-carousel";

interface Iprops {
  handleLikeClick: any;
  likedResponses: any;
}
const BulletTranslatorCarousel: FC<Iprops> = ({
  handleLikeClick,
  likedResponses,
}) => {
  return (
    <div className="carousel-container relative">
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        showThumbs={false}
        autoPlay={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className=" absolute left-[-40px] top-[10%] z-[2] flex h-[40px] w-full  cursor-pointer items-center justify-end bg-transparent  text-[24px] text-white outline-none"
            >
              <MdOutlineArrowBackIos className="text-primary" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-0 top-[10%] flex h-[40px] w-[40px] cursor-pointer items-center justify-center bg-black bg-transparent text-[24px] text-white outline-none "
            >
              <MdOutlineArrowForwardIos className="text-primary" />
            </button>
          )
        }
      >
        <></>
        <div className="mx-10 mt-20">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {likedResponses.map((liked: any, index: number) => (
              <div key={index} className="grid-item">
                <div className="start">
                  <p className="mb-2 text-left text-[18px]">{liked.prompt}</p>
                  <p className="text-left text-lightGray">{liked.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default BulletTranslatorCarousel;
