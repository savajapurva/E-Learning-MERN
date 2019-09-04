import React, {Component} from 'react';
import Swiper from 'react-id-swiper';

class BrandLogoSlider extends Component{
    render(){

        const params = {
            slidesPerView : 4,
            loop: true,
            speed: 1000,
            spaceBetween : 30,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
           
            // Responsive breakpoints
            breakpoints: {
                1499:{
                    slidesPerView : 4
                },

                991:{
                    slidesPerView : 3
                },

                767:{
                    slidesPerView : 3

                },

                575:{
                    slidesPerView : 2
                }
            }
        }

        let data = [
            {img: '1.png', logoLink: '/'},
            {img: '2.png', logoLink: '/'},
            {img: '3.png', logoLink: '/'},
            {img: '4.png', logoLink: '/'},
            {img: '1.png', logoLink: '/'},
            {img: '2.png', logoLink: '/'},
            {img: '3.png', logoLink: '/'},
            {img: '4.png', logoLink: '/'}
        ];

        let DataList = data.map((val, i)=>{
            return(
                <div className="swiper-slide brand-logo-slider__single" key={i}>
                    <div className="image text-center">
                        <a href={val.logoLink}>
                            <img src={`assets/img/brand-logo/${val.img}`} className="img-fluid" alt="" />
                        </a>
                    </div>
                </div>
            )
        });


        return(
            <div>
                {/*====================  brand logo area ====================*/}
                <div className={`brand-logo-slider-area section-space--inner--60 ${this.props.background}`}>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        {/* brand logo slider */}
                        <div className="brand-logo-slider__container-area">
                            <Swiper {...params}>
                                {DataList}
                            </Swiper>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/*====================  End of brand logo area  ====================*/}
            </div>
        )
    }
}

export default BrandLogoSlider;