import React, { useState } from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    // const history = useHistory();
    const classes = useStyles();

    const { loginWithRedirect } = useAuth0();

    const [key, setKey] = useState("");

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");


    const enableLogin = (event) => {
        event.preventDefault();
        if (key === "") {
            setError(true);
            setErrorText("Fields are required.");
        } else if (key === process.env.REACT_APP_WHYPHI_PASSWORD) {
            loginWithRedirect();
        }  else {
            setError(true);
            setErrorText("Incorrect key.");
        }
        return;
    }

    return (
        <BackgroundContainer>
            <CustomContainer>
                <form className={classes.form} noValidate autoComplete="off">
                    <TitleText>whyphi</TitleText>
                    <CustomTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="key"
                        label="Key"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={key}
                        onChange={(e) => {setKey(e.target.value)}}
                        error={error}
                        helperText={errorText}
                    />
                    <CustomButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={enableLogin}
                    >
                        Authorize
                  </CustomButton>
                </form>
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