import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({
      [name]: value,
      fileSize
    });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  newPostForm = (title, body) => (
    <form className="container col-md-6">
      <div className="form-group">
        <label className="text-muted"> Post Photo </label>{" "}
        <TextField id="standard-basic" label="Standard"  onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"/>

        
      </div>{" "}
      <div className="form-group">
        <TextField id="standard-basic" label="Title"  onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}/>
      
      </div>
      <div className="form-group">
    
        <TextField id="standard-basic" label="Body"  onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}/>
     
      </div>
      
      <Button
                              onClick={this.clickSubmit}

                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit jss4"
                style={{marginTop: 24 + 'px', marginBottom: 24 + 'px',marginLeft:145 +'px' ,width:50+'%' }}
              >
                Create Post
              </Button>
    </form>
  );

  render() {
    const {
      title,
      body,
      photo,
      user,
      error,
      loading,
      redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className="container" style={{ paddingTop: 50 + "px" }}>
        <h2 className="mt-5 mb-5"> Create a new post </h2>{" "}
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {" "}
          {error}{" "}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2> Loading... </h2>{" "}
          </div>
        ) : (
          ""
        )}
        {this.newPostForm(title, body)}{" "}
      </div>
    );
  }
}

export default NewPost;
