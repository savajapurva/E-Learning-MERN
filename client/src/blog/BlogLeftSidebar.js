import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "./components/Sidebar";
import BlogPostGrid from "./components/BlogPostGrid";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
class BlogLeftSidebar extends Component {
  render() {
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
                  <h1>Courses</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>Courses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        {/*====================  blog page content ====================*/}
        <div className="page-wrapper section-space--inner--120">
          <div className="blog-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-12 order-1 order-lg-2">
                  {/* blog post grid */}
                  <BlogPostGrid />
                  <div className="row ">
                    <div className="col">
                      <ul className="page-pagination section-space--top--30">
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
                <div className="col-lg-4 col-12 order-2 order-lg-1">
                  {/* blog sidebar */}
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*====================  End of blog page content  ====================*/}

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

export default BlogLeftSidebar;
