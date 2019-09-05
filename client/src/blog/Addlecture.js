import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowCourse = props => (
  <option key={props.todo.courseName} value={props.todo.courseName}>
    {props.todo.courseName}
  </option>
  // <button type="button" class="list-group-item list-group-item-action">{props.todo.courseName}</button>
);
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      youtubelink: "",
      loaded: 0,
      Courses: [],
      course: "",
      title: ""
    };
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYouTubeLink = this.onChangeYouTubeLink.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/coursebyinstructor?id=" +
          this.props.match.params.id
      )
      .then(response => {
        console.log(this.props.match.params.id);
        this.setState({ Courses: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  CourseList() {
    return this.state.Courses.map(function(currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowCourse todo={currentTodo} key={i} />;
    });
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeYouTubeLink(e) {
    this.setState({
      youtubelink: e.target.value
    });
  }
  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = ["video/mp4", "video/mkv"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  maxSelectFile = event => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkFileSize = event => {
    let files = event.target.files;
    let size = 2000000000000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = event => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0
      });
    }
  };
  onClickHandler = () => {
    console.log(`Todo course: ${this.state.course}`);
    console.log(`Todo title: ${this.state.title}`);

    const data = new FormData();
    data.append("course", this.state.course);
    data.append("title", this.state.title);
    if (this.state.youtubelink == "") {
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }
    } else {
      data.append("videoLink", this.state.youtubelink);
    }

    console.log(data);
    axios
      .post("http://localhost:5000/lectures/localupload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        // then print response status
        toast.success("upload success");
      })
      .catch(err => {
        // then print response status
        toast.error("upload fail");
      });
    setTimeout(
      function() {
        window.location.reload();
      }.bind(this),
      1300
    );
  };

  render() {
    var message2 = "you have selected " + this.state.course;
    return (
      <div>
        <NavBar />
        <div class="container">
          <div class="row" style={{ marginTop: "30px" }}>
            <div class="offset-md-3 col-md-6">
              <form
                action="lectures/localupload"
                method="POST"
                encType="multipart/form-data"
              >
                <h1 className="h3 mb-3 font-weight-normal">Upload Video</h1>
                <div class="form-group files">
                  <div className="form-group">
                    <label>Course Name </label>
                    <select
                      className="form-control"
                      name="course"
                      id="ada"
                      onChange={this.onChangeCourse}
                      value={this.state.course}
                    >
                      {this.CourseList()}
                    </select>
                    <p>{message2}</p>
                  </div>
                  <div className="form-group">
                    <label>Video Title </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>

                  <label>Upload Your File </label>
                  <input
                    type="file"
                    name="file"
                    class="form-control"
                    multiple
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <ToastContainer />
                  <Progress max="100" color="success" value={this.state.loaded}>
                    {Math.round(this.state.loaded, 2)}%
                  </Progress>
                </div>
                <h3 style={{ textAlign: "center" }}> OR </h3>
                <div className="form-group">
                  <label>Add YouTube Video URL </label>
                  <input
                    type="text"
                    placeholder="ex: https://www.youtube.com/embed/yO7Q3YWzY"
                    className="form-control"
                    value={this.state.youtubelink}
                    onChange={this.onChangeYouTubeLink}
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-success btn-block"
                  onClick={this.onClickHandler}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
