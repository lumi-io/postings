import React, {Component} from 'react'; 
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PopUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loginParameters: {
                emailAddress: '',
                password: ''
            }        
        }
    }

    render() {
        const {message, type} = this.props;
        return (
                <Alert severity={type}>
                    {message}
                </Alert>
        )
    }
    

}

PopUp.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string
}

export default PopUp;