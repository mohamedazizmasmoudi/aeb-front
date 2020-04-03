import React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";
import "./sigin.css";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';




class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: true
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };



    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signin(user).then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true });
                    });
                }
            });
        } else {
            this.setState({
                loading: false,
                error: "What day is today? Please write a correct answer!"
            });
        }
    };

    render() {

        const {
            email,
            password,
            error,
            redirectToReferer,
            loading,
            recaptcha
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }
  
        const classes =  makeStyles((theme) => ({
          paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
          avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          },
          form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          },
          submit: {
            margin: theme.spacing(3, 0, 2),
          },
        }));
        return (


          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Avatar className="avatar" style={{    backgroundColor: 'blue'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className="form" noValidate>
              <TextField
               onChange={this.handleChange("email")}
               type="email"
               value={email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                  onChange={this.handleChange("password")}
                  type="password"
                  value={password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                              onClick={this.clickSubmit}

                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit jss4"
                style={{marginTop: 24 + 'px', marginBottom: 24 + 'px' }}
              >
                Sign In
              </Button>
              
              <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" className="opa">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" className="opa">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
      {'Made with ❤️ by Aziz Masmoudi '}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>          </Box>
        </Container>         
        );
    }
}

export default Signin;