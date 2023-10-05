import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";

const Header = () => {
    const [auth, setAuth] = useAuth()

    const handleLogout= ()=>{
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
        toast.success('Logout Successfull')
    }
  return (
    <>
      <Box>
        <AppBar position="static" >
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: "1"}}>Authentication</Typography>
            <Button color='inherit' component={Link} to= '/'>Home</Button>
            <Button color="inherit" component={Link} to='/about'>About</Button>
            {
                !auth.user ? (
                    <>
                        <Button color="inherit" component={Link} to='/register'>Register</Button>
                        <Button color="inherit" component={Link} to='/login'>Login</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component="" to='/'>{auth.user.name}</Button>
                        <Button color="inherit" component={Link} to='/' onClick={handleLogout}>Logout</Button>
                    </>
                )
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
