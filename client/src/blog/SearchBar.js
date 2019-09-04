import React from "react";

class SearchBar extends React.Component {
  state = {
    text: ""
  };

  onInputChange = event => {
    this.setState({ text: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onFormSubmit(this.state.text);
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <label>Course Search</label>
          <input
            value={this.state.text}
            onChange={this.onInputChange}
            type="text"
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
