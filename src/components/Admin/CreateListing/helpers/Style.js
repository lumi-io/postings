import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

export const Container = styled.div`
    width:100%;
    height:100%;
    padding: 81px 91px 2px 91px;
    flex-direction:container;
    flexGrow: 1;
    padding: theme.spacing(3);
`;

export const Title = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #873CA2; /* Accent Purple */
`;

export const BigTextContainer = styled.div`
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const EssayQuestionContainer = styled.div`
    margin-bottom: 7.5px;
    margin-top: 7.5px;
`;

export const CustomButton = withStyles({
    root: {
        "background-color": "#8A3DA6",
        "margin-right": "5px",
        "&:hover": {
            "background-color": "#61486A"
        }
    }
})(Button);

export const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#61486A',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8A3DA6',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#BEBEBE',
        },
        '&:hover fieldset': {
          borderColor: '#8A3DA6',
          borderWidth: 2
        },
        '&.Mui-focused fieldset': {
          borderColor: '#8A3DA6',
        },
      },
    },
  })(TextField);


export const PurpleSwitch = withStyles({
    switchBase: {
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  export const CustomCancel = withStyles({
    root: {
        "background-color": "#BEBEBE",
        "margin-left": "5px",
        "margin-right": "5px",
        "&:hover": {
            "background-color": "#61486A"
        }
    }
})(Button);