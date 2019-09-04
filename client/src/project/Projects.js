import React, { Component } from "react";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
class Projects extends Component {
  render() {
    let data = [
      {
        pageLink: "project-details",
        img: "project-1.jpg",
        projectTitle: "Land Minning",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      },
      {
        pageLink: "project-details",
        img: "project-2.jpg",
        projectTitle: "Work Management",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      },
      {
        pageLink: "project-details",
        img: "project-3.jpg",
        projectTitle: "Material Engineering",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      },
      {
        pageLink: "project-details",
        img: "project-4.jpg",
        projectTitle: "Power and Energy",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      },
      {
        pageLink: "project-details",
        img: "project-5.jpg",
        projectTitle: "Land Minning",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      },
      {
        pageLink: "project-details",
        img: "project-6.jpg",
        projectTitle: "Work Management",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      },
      {
        pageLink: "project-details",
        img: "project-7.jpg",
        projectTitle: "Material Engineering",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      },
      {
        pageLink: "project-details",
        img: "project-8.jpg",
        projectTitle: "Power and Energy",
        projectSubtitle:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor"
      }
    ];

    let Datalist = data.map((val, i) => {
      return (
        <div
          className="col-lg-4 col-sm-6 col-12 section-space--bottom--30"
          key={i}
        >
          <div className="service-grid-item service-grid-item--style2">
            <div className="service-grid-item__image">
              <div className="service-grid-item__image-wrapper">
                <a href={`${process.env.PUBLIC_URL}/${val.pageLink}`}>
                  <img
                    src={`assets/img/projects/${val.img}`}
                    className="img-fluid"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="service-grid-item__content">
              <h3 className="title">
                <a href={`${process.env.PUBLIC_URL}/${val.pageLink}`}>
                  {val.projectTitle}
                </a>
              </h3>
              <p className="subtitle">{val.projectSubtitle}</p>
              <a
                href={`${process.env.PUBLIC_URL}/${val.pageLink}`}
                className="see-more-link"
              >
                SEE MORE
              </a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* breadcrumb */}
        {/*====================  breadcrumb area ====================*/}
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-banner text-center">
                  <h1>Blogs</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>Blogs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        {/*====================  project page content ====================*/}
        <div className="page-wrapper section-space--inner--120">
          {/*Projects section start*/}
          <div className="project-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="project-item-wrapper">
                    <div className="row">{Datalist}</div>
                  </div>
                </div>
              </div>
              <div className="row section-space--top--60">
                <div className="col">
                  <ul className="page-pagination">
                    <li>
                      <a href="/">
                        <i className="fa fa-angle-left" /> Prev
                      </a>
                    </li>
                    <li className="active">
                      <a href="/">01</a>
                    </li>
                    <li>
                      <a href="/">02</a>
                    </li>
                    <li>
                      <a href="/">03</a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="fa fa-angle-right" /> Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/*Projects section end*/}
        </div>

        {/*====================  End of project page content  ====================*/}

        {/* Brand logo */}
        <BrandLogoSlider background="grey-bg" />

        {/* Footer */}
        <Footer />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    );
  }
}

export default Projects;
