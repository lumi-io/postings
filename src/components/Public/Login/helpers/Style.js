import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:#F9F6F9;
`;

export const TitleText = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 72px;
    line-height: 84px;
    margin-bottom: 20px;
`;

export const CustomTextField = withStyles({
    root: {
        'border-color': "red !important"
    },
})(TextField);

export const CustomContainer = withStyles({
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

export const CustomButton = withStyles({
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