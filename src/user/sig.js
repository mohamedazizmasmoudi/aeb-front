import React from "react";

import Signi from "./Signin";
import Signu from "./Signup";

const Home = () => (
    <div>
    <div className="row" style={{marginRight:0+'px'}}>
      {/* <div className="jumbotron">
        <h2> Home </h2> <p className="lead"> Welcome to React Frontend </p>
      </div> */}
      <div className="col-md-6">
        <Signi />
      </div>
      <div className="col-md-6" id="signup" >
        <Signu />
      </div>
  </div>      <div className="container col-md-3"style={{marginTop:-5+'px'}}><p>Made with ❤️ by Aziz Masmoudi</p>

    </div></div>
  );
  
  export default Home;
  