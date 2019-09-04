import React, { Component } from "react";

class BlogPostContent extends Component {
  render() {
    /* post tag */

    let tagData = [
      { tagLink: "blog-left-sidebar", tagName: "Web Development" },
      { tagLink: "blog-left-sidebar", tagName: "Mobile Apps" },
      { tagLink: "blog-left-sidebar", tagName: "Programming Languages" }
    ];

    let tagDataList = tagData.map((val, i) => {
      return (
        <li key={i}>
          <a href={`${process.env.PUBLIC_URL}/${val.tagLink}`}>{val.tagName}</a>
        </li>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="blog-details col-12">
            <div className="blog-inner">
              <div className="media">
                <div className="image">
                  <img src="assets/img/blog/blog-details-1.jpg" alt="" />
                </div>
              </div>
              <div className="content">
                <ul className="meta">
                  <li>
                    By <a href="blog-left-sidebar">admin</a>
                  </li>
                  <li>30 October 2019</li>
                  <li>
                    <a href="/">3 Comment</a>
                  </li>
                </ul>
                <h2 className="title">
                  Complete Python Bootcamp: Go from zero to hero in Python 3
                </h2>
                <div className="desc section-space--bottom--30">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Impedit eveniet reprehenderit voluptas delectus reiciendis
                    pariatur, totam id quae tempore fugiat tenetur asperiores
                    saepe velit nisi voluptates molestiae quia fugit laboriosam
                    quidem, distinctio dolor consequatur repellendus debitis
                    natus magni. Totam atque provident nulla quasi voluptatum
                    nostrum officia rerum pariatur maxime sit.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iste iure eveniet minima commodi consequuntur veritatis,
                    officiis quibusdam molestias, nemo dolorum veniam quisquam
                    pariatur facilis repudiandae eaque quas assumenda enim, unde
                    placeat dolores id voluptatibus amet.
                  </p>
                  <blockquote className="blockquote section-space--bottom--30 section-space--top--30">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Cupiditate ad totam est optio mollitia dolores rem
                      ducimus. Odio assumenda distinctio adipisci! Consequuntur
                      excepturi eos nulla.
                    </p>
                    <span className="author">__Denise Miller</span>
                  </blockquote>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ipsam explicabo iusto suscipit dolore repellendus odit
                    laborum, cupiditate unde nesciunt eveniet temporibus autem
                    adipisci earum at error aspernatur neque minima doloribus?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reiciendis voluptate repellat quam exercitationem excepturi
                    enim et blanditiis amet minima itaque, doloribus cumque
                    labore. Asperiores nemo odio sed molestias harum laborum
                    quia enim, delectus repellendus consequuntur unde magnam,
                    ipsam possimus vero, quam dolore adipisci. Rerum, vitae!
                  </p>
                </div>
                <ul className="tags">
                  <li>
                    <i className="fa fa-tags" />
                  </li>
                  {tagDataList}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 section-space--top--60">
            <div className="comment-wrapper">
              <h3>Leave Your Comment</h3>
              <div className="comment-form">
                <form action="#">
                  <div className="row row-10">
                    <div className="col-md-6 col-12 section-space--bottom--20">
                      <input type="text" placeholder="Your Name" />
                    </div>
                    <div className="col-md-6 col-12 section-space--bottom--20">
                      <input type="email" placeholder="Your Email" />
                    </div>
                    <div className="col-12">
                      <textarea placeholder="Your Message" defaultValue={""} />
                    </div>
                    <div className="col-12">
                      <input type="submit" defaultValue="Send Comment" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogPostContent;
