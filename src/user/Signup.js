import React, { Component } from "react";
import { signup } from "../auth";
import SocialLogin from "./SocialLogin";
import "./signup.css";

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




class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            recaptcha: true
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

;

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signup(user).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open: true
                    });
            });
        } else {
            this.setState({
                error: "What day is today? Please write a correct answer!"
            });
        }
    };


    render() {
        const { name, email, password, error, open, recaptcha } = this.state;
        return (
            
             <Container component="main" maxWidth="xs">
             <CssBaseline />
             <div className="paper">
               <Avatar className="avatar" style={{    backgroundColor: 'blue'}}>
                 <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                 Sign up
               </Typography>
               <form className="form" noValidate>
                 <Grid container spacing={2}>
                   <Grid item xs={12} >
                     <TextField
                       onChange={this.handleChange("name")}
                    type="text"
                    value={name}
                      autoComplete="name"
                       name="Name"
                       variant="outlined"
                       required
                       fullWidth
                       id="Name"
                       label="Name"
                       fullWidth

                       autoFocus
                     />
                   </Grid>
             
                   <Grid item xs={12}>
                     <TextField
                          onChange={this.handleChange("email")}
                          type="email"
                          value={email}
                       variant="outlined"
                       required
                       fullWidth
                       id="email"
                       label="Email Address"
                       name="email"
                       autoComplete="email"
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                            onChange={this.handleChange("password")}
                            type="password"
                            value={password}
                       variant="outlined"
                       required
                       fullWidth
                       name="password"
                       label="Password"
                       type="password"
                       id="password"
                       autoComplete="current-password"
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <FormControlLabel
                       control={<Checkbox value="allowExtraEmails" color="primary" />}
                       label="I want to receive inspiration, marketing promotions and updates via email."
                     />
                   </Grid>
                 </Grid>
                 <Button
                                 onClick={this.clickSubmit}
                                 style={{marginTop: 24 + 'px', marginBottom: 24 + 'px' }}
                   type="submit"
                   fullWidth
                   variant="contained"
                   color="primary"
                   className="submit"
                 >
                   Sign Up
                 </Button>
                 <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>
                 <Grid container justify="flex-end">
                   <Grid item>
                     <Link href="/" variant="body2" className="opa">
                       Already have an account? Sign in
                     </Link>
                   </Grid>
                 </Grid>
               </form>
             </div>
             <Box mt={5}>
             <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ae
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>             </Box>
           </Container>
        );
    }
}

export default Signup;
