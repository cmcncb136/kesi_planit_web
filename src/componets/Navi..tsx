import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {getAuth, signOut} from "firebase/auth";
import {useAuth} from "./AuthContext";
import {NavLink} from "react-router-dom";

const pages = ['User', 'Data', 'Board'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const appName = "PlanIt"


function Navi() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    //화면이 작아지면서  메뉴 UI가 변경되고 메뉴 햄버거 버튼을 클릭하면 발생하는 이벤트
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(`open nav menu ${event.currentTarget}`);
        setAnchorElNav(event.currentTarget);
    };

    //우측 유저 클릭하면 발생하는 이벤트
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (setting: string) => {
        setAnchorElUser(null);
        if(setting === 'Logout') {
            signOut(getAuth()).then(r => {
                console.log("logouted");
            }).catch(e => {
                console.log(e);
            })
        }
    };

    const {user} = useAuth()

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    {/* 로고 */}
                    <IconButton sx={{display: {xs: 'none', md: 'flex'}, p: 0 }} >
                        <img
                            src={"/logo.png"}
                            alt="logo"
                            style={{ width: 'auto', height: '5vh', padding: '0px'}}
                            />
                    </IconButton>

                    {/* app-name */}
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to={"/"}
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'serif',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {appName}
                    </Typography>

                    {/* 햄버거 버튼 */}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        {/* 햄버거 Icon Button */}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>

                        {/* 메뉴들 */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    component={NavLink}
                                    to={`/${page.toLowerCase()}`}
                                    key={page}
                                    onClick={handleCloseNavMenu}>
                                    <Typography sx={{textAlign: 'center'}}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* 작아질 때 나오는 중간에 나오는 로고 */}
                    {/*  작은 화면(xs) 에서만 보이고, 중간 이상의 화면(md 이상) */}
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to={"/"}
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {appName}
                    </Typography>

                    {/*큰 화면일 때 있는 우측에 메뉴 버튼들 */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={NavLink}
                                to={`/${page.toLowerCase()}`}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/*우측에 있는 사용자 버튼(유저 정보가 있을 때만 표현) */}
                    {user && <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => { handleCloseUserMenu(setting)}}>
                                    <Typography sx={{textAlign: 'center'}}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> }
                    {
                         !user && <Box sx={{flexGrow: 0}}>
                            <Button component={NavLink} to={"/login"} variant={"text"} color={"inherit"}>Login</Button>
                         </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navi;