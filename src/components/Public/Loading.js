import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const LoadingScreen = () => {
    return (
    <Container style={{position: 'absolute', left: '50%', top: '50%'}}>
        <CircularProgress size='80px' style={{color: '#873CA2'}} />
    </Container>
    )
}

export default LoadingScreen