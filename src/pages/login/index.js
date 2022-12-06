import { Box, Button, FormControl, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import loginBackground from "../../assets/images/loginBackground.jpg"
import loginBg from "../../assets/images/loginBg.jpeg"
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import AppleIcon from '@mui/icons-material/Apple';
import { isValidEmail, isValidPassword, showCustomToast, toastType } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPassword } from '../../redux/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import theme from '../../constants/theme';
export const isLogin = "isLogin"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onClickLogin = () => {
        if (email.trim() == "") {
            showCustomToast("Email is required", toastType.e)
            return
        }
        else if (!isValidEmail(email)) {
            showCustomToast("Valid email is required", toastType.e)
            return
        }
        else if (password.trim() == "") {
            showCustomToast("Password is required", toastType.e)
            return
        }
        else if (!isValidPassword(password)) {
            showCustomToast("Valid password is required", toastType.e)
            return
        }
        else {
            dispatch(loginWithPassword({
                email, password
            })).unwrap()
                .then((originalPromiseResult) => {
                    console.log("originalPromiseResult:", originalPromiseResult);
                    // handle result here
                    if (originalPromiseResult.success) {
                        localStorage.setItem(isLogin, "1")
                        navigate('/dashboard', { replace: true })
                    }
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log("originalPromiseResult:", rejectedValueOrSerializedError);
                    // handle error here
                })
        }
    }
    const icons = [
        {
            icon: () => <FacebookIcon />,
        },
        {
            icon: () => <AppleIcon />,
        },
        {
            icon: () => <GoogleIcon />,
        },
        {
            icon: () => <TwitterIcon />,
        },
    ]

    return (
        <Grid container component={'main'}
            sx={{
                backgroundImage: `url(${loginBg})`,
                // backgroundColor: "blue",
                backgroundRepeat: 'no-repeat',

                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: "100vh",
                margin: 0,
                display: {
                    md: 'flex',
                    xl: "flex",
                    lg: "flex",
                },
            }}>

            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                xl={6}
                lg={6}
                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: { md: '100%', xs: "30%" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "center", md: "flex-start" }
                    }}
                >
                    <Typography sx={{
                        color: "yellowgreen",
                        fontSize: {
                            xs: "30px",
                            md: "45px"
                        },
                        fontFamily: "cursive"
                    }}
                    >{"Redux Toolkit Demo"}</Typography>
                    <Typography sx={{
                        color: 'yellow',
                        fontSize: {
                            xs: "35px",
                            md: "55px"
                        },
                        fontFamily: "cursive"
                    }}
                    >{"Manage App State"}</Typography>
                </Box>
            </Grid>
            <Grid
                xs={12}
                sm={12}
                md={6}
                xl={6}
                lg={6}
                sx={{
                    display: "flex",
                    alignItems: {
                        sm: "center",
                        xs: "center",
                        md: "center"
                    },
                    height: { md: '100%', xs: "70%" },
                    justifyContent: "center"
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderRadius: '10px',
                    width: { xs: "80%", md: "70%", lg: "70%" }
                }}
                    pt={{ lg: 7, xs: 5 }}
                    pr={{ lg: 5, xs: 5 }}
                    pl={{ lg: 5, xs: 5 }}
                    pb={{ lg: 7, xs: 5 }}
                    mb={{ sm: 2, xs: 2 }}
                >
                    <FormControl>
                        <TextField
                            variant='outlined'
                            label={'Email'}
                            placeholder={'Enter email'}
                            fullWidth
                            type={'email'}
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            label={'Password'}
                            autoFocus
                            placeholder={'Enter password'}
                            sx={{ mt: 4 }}
                            fullWidth
                            type={'password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button sx={{
                            backgroundColor: 'hsl(218, 81%, 75%)',
                            color: "white",
                            mt: 5
                        }}
                            disableRipple
                            disableTouchRipple
                            disableElevation
                            variant='contained'
                            onClick={onClickLogin}
                        >
                            {"Login"}
                        </Button>
                    </FormControl>
                    <Typography
                        sx={{
                            alignSelf: "center",
                            mt: 5,
                            color: "black"
                        }}
                        variant={'body1'}
                    >{"----- or continue with -----"}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-evenly',
                            mt: 5,
                        }}
                    >
                        {icons.map((obj) => (
                            <IconButton>
                                <obj.icon />
                            </IconButton>
                        ))}
                    </Box>
                </Box>
            </Grid>
            {/* </Grid> */}
        </Grid>
    )
}

export default Login;

const styles = {
    container: {
        backgroundImage: loginBackground,
        minHeight: "100vh",
        display: "grid",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        flexFlow: "row wrap",
        width: 1,
        webkitBoxPack: "center",
        justifyContent: "center",
        backgroundSize: "cover"
    }
}