import React, { Component } from "react";

class VideoCta extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }
  render() {
    return (
      <div>
        {/*====================  video cta area ====================*/}
        <div className="video-cta-area section-space--inner--120">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="video-cta-content">
                  <h4 className="video-cta-content__small-title">ABOUT US</h4>
                  <h3 className="video-cta-content__title">
                    Best E-learning Portal
                  </h3>
                  <p className="video-cta-content__text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim
                  </p>
                  <a
                    href={`${process.env.PUBLIC_URL}/contact-us`}
                    className="ht-btn ht-btn--round"
                  >
                    CONTACT US
                  </a>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1 col-md-6">
                <div className="cta-video-image">
                  <img
                    src="assets/img/slider/sphere.png"
                    height="360px"
                    width="360px"
                    alt="techsphere"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of video cta area  ====================*/}
      </div>
    );
  }
}

export default VideoCta;
