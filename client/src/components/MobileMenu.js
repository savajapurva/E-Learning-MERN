import React, {Component} from 'react';


class MobileMenu extends Component{
    render(){
        return(
            <div>
                {/*=======  offcanvas mobile menu  =======*/}
                <div className="offcanvas-mobile-menu" id="mobile-menu-overlay">
                    <a href="#/" className="offcanvas-menu-close" id="mobile-menu-close-trigger">
                        <i className="ion-android-close" />
                    </a>
                    <div className="offcanvas-wrapper">
                        <div className="offcanvas-inner-content">
                        <div className="offcanvas-mobile-search-area">
                            <form action="#">
                            <input type="search" placeholder="Search ..." />
                            <button type="submit"><i className="fa fa-search" /></button>
                            </form>
                        </div>
                        <nav className="offcanvas-navigation">
                            <ul>
                            <li className="menu-item-has-children">
                            <a href={`${process.env.PUBLIC_URL}/home-one`}>Home</a>
                                <ul className="sub-menu">
                                    <li><a href={`${process.env.PUBLIC_URL}/home-one`}>Homepage One</a></li>
                                    <li><a href={`${process.env.PUBLIC_URL}/home-two`}>Homepage Two</a></li>
                                </ul>
                            </li>
                            <li><a href={`${process.env.PUBLIC_URL}/about-us`}>ABOUT</a></li>
                            <li className="menu-item-has-children">
                                <a href={`${process.env.PUBLIC_URL}/services`}>SERVICE</a>
                                <ul className="sub-menu">
                                    <li><a href={`${process.env.PUBLIC_URL}/services`}>Service Page</a></li>
                                    <li><a href={`${process.env.PUBLIC_URL}/service-details-left-sidebar`}>Service Details Left Sidebar</a></li>
                                    <li><a href={`${process.env.PUBLIC_URL}/service-details-right-sidebar`}>Service Details Right Sidebar</a></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href={`${process.env.PUBLIC_URL}/projects`} >PROJECT</a>
                                <ul className="sub-menu">
                                    <li><a href={`${process.env.PUBLIC_URL}/projects`} >Project Page</a></li>
                                    <li><a href={`${process.env.PUBLIC_URL}/project-details`}>Project Details</a></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href={`${process.env.PUBLIC_URL}/blog-left-sidebar`}>BLOG</a>
                                <ul className="sub-menu">
                                    <li><a href={`${process.env.PUBLIC_URL}/blog-left-sidebar`}>Blog Left Sidebar</a></li>
                                    <li><a href={`${process.env.PUBLIC_URL}/blog-right-sidebar`}>Blog Right Sidebar</a></li>
                                    <li><a href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar`}>Blog Details Left Sidebar</a></li>
                                    <li><a href={`${process.env.PUBLIC_URL}/blog-details-right-sidebar`}>Blog Details Right Sidebar</a></li>
                                </ul>
                            </li>
                            <li><a href={`${process.env.PUBLIC_URL}/contact-us`}>CONTACT</a> </li>
                            </ul>
                        </nav>
                        <div className="offcanvas-widget-area">
                            <div className="off-canvas-contact-widget">
                            <div className="header-contact-info">
                                <ul className="header-contact-info__list">
                                <li><i className="ion-android-phone-portrait" /> <a href="tel://12452456012">(1245) 2456 012 </a></li>
                                <li><i className="ion-android-mail" /> <a href="mailto:info@yourdomain.com">info@yourdomain.com</a></li>
                                </ul>
                            </div>
                            </div>
                            {/*Off Canvas Widget Social Start*/}
                            <div className="off-canvas-widget-social">
                            <a href="#/" title="Facebook"><i className="fa fa-facebook" /></a>
                            <a href="#/" title="Twitter"><i className="fa fa-twitter" /></a>
                            <a href="#/" title="LinkedIn"><i className="fa fa-linkedin" /></a>
                            <a href="#/" title="Youtube"><i className="fa fa-youtube-play" /></a>
                            <a href="#/" title="Vimeo"><i className="fa fa-vimeo-square" /></a>
                            </div>
                            {/*Off Canvas Widget Social End*/}
                        </div>
                        </div>
                    </div>
                </div>
                {/*=======  End of offcanvas mobile menu  =======*/}

            </div>
        )
    }
}

export default MobileMenu;