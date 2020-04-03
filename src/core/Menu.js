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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div position="fixed" style={{marginBottom:50+"px"}}>    
{/* 
            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <li className="nav-item">
                    <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
                        Admin
                    </Link>
                </li>
            )} */}<AppBar  >
        <Navbar expand="lg"className="bo"> 
 <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Typography variant="h6" className="title">
  <Link className="nav-link" to="/">
                    Home
                </Link>
    </Typography>
                {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
  <Toolbar>
  <Navbar.Collapse id="basic-navbar-nav">
  <Typography variant="h6" className="title">
  <Link className="nav-link"  to="/">
                    
                </Link>
    </Typography>
    {isAuthenticated() && (


    <Link className="nav-link" to="/">
                  <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
    <HomeIcon />
  </IconButton>     
                    </Link>
  )}
    {isAuthenticated() && (

<Link
                  className={history.location.pathname === '/findpeople' ? 'active nav-link' : 'not-active nav-link'}
                  to="/findpeople"
              >
<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
    <SearchIcon />
  </IconButton>                </Link> 
  )}
    {isAuthenticated() && (

  <Link to={`/post/create`}  className="nav-link">
<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
    <AddCircleIcon />
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

<NavDropdown title="                                " id="basic-nav-dropdown" className="nav-link "style={{marginleft:100 + 'px'}} >

{/* <NavDropdown.Item href="/users"style={isActive(history, `/users`)} > 
<Link to={`/users`}   className="nav-linkk" style={{    color:'black'
            }}> 
            People
        </Link></NavDropdown.Item> */}
<NavDropdown.Divider />
<a style={{ cursor: 'pointer', color: '#fff' ,marginright: 20 + 'px' }}
            onClick={() => signout(() => {
                history.push('/')
                window.location.reload(true)
            })}
            className="nav-linkk" style={{    color:'black'
            }} >
<NavDropdown.Item  >        <span style={{ cursor: 'pointer', color: '#fff' ,marginright: 20 + 'px' }}
            onClick={() => signout(() => {
                history.push('/')
                window.location.reload(true)
            })}
            className="nav-linkk" style={{    color:'black'
            }}
           
        >
            Sign Out
        </span></NavDropdown.Item></a>
</NavDropdown>
)}


    
  

  </Navbar.Collapse></Toolbar>
</Navbar></AppBar>

<FormGroup>

</FormGroup>

    </div>
);

export default withRouter(Menu);
