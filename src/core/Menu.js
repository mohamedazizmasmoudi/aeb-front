import React, { Fragment } from 'react';
import "./Menu.css";
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import{Navbar,NavDropdown,Form,FormControl,Nav,Button}from'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menuu from '@material-ui/core/Menu';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div >    
{/* 
            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <li className="nav-item">
                    <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
                        Admin
                    </Link>
                </li>
            )} */}<AppBar position="static">

        <Navbar expand="lg"className="bo">
        <Typography variant="h6" className="title">
  <Link className="nav-link" style={isActive(history, '/')} to="/">
                    Home
                </Link>
    </Typography>
                {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Toolbar>
  <Navbar.Collapse id="basic-navbar-nav">
  <Typography variant="h6" className="title">
  <Link className="nav-link" style={isActive(history, '/')} to="/">
                    
                </Link>
    </Typography>



    {isAuthenticated() && (

<Link
                  className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
                  to="/users"
              >
<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
    <MenuIcon />
  </IconButton>                </Link> 
  )}
    {isAuthenticated() && (

  <Link to={`/post/create`}  className="nav-link">
<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
    <MenuIcon />
  </IconButton>                </Link>
    )}
        {!isAuthenticated() && (

                      <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                      <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
    <MenuIcon />
  </IconButton>                              </Link>
   
    )}
{!isAuthenticated() && (

<Link className="nav-link" style={isActive(history, '/')} to="/signin">
<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
<MenuIcon />
</IconButton>                              </Link>

)}{isAuthenticated() && (

  <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            
                            className="nav-linkk"
                        > <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >           
          <AccountCircle />
        </IconButton>
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link> )}
       
        


        {isAuthenticated() && (

<NavDropdown title="Dropdown" id="basic-nav-dropdown" className="nav-link">


<NavDropdown.Item href="/findpeople"style={isActive(history, `/findpeople`)}> 
<Link to={`/findpeople`}   className="nav-linkk" style={{    color:'black'
            }}> <MenuItem >
            Find People</MenuItem>
        </Link></NavDropdown.Item>
<NavDropdown.Divider />

<NavDropdown.Item >        <span style={{ cursor: 'pointer', color: '#fff' }}
            onClick={() => signout(() => {
                history.push('/')
                window.location.reload(true)
            })}
            className="nav-linkk" style={{    color:'black'
            }}
           
        >
            Sign Out
        </span></NavDropdown.Item>
</NavDropdown>
)}


    
  

  </Navbar.Collapse></Toolbar>
</Navbar></AppBar>

<FormGroup>

</FormGroup>

    </div>
);

export default withRouter(Menu);
