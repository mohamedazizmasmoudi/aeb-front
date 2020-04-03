import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";
import "./Posts.css";
import DefaultProfile from "../images/avatar.jpg";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1
    };
  }
  loadPosts = page => {
    list(page).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = posts => {
    return (
      <div className="container">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="col-md-5 container" key={i} style={{ paddingTop: 50 + "px" }}>

        <Card className="root">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className="avatar">
                        <Link to={`/user/${post.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "0px solid black"
                                        }}
                                        className="float-left "
                                        height="45px"
                                        width="45px"
                                        onError={i =>
                                            (i.target.src = `${DefaultProfile}`)
                                        }
                                        src={`${
                                            process.env.REACT_APP_API_URL
                                        }/user/photo/${post.postedBy._id}`}
                                        alt={post.postedBy.name}
                                    />
                                </Link>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            to={`${posterId}`}
            title={posterName}
            subheader={new Date(post.created).toDateString()}
          />
      
          <CardMedia
            className="media"
            image="/static/images/cards/paella.jpg"
            title="Paella dish"
          />
          
          <CardContent> 
            <Typography variant="body2" color="textSecondary" component="p">
            {post.title}
            </Typography> <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={i => (i.target.src = `${DefaultPost}`)}
                  className="img-thunbnail mb-3"
                  style={{ height: "200px", width: "100%" }}
                />
            <Typography variant="body2" color="textSecondary" component="p">
            {post.body.substring(0, 100)}            </Typography>
          </CardContent>
          
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  Read more
                </Link>
          </CardActions>
         
        </Card>
              {/* <div className="card-body"> */}
                {/* <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={i => (i.target.src = `${DefaultPost}`)}
                  className="img-thunbnail mb-3"
                  style={{ height: "200px", width: "100%" }}
                />
                <h5 className="card-title"> {post.title} </h5>
                <p className="card-text"> {post.body.substring(0, 100)} </p>
                <br /> */}
                {/* <p className="font-italic mark">
                  Posted by <Link to={`${posterId}`}> {posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p> */}
                {/* <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  Read more
                </Link> */}
              {/* </div> */}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="container" style={{ paddingTop: 50 + "px" }}>
        <h2 className="mt-5 mb-5">
          {" "}
          {!posts.length ? "No more posts!" : ""}{" "}
        </h2>
        {this.renderPosts(posts)}
        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous({this.state.page - 1}){" "}
          </button>
        ) : (
          ""
        )}
        {posts.length ? (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next({page + 1}){" "}
          </button>
        ) : (
          ""
        )}{" "}
      </div>
    );
  }
}

export default Posts;
