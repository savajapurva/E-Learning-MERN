import React, {Component} from 'react';
import NavBar from '../components/NavBar';
import Sidebar from './components/Sidebar';
import BrandLogoSlider from '../components/BrandLogoSlider';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';
import ServiceGallery from './components/ServiceGallery';
class ServiceDetailsRightSidebar extends Component{
    render(){

        return(
            <div>
                {/* Navigation bar */}
                <NavBar/>

                {/* breadcrumb */}
                {/*====================  breadcrumb area ====================*/}
                <div className="breadcrumb-area breadcrumb-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="page-banner text-center">
                                    <h1>Service Details</h1>
                                    <ul className="page-breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li><a href={`${process.env.PUBLIC_URL}/services`}>Services</a></li>
                                        <li>Service Details</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*====================  End of breadcrumb area  ====================*/}

                <div className="page-wrapper section-space--inner--120">
                    {/*Service section start*/}
                    <div className="service-section">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-12 order-1">
                            <div className="service-details">
                                {/* service gallery */}
                                <ServiceGallery/>
                                <div className="content section-space--top--30">
                                <div className="row">
                                    <div className="col-12">
                                    <h2>Construction</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, sunt perspiciatis error id ipsa atque unde quis dolore nobis eum aperiam enim blanditiis pariatur inventore eius commodi consectetur ut. Totam, assumenda! Laboriosam possimus, corporis dicta!</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aliquid quod, officiis unde nostrum itaque! Adipisci dolorum, ab dolor, exercitationem praesentium dolorem quo voluptatum itaque dignissimos, sit esse cupiditate. Doloremque rerum similique a nobis placeat in illum, quo quaerat, ut repellat, fuga itaque? Nihil mollitia nisi, nam, accusantium nemo consequuntur reiciendis autem dicta consequatur earum beatae dolor distinctio, debitis repudiandae?</p>
                                    </div>
                                    <div className="col-lg-6 col-12 section-space--top--30">
                                    <h3>Project Analysis</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                    </div>
                                    <div className="col-lg-6 col-12 section-space--top--30">
                                    <h3>Project Costing</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                    </div>
                                    <div className="col-lg-6 col-12 section-space--top--30">
                                    <h3>Project Planning</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                    </div>
                                    <div className="col-lg-6 col-12 section-space--top--30">
                                    <h3>Project Strategy</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-4 col-12 order-2">
                                <Sidebar />
                            </div>
                        </div>
                        </div>
                    </div>
                    {/*Service section end*/}
                    </div>

                {/* Brand logo */}
                <BrandLogoSlider background = "grey-bg" />

                {/* Footer */}
                <Footer/>

                {/* Mobile Menu */}
                <MobileMenu/>

            </div>
        )
    }
}


export default ServiceDetailsRightSidebar;