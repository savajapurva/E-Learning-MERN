import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    /* sidebar popular post */

    let popularPostData = [
      {
        postImage: "sidebar-blog-1.jpg",
        postTitle: "Making Sense of React Hooks?",
        postLink: "blog-details-left-sidebar",
        postDate: "30 October 2019"
      },
      {
        postImage: "sidebar-blog-2.jpg",
        postTitle: "Set Up Medium Feed in React",
        postLink: "blog-details-left-sidebar",
        postDate: "30 October 2019"
      },
      {
        postImage: "sidebar-blog-3.jpg",
        postTitle: "Five Things I Didn’t Know About Create-React-App",
        postLink: "blog-details-left-sidebar",
        postDate: "30 October 2019"
      }
    ];

    let popularPostDataList = popularPostData.map((val, i) => {
      return (
        <div className="sidebar-blog" key={i}>
          <a href="blog-details-left-sidebar.html" className="image">
            <img src={`assets/img/blog/${val.postImage}`} alt="" />
          </a>
          <div className="content">
            <h5>
              <a href={`${process.env.PUBLIC_URL}/${val.postLink}`}>
                {val.postTitle}
              </a>
            </h5>
            <span>{val.postDate}</span>
          </div>
        </div>
      );
    });

    /* sidebar tag */

    let tagData = [
      { tagLink: "blog-left-sidebar", tagName: "Web Development" },
      { tagLink: "blog-left-sidebar", tagName: "Mobile Apps" },
      { tagLink: "blog-left-sidebar", tagName: "Programming Languages" },
      { tagLink: "blog-left-sidebar", tagName: "Game Development" },
      { tagLink: "blog-left-sidebar", tagName: "Databases" },
      { tagLink: "blog-left-sidebar", tagName: "Software Testing" },
      { tagLink: "blog-left-sidebar", tagName: "Software Engineering" }
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
        <div className="sidebar-wrapper">
          <div className="sidebar">
            <h3 className="sidebar-title">Popular Post</h3>
            {popularPostDataList}
          </div>
          <div className="sidebar">
            <h3 className="sidebar-title">Popular Tags</h3>
            <ul className="sidebar-tag">{tagDataList}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
