import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const required_fields = [
  "First name", "Last name", "Email address", 
  "Phone number",
]

const optional_fields = [
  "LinkedIn Profile", "Website/Portfolio"
]

const select_fields = [
  "College", "Preferred pronouns", "Resume/CV",
  "How did you hear about this position?",
  "Will you now or in the future require visa sponsorship?"
]

const example_job = {
  title: "Frontend Developer Intern",
  link: "about:blank",
  company: "Company name here",
  location: "Boston, MA",
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  roles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
}

const similar_jobs = [
  example_job, example_job
]

function defineRole(jobObj) {
  return (
    <div>
      <Typography fontWeight="fontWeightBold" align='left' variant='h4'>{jobObj.title}</Typography><br/>
      <Typography align='left' variant='h6'>{jobObj.company}</Typography>
      <Typography align='left' variant='h6'>{jobObj.location}</Typography><br/>
      <Typography align='left' variant='h6'>About Us</Typography>
      <body style={{textAlign: 'left'}}>{jobObj.about}</body><br/>
      <Typography align='left' variant='h6'>What you'll do</Typography>
      <body style={{textAlign: 'left'}}>{jobObj.roles}</body><br/>
      <Typography align='left' variant='h6'>What you should have</Typography>
      <body style={{textAlign: 'left'}}>{jobObj.requirements}</body>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  role: {
    margin: 'auto',
    width: '50%',
    paddingBottom: '5%',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
  formContent: {
    width: '70%',
    paddingLeft: '10%',
  },
  formSize: {
    width: '50%',
    margin: 'auto',
  },
  textfield: {
    marginTop: theme.spacing(4),
  },
}));

export default function Form() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.role}>
       {defineRole(example_job)}
      </div>
      <div className={classes.form}>
        <div className={classes.formContent}>
            <form className={classes.formSize}>
              <Typography variant='h5'>Apply for this position</Typography>
              <Typography align='right' variant='h6'>*Required</Typography>
              {required_fields.map((text) => (
                <div className={classes.textfield}>
                  <TextField
                    required
                    id="outlined-full-width"
                    fullWidth
                    label={text}
                    variant="outlined"/>
                </div>
              ))}
              {optional_fields.map((text) => (
                <div className={classes.textfield}>
                  <TextField
                    id="outlined-full-width"
                    fullWidth
                    label={text}
                    variant="outlined"/>
                </div>
              ))}
              {select_fields.map((text) => (
                <div className={classes.textfield}>
                  <TextField
                    id="outlined-full-width"
                    fullWidth
                    label={text}
                    variant="outlined"/>
                </div>
              ))}
            </form>
            <Button>Submit Application</Button>
        </div>
        <Divider
          style={{marginLeft: '1%', marginRight: '1%'}}
          orientation="vertical" 
          flexItem />
        <div>
          <Typography variant='h6'>Similar positions</Typography>
          <div>
            {similar_jobs.map((jobObj) => (
              <div>
                <a href={jobObj.link}>{jobObj.title}</a><br/>
                {jobObj.company} | {jobObj.location}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}