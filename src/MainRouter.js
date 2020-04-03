import React from "react";
import { Route, Switch , Router, BrowserRouter} from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from "./admin/Admin";
import { signout, isAuthenticated } from './auth';

const MainRouter = () => (
    <div>



        
        {!isAuthenticated() && (       
        <div className="main">
 <Route exact path="/" component={Signin} />
                 <Route exact path="/signup" component={Signup} />

                 </div>
            )}



         {isAuthenticated() && (

             <BrowserRouter>   
             <div>
                    <Menu />
        <Switch>

            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
                exact
                path="/reset-password/:resetPasswordToken"
                component={ResetPassword}
            />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute
                exact
                path="/post/edit/:postId"
                component={EditPost}
            />
            <Route exact path="/users" component={Users} />
           
            <PrivateRoute
                exact
                path="/user/edit/:userId"
                component={EditProfile}
            />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
        </Switch>
        </div>
        </BrowserRouter>
                    )}
                    
    </div>
);

export default MainRouter;
