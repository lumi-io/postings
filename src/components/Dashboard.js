import React, {Component} from 'react'; 
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SideMenu from './SideMenu';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    height: 140,
    width: 350,
    padding: theme.spacing(.5),
    display: 'flex',
    flexDirection: 'column',
  },
  applicantPaper: {
    height: 140,
    width: 1210,
    padding: theme.spacing(.5),
    display: 'flex',
    flexDirection: 'column',
  },
  table: {
    minWidth: 1200,
  }
});

const rows = [
  createData('Candidate','Employer', 'Date', 'Feedback obj' ),
  createData('Candidate', 'Employer', 'Date', 'Feedback obj'),
  createData('Candidate', 'Employer', 'Date', 'Feedback obj'),
];

function createData(candidateName, interviewer, date, feedback) {
    return { candidateName, interviewer, date, feedback };
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideMenu: false,
        }
    }

openSideMenu = () => {
    this.setState({showSideMenu: true});
}
closeSideMenu = () => {
    this.setState({showSideMenu: false});
}
render() {
    const {classes, theme} = this.props;
    const {showSideMenu} =this.state;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: showSideMenu,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.openSideMenu}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: showSideMenu,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <SideMenu showSideMenu={showSideMenu} onClose={()=>this.closeSideMenu()} theme={theme}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth='lg' className={classes.container}>
       <Grid container className={classes.root} spacing={3}>
       <Typography variant="h6" gutterBottom ailgn='left'>
                Summary
            </Typography>
            <Grid item xs={12}>
            
                <Grid container justify="left" spacing={10}>
                    <Grid item>
                    
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h2" color="primary" gutterBottom>
                            17
                        </Typography>
                        <Typography component="h5" variant="h5" color="black" gutterBottom>
                            New applications
                        </Typography>
                    </Paper>
                    </Grid>
                    <Grid item>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h2" color="primary" gutterBottom>
                            12
                        </Typography>
                        <Typography component="h5" variant="h5" color="black" gutterBottom>
                            Candidates for reviews
                        </Typography>
                    </Paper>
                    </Grid>
                    <Grid item>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h2" color="primary" gutterBottom>
                            15
                        </Typography>
                        <Typography component="h5" variant="h5" color="black" gutterBottom>
                            Offers extended
                        </Typography>
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>
            
      </Grid>
      
      </Container>
      <Container maxWidth='lg' className={classes.container}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Candidate Name</TableCell>
                <TableCell>Interviewer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.candidateName}>
                  <TableCell component="th" scope="row">
                    {row.candidateName}
                  </TableCell>
                  <TableCell>{row.interviewer}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      </main>
    </div>
  );}
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true}) (Dashboard);