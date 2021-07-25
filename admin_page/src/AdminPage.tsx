import './App.scss';
import './services/i18n'
import { Route, Router, Switch } from 'react-router-dom';
import SignIn from '../src/components/login'
import NavBar from './components/navbar'
import Tabs from './components/tabs'
import { browserHistory } from './services/browserHistory';
import {UserContextProvider} from './services/userContext'
import AuthorizedComponent from './components/authorized';
import Box from '@material-ui/core/Box';
import Copyright from './components/copyright';
import Container from '@material-ui/core/Container';
import useStyles from './services/styles'


export default function AdminPage() {
  const classes = useStyles();

  return (
    <UserContextProvider>
    <Router history={browserHistory}>
      <NavBar/>
      <Container className={classes.paper} component="main" maxWidth="xl">
        <Switch>
        <Route exact path='/login'>
          <SignIn />
        </Route>
          <AuthorizedComponent>
            <Route exact path='/'>
              <Tabs openTab={0} />
            </Route>
            <Route path='/settings'>
              <Tabs openTab={0} />
            </Route>
            <Route path='/history'>
              <Tabs openTab={1} />
            </Route>
            <Route path='/stats'>
              <Tabs openTab={2} />
            </Route>
            <Route path='/account'>
              <Tabs openTab={3} />
            </Route>
          </AuthorizedComponent>
        </Switch>
        </Container>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Router>
    </UserContextProvider>
  );
}
