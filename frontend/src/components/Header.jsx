import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

// Material UI
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  ButtonGroup,
  Typography,
} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };


  return (
    <>
      <AppBar position="sticky" color="info" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            mx: 2,
          }}
          
        >
          <IconButton
            component={Link}
            to="/"
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2}}
            
          >
            <WarehouseIcon sx={{mr: 2}}/>
            <Typography variant="h6">GarageBarber</Typography>
          </IconButton>
          {user ? (
            <Button variant="outlined" color="primary" href="/login" onClick={onLogout}>
              <LogoutIcon sx={{ mr: 1 }}/>Logout
            </Button>
          ) : (
            <ButtonGroup color="primary">
              <Button component={Link} to="/login">
                <LoginIcon sx={{ mr: 1 }}/> Login
              </Button>
              <Button component={Link} to="/register">
                <AppRegistrationIcon sx={{ mr: 1 }}/> Register
              </Button>
            </ButtonGroup>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
