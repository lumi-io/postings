import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Redirect, Route } from "react-router";


const Login = () => {
    const classes = useStyles();

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const login = () => {
        if (userInfo["email"] === "" || userInfo["password"] === "") {
            setError("Fields are required.")
            return;
        }
        axios.post(
            'http://127.0.0.1:5000/admin/login',
            userInfo,
            { headers: { 'Content-Type': 'application/json' } }
        ).then((res) => {
            console.log(res)
            return <Redirect to={{ pathname: '/admin/listings', state: {} }} />
        })
    }

    return (
        <BackgroundContainer>
            <CustomContainer>
                <form className={classes.form} noValidate autoComplete="off">
                    <TitleText>lumi</TitleText>
                    <CustomTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="emailAddress"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={userInfo["email"]}
                        onChange={handleTextChange}
                    />
                    <CustomTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={userInfo["password"]}
                        onChange={handleTextChange}
                    />
                    <CustomButton
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                    >
                        Sign In
                  </CustomButton>
                </form>
                <br></br>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Placeholder for forgot password...?
                      </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </CustomContainer>
        </BackgroundContainer>
    )

}

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:#F9F6F9;
`;

const TitleText = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 72px;
    line-height: 84px;
    margin-bottom: 20px;
`;

const CustomTextField = withStyles({
    root: {
        'border-color': "red !important"
    },
})(TextField);

const CustomContainer = withStyles({
    root: {
        // "background-color": "red",
        "position": 'absolute',
        "left": '50%',
        "top": '50%',
        "transform": 'translate(-50%, -50%)',
        "padding-right": "10%",
        "padding-left": "10%",
    }
})(Container);

const CustomButton = withStyles({
    root: {
        "background-color": "#873CA2",
        "color": "#F9F6F9",
        "margin-top": "20px",
        "padding": "10px",
        '&:hover': {
            "background-color": "#a355c0",
            color: '#FFF'
        }
    }
})(Button);


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export default Login;