import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {BackgroundContainer, TitleText, CustomTextField, CustomContainer, CustomButton} from "./helpers/Style";

import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
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

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export default Login;