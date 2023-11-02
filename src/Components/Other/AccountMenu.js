import { AccountBalanceWallet, AccountCircle, Login, Logout, PersonAdd, TimeToLeave } from '@mui/icons-material';
import { Avatar, Divider, ListItemIcon, ListItemText, MenuItem, styled } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import useApi from 'Components/Hooks/useApi';
import { ROUTE_ADMIN_PROFILE, ROUTE_LOGIN, ROUTE_PROFILE_DASHBOARD, ROUTE_REGISTER, ROUTE_RIDES, ROUTE_WALLET } from 'Store/constants';
import { selectIsAuthenticated, selectUser } from 'Store/selectors';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const StyledMenu = styled((props) => (
    <Menu
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                '& .MuiPaper-root': {
                    borderRadius: 6,
                    // marginTop: theme.spacing(1),
                    minWidth: 280,
                }
            },
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: 180,
    },
}));

const guestMenuItems = [
    { icon: Login, label: "Login", to: ROUTE_LOGIN },
    { icon: PersonAdd, label: "Sign up", to: ROUTE_REGISTER },
]

export default function AccountMenu({ children }) {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { logoutUser } = useApi();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [menuItems, setMenuItems] = useState(guestMenuItems);

    useEffect(() => {
        if (isAuthenticated) {
            if (user.isAdmin) {
                const adminMenuItems = [
                    { icon: AccountCircle, label: `${user.firstName} ${user.lastName}`, to: ROUTE_ADMIN_PROFILE, },
                ]
                setMenuItems(adminMenuItems)
            } else {
                const userMenuItems = [
                    { icon: AccountCircle, label: `${user.firstName} ${user.lastName}`, to: ROUTE_PROFILE_DASHBOARD, secondaryLabel: `₹${user.balance || 0}` },
                    { icon: AccountBalanceWallet, label: "Wallet", to: ROUTE_WALLET },
                    { icon: TimeToLeave, label: "Your Rides", to: ROUTE_RIDES },
                ]
                setMenuItems(userMenuItems);
            }
        } else {
            setMenuItems(guestMenuItems);
        }
    }, [user, isAuthenticated])


    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        // size="small"
                        // sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {isAuthenticated ?
                            <Avatar src={user.profilePicture} sx={{ width: 32, height: 32 }}>{user.firstName ? user.firstName[0] : <AccountCircle />}</Avatar> :
                            <AccountCircle sx={{ width: 32, height: 32 }} />
                        }
                    </IconButton>
                </Tooltip>
            </Box>
            <StyledMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                {!isAuthenticated && <Box>{children}</Box>}
                {menuItems.map((item, index) => (<Box key={index}>
                    <MenuItem
                        key={item.label}
                        component={Boolean(item.to) ? Link : undefined}
                        to={item.to}
                        onClick={item.onClick}
                    >
                        <ListItemIcon>
                            <item.icon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            secondary={item.secondaryLabel || ""}
                        />
                    </MenuItem>
                    {isAuthenticated && index === 0 && <>
                        <Divider />
                        <Box>
                            {children}
                        </Box>
                    </>}
                </Box>
                ))}
                {isAuthenticated && <MenuItem onClick={logoutUser}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                    {`Logout`}
                </MenuItem>}
            </StyledMenu>
        </Fragment>
    );
}
