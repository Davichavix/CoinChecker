import react, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/CoinCheckerLogoSized.svg";
import { deepPurple } from "@mui/material/colors";

const pages = ["Home", "Dashboard", "News"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userInfo");
  const [userInfo, setUserInfo] = useState(JSON.parse(user));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.target);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.target);
  };

  console.log(userInfo);

  const initials = userInfo
    ? userInfo.name
        .match(/(\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("")
        .toUpperCase()
    : "";

  const handleCloseNavMenu = (e) => {
    e.preventDefault();
    const text = e.target.innerText.toLowerCase();
    // console.log(path);
    const path = text === "home" ? "" : text;

    setAnchorElNav(null);

    navigate(path);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, [user]);

  const loginHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <AppBar position="static" style={{ background: "black" }}>
      <Container maxWidth={false} px="1">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Logo height="40px" width="40px" />{" "}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Logo height="40px" width="40px" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box>
            <Typography variant="h6" noWrap component={"div"}>
              {userInfo ? (
                <Button variant="primary" onClick={logoutHandler}>
                  Logout
                </Button>
              ) : (
                <Button variant="primary" onClick={loginHandler}>
                  Login
                </Button>
              )}
            </Typography>
          </Box>
          {initials && (
            <Box sx={{ flexGrow: 0 }}>
              <Avatar sx={{ bgColor: deepPurple[500] }}>{initials}</Avatar>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
