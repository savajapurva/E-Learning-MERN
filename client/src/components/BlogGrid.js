import React, {Component} from 'react';

class BlogGrid extends Component{
    render(){
        let data = [
            {img:'1.jpg', date:'AUGUST 4, 2019', title: 'Industry Ministry to Hike', postExcerpt: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex.…', link:'blog-details-left-sidebar'},
            {img:'2.jpg', date:'AUGUST 5, 2019', title: 'Worker Safety: India Appeals', postExcerpt: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex.…', link:'blog-details-left-sidebar'},
            {img:'3.jpg', date:'AUGUST 6, 2019', title: 'Lorem ipsum dolor sit amet.', postExcerpt: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex.…', link:'blog-details-left-sidebar'}
      
        ];

        let DataList = data.map((val, i) => {
            return(
                <div className="col-lg-4" key={i}>
                    <div className="blog-post-slider__single-slide blog-post-slider__single-slide--grid-view">
                        <div className="blog-post-slider__image section-space--bottom--30">
                            <a href={`${process.env.PUBLIC_URL}/${val.link}`}><img src={`assets/img/blog/${val.img}`} className="img-fluid" alt="" /></a>
                            </div>
                            <div className="blog-post-slider__content">
                            <p className="post-date"> {val.date}</p>
                            <h3 className="post-title">
                                <a href={`${process.env.PUBLIC_URL}/${val.link}`}>{val.title}</a>
                            </h3>
                            <p className="post-excerpt">{val.postExcerpt}</p>
                            <a href={`${process.env.PUBLIC_URL}/${val.link}`} className="see-more-link">SEE MORE</a>
                        </div>
                    </div>
                </div>
            )
        });

        return(
            <div>
                {/*====================  blog grid area ====================*/}
                <div className={`blog-grid-area section-space--inner--120 ${this.props.background}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* section title */}
                                <div className="section-title-area text-center">
                                <h2 className="section-title section-space--bottom--50">New Blog <span className="title-icon" /></h2>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="blog-grid-wrapper">
                                <div className="row">
                                    {DataList}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*====================  End of blog grid area  ====================*/}

            </div>
        )
    }
}


export default BlogGrid;