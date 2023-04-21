// src/component/Gallery.js
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function MyCarousel() {
  return (
    <div className="mx-auto max-w-screen-2xl px-6 pt-2 pb-0">
      <Carousel autoPlay interval={5000} transitionTime={2000} infiniteLoop>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2FIMG-20230125-WA0014-c3.jpg?alt=media&token=35cb7523-d846-419d-8935-94982dd684ca"
            alt=""
          />

          <p className="legend">איזה כייף</p>
        </div>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2FIMG-20230126-WA0008-c1.jpg?alt=media&token=9aa67e4a-91a8-4caf-bcc5-fce2ab50b03b"
            alt=""
          />

          <p className="legend">מ-2022</p>
        </div>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2FIMG-20230125-WA0020-c2.jpg?alt=media&token=97051510-c294-43db-a074-a9e8358b3032"
            alt=""
          />
          <p className="legend">באהבה</p>
        </div>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2FIMG-20230125-WA0018.jpg?alt=media&token=b6d8466e-b717-46d4-b5e4-d7948a258099"
            alt=""
          />
          <p className="legend">מיץ סחוט טרי</p>
        </div>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2FIMG-20230125-WA0022-c4.jpg?alt=media&token=dea73a46-8d69-49b3-88c1-52e2601263c0"
            alt="חורשת האקליפוס"
          />
          <p className="legend">חורשת האקליפטוס</p>
        </div>
      </Carousel>
    </div>
  );
}
