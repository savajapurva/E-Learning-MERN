import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

class ServiceGallery extends Component{
    render(){
                
        /* service image gallery slider params*/

        const params = {
            slidesPerView : 1,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.ht-swiper-button-next',
                prevEl: '.ht-swiper-button-prev'
            },
            renderPrevButton: () => (
            <div className="ht-swiper-button-prev ht-swiper-button-nav"><i className="ion-ios-arrow-left" /></div>
            ),
            renderNextButton: () => (
            <div className="ht-swiper-button-next ht-swiper-button-nav"><i className="ion-ios-arrow-forward" /></div>
            )
        };

        /* service image gallery data */

        let imageGalleryData = [
            {img: 'service-details-1.jpg'},
            {img: 'service-details-2.jpg'},
            {img: 'service-details-3.jpg'},
            {img: 'service-details-4.jpg'},
            {img: 'service-details-5.jpg'},
            {img: 'service-details-6.jpg'}
        ];

        
        /* service image gallery component */

        let ImageGalleryDataList = imageGalleryData.map((val, i) => {
            return(
                <div className="swiper-slide service-gallery__single-slide" key={i}>
                    <div className="item">
                        <img src={`assets/img/service/${val.img}`} className="img-fluid" alt="gallery data" />
                    </div>
                </div>
            )
        });


        return(
            <div>
                <div className="service-gallery">
                    <Swiper {...params}>
                        {ImageGalleryDataList}
                    </Swiper>
                </div>
            </div>
        )
    }
}

export default ServiceGallery;