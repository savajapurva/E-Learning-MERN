import React, { Component } from "react";
import ModalVideo from "react-modal-video";

class Video extends Component {
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
        <div className="video-cta-area ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 offset-lg-0 col-md-9">
                <div className="cta-video-image">
                  <div className="video-popup">
                    <ModalVideo
                      channel="youtube"
                      isOpen={this.state.isOpen}
                      videoId="OrS-93U4AYQ"
                      onClose={() => this.setState({ isOpen: false })}
                    />
                    <button onClick={this.openModal}>
                      <div className="cta-video-image__image">
                        <img
                          src="assets/img/projects/project-details.jpg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="cta-video-image__icon">
                        <i className="ion-ios-play" />
                      </div>
                    </button>
                  </div>
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

export default Video;
