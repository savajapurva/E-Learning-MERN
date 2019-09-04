import React, { Component } from "react";

class BlogPostGrid extends Component {
  render() {
    let data = [
      {
        postLink: "blog-details-left-sidebar",
        postImg: "1.jpg",
        postDate: "AUGUST 4, 2019",
        postTitle: "Vue JS 2 - The Complete Guide (incl. Vue Router & Vuex)",
        postExcerpt:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex…"
      },
      {
        postLink: "blog-details-left-sidebar",
        postImg: "2.jpg",
        postDate: "AUGUST 4, 2019",
        postTitle: "Build Responsive Real World Websites with HTML5 and CSS3",
        postExcerpt:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex…"
      },
      {
        postLink: "blog-details-left-sidebar",
        postImg: "3.jpg",
        postDate: "AUGUST 4, 2019",
        postTitle: "The Complete Web Developer in 2019: Zero to Mastery",
        postExcerpt:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex…"
      },
      {
        postLink: "blog-details-left-sidebar",
        postImg: "1.jpg",
        postDate: "AUGUST 4, 2019",
        postTitle: "Python and Django Full Stack Web Developer Bootcamp",
        postExcerpt:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex…"
      },
      {
        postLink: "blog-details-left-sidebar",
        postImg: "2.jpg",
        postDate: "AUGUST 4, 2019",
        postTitle: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
        postExcerpt:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex…"
      },
      {
        postLink: "blog-details-left-sidebar",
        postImg: "3.jpg",
        postDate: "AUGUST 4, 2019",
        postTitle: "The Complete React Developer Course (w/ Hooks and Redux)",
        postExcerpt:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minus, illo error ratione eos ex…"
      }
    ];

    let Datalist = data.map((val, i) => {
      return (
        <div className="col-sm-6 col-12" key={i}>
          <div className="blog-post-slider__single-slide blog-post-slider__single-slide--grid-view">
            <div className="blog-post-slider__image section-space--bottom--30">
              <a href={`${process.env.PUBLIC_URL}/${val.postLink}`}>
                <img
                  src={`assets/img/blog/${val.postImg}`}
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="blog-post-slider__content">
              <p className="post-date">{val.postDate}</p>
              <h3 className="post-title">
                <a href={`${process.env.PUBLIC_URL}/${val.postLink}`}>
                  {val.postTitle}
                </a>
              </h3>
              <p className="post-excerpt">{val.postExcerpt}</p>
              <a
                href={`${process.env.PUBLIC_URL}/${val.postLink}`}
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
        <div className="row">{Datalist}</div>
      </div>
    );
  }
}

export default BlogPostGrid;
