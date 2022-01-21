import "./Header.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import mainContext from "../../context/mainContext";
import ChangePasswordDialog from "../../component/ChangePasswordDialog/ChangePasswordDialog";
import { useHistory } from "react-router";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PasswordIcon from "@mui/icons-material/Password";
import { decodeToken } from "react-jwt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FirstLogin from "../../component/FirstLogin/FirstLogin";

const Header = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [firstLogin, setFirstLogin] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(true);
  const [isSadmin, setIsSadmin] = React.useState(true);
  const [isStaff, setIsStaff] = React.useState(true);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    React.useState(false);
  const history = useHistory();

  const { token, setToken } = React.useContext(mainContext);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  React.useEffect(() => {
    if (token) {
      setFirstLogin(
        decodeToken(token)
          .role.map((r) => r.authority)
          .filter((r) => r.includes("ROLE_-1")).length !== 0
      );
      setIsAdmin(
        decodeToken(token)
          .role.map((r) => r.authority)
          .filter((r) => r.includes("ROLE_ADMIN")).length !== 0
      );
      setIsSadmin(
        decodeToken(token)
          .role.map((r) => r.authority)
          .filter((r) => r.includes("ROLE_SADMIN")).length !== 0
      );
      setIsStaff(
        decodeToken(token)
          .role.map((r) => r.authority)
          .filter((r) => r.includes("ROLE_STAFF")).length !== 0
      );
    }
  }, [token]);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutOnclick = () => {
    setToken(null);
    localStorage.clear();
  };

  const handleProfileOnclick = () => {
    history.push("/profile");
  };

  const handleChangePasswordOnclick = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileOnclick}>Profile</MenuItem>
      <MenuItem onClick={handleChangePasswordOnclick}>Change password</MenuItem>
      <MenuItem onClick={handleLogoutOnclick}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  return (
    <header className="header" sx={{ flexGrow: 1 }}>
      <FirstLogin open={firstLogin} setOpen={setFirstLogin} />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "contents", sm: "contents" } }}
          >
            <button className="btn-bg" onClick={handleMenu}>
              <MenuIcon />
            </button>
            <a className="a-link" href="/">
              HuLa
            </a>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <ChangePasswordDialog
        open={openChangePasswordDialog}
        setOpen={setOpenChangePasswordDialog}
      />
      <div>
        <React.Fragment key={"left"}>
          <Drawer anchor={"left"} open={openMenu} onClose={handleMenu}>
            <Box
              role="presentation"
              onClick={handleMenu}
              onKeyDown={handleMenu}
            >
              {isSadmin ? (
                <List>
                  <ListItem
                    button
                    key="Home"
                    onClick={() => {
                      history.push("/sadmin");
                    }}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </List>
              ) : isAdmin ? (
                <List>
                  <ListItem
                    button
                    key="Home"
                    onClick={() => {
                      history.push("/admin");
                    }}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem
                    button
                    key="handleInvoice"
                    onClick={() => {
                      history.push("/staff");
                    }}
                  >
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary="Xử lý đơn hàng" />
                  </ListItem>
                  <ListItem
                    button
                    key="order"
                    onClick={() => {
                      history.push("/order");
                    }}
                  >
                    <ListItemIcon>
                      <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đặt hàng" />
                  </ListItem>
                  <ListItem
                    button
                    key="invoice"
                    onClick={() => {
                      history.push("/invoice");
                    }}
                  >
                    <ListItemIcon>
                      <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng của bạn" />
                  </ListItem>
                </List>
              ) : isStaff ? (
                <List>
                  <ListItem
                    button
                    key="Home"
                    onClick={() => {
                      history.push("/staff");
                    }}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem
                    button
                    key="order"
                    onClick={() => {
                      history.push("/order");
                    }}
                  >
                    <ListItemIcon>
                      <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đặt hàng" />
                  </ListItem>
                  <ListItem
                    button
                    key="invoice"
                    onClick={() => {
                      history.push("/invoice");
                    }}
                  >
                    <ListItemIcon>
                      <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng của bạn" />
                  </ListItem>
                </List>
              ) : (
                <List>
                  <ListItem
                    button
                    key="Home"
                    onClick={() => {
                      history.push("/order");
                    }}
                  >
                    <ListItemIcon>
                      <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem
                    button
                    key="invoice"
                    onClick={() => {
                      history.push("/invoice");
                    }}
                  >
                    <ListItemIcon>
                      <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng của bạn" />
                  </ListItem>
                </List>
              )}
              <Divider />
              <List>
                <ListItem button key={"Profile"} onClick={handleProfileOnclick}>
                  <ListItemIcon>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItem>
                <ListItem
                  button
                  key={"Change password"}
                  onClick={handleChangePasswordOnclick}
                >
                  <ListItemIcon>
                    <PasswordIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Change password"} />
                </ListItem>
                <ListItem button key={"Logout"} onClick={handleLogoutOnclick}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      </div>
    </header>
  );
};
export default Header;
