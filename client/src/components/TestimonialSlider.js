import React, { Component } from "react";
import Swiper from "react-id-swiper";

class TestimonialSlider extends Component {
  render() {
    const params = {
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      effect: "fade",
      autoplay: {
        delay: 2000
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      renderPagenation: () => <div className="swiper-pagination" />
    };
    let data = [
      {
        testimonialImage: "1.jpg",
        testimonialName: "Apurva Savaj",
        testimonialDesignation: "Founder",
        testimonialText:
          "Lorem ipsum dolor sit amet, consectetur adipisi elit sed do eiusmod tempor incididu ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
      },
      {
        testimonialImage: "3.jpg",
        testimonialName: "Aman Singh",
        testimonialDesignation: "Engineer",
        testimonialText:
          "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet."
      },
      {
        testimonialImage: "2.jpg",
        testimonialName: "Aananya Pandey",
        testimonialDesignation: "CEO",
        testimonialText:
          "consectetur adipisi elit sed do eiusmod tempor incididu ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
      }
    ];

    let DataList = data.map((val, i) => {
      return (
        <div className="swiper-slide testimonial-slider__single-slide" key={i}>
          <div className="author">
            <div className="author__image">
              <img
                src={`assets/img/testimonial/${val.testimonialImage}`}
                alt=""
              />
            </div>
            <div className="author__details">
              <h4 className="name">{val.testimonialName}</h4>
              <div className="designation">{val.testimonialDesignation}</div>
            </div>
          </div>
          <div className="content">{val.testimonialText}</div>
        </div>
      );
    });

    return (
      <div>
        {/*====================  testimonial slider area ====================*/}
        <div className="testimonial-slider-area testimonial-slider-area-bg section-space--inner--120">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="testimonial-slider">
                  <div className="testimonial-slider__container-area">
                    <Swiper {...params}>{DataList}</Swiper>
                    <div className="swiper-pagination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of testimonial slider area  ====================*/}
      </div>
    );
  }
}

export default TestimonialSlider;
