import React, {MouseEvent, useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import serverActions from '../services/serverActions';
import {UserContext} from '../services/userContext'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const useSignIn = () => {
  const classes = useStyles();
  const {t} = useTranslation()
  const [credentials, setCredentials] = useState({
                                            email: '',
                                            password: '',
                                          })
  const userContext = useContext(UserContext)
  const history = useHistory();
  const [inputError, setInputError] = useState<{email: string | null, password: string | null}>({
    email: null,
    password: null
  })

  const handleInput = (e: React.ChangeEvent) => {
    const event = (e.currentTarget as HTMLInputElement)
    setInputError({...inputError, [event.id]: null})
    setCredentials({...credentials, [event.id]: event.value})
  }

  useEffect(()=>{
    if (userContext?.user) history.push('/settings')
  })

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const user = await serverActions.login(credentials.email, credentials.password)
    if (user.status==='error') {
      if (user.message.includes('email')) setInputError({...inputError, email: user.message})
      if (user.message.includes('password')) setInputError({...inputError, password: user.message})
      return
    }
    if (userContext) userContext.setUser(user)
    history.push("/settings");
  }

  return {t, classes, handleInput, handleSubmit, inputError}
}


const SignIn = () => {
  const {t, classes, handleInput, handleSubmit, inputError} = useSignIn()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={inputError.email?true:false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleInput}
            helperText={inputError.email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={inputError.password?true:false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInput}
            helperText={inputError.password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {t('Log In')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn