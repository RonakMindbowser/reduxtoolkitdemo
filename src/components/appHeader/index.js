import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import theme from '../../constants/theme';
import { singout } from '../../redux/slices/dashboardSlice';

function AppHeader() {
    const [open, setOpen] = React.useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSignoutClick = () => {
        dispatch(singout()).unwrap()
            .then((originalPromiseResult) => {
                console.log("originalPromiseResult:", originalPromiseResult);
                // handle result here
                if (originalPromiseResult.success) {
                    localStorage.clear()
                    navigate('/login', { replace: true })
                }
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("originalPromiseResult:", rejectedValueOrSerializedError);
            })
    }

    return (
        <AppBar position='fixed'
            sx={{
                backgroundImage: "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));",
            }}
        >
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1
                    }}
                >
                    <Typography sx={{
                        color: "white",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        fontSize: '18px'
                    }}>
                        {"Dashboard"}
                    </Typography>
                </Box>
                <Box>
                    <Button variant='text' sx={{
                        color: "white",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        fontSize: '14px'
                    }}
                        onClick={() => setOpen(true)}
                    >
                        {"Logout"}
                    </Button>
                </Box>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="logout-dialog"
                    fullWidth
                    maxWidth="sm"
                    onBackdropClick="false"
                >
                    <DialogTitle >{'Logout'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{'Are you sure you want to log out?'}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen(false)}
                            sx={{ mt: 0, fontSize: '15px' }}
                        >
                            {'Cancel'}
                        </Button>
                        <Button
                            onClick={onSignoutClick}
                            sx={{ mt: 0, fontSize: '15px' }}
                        >
                            {'Yes'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader