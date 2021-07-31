import { makeStyles } from '@material-ui/core/styles';

const useStyles =
  makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    input: {
      margin: '7px',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    section: {
      display: 'flex',
    },
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
    },
    rootMobile: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabsMobile: {
      alignSelf: 'center',
      borderBottom: `1px solid ${theme.palette.divider}`,
      minHeight: 150,
      minWidth: 300
    },
    conversation: {
      minWidth: 250,
      maxWidth: 350,
      maxHeight: 400,
      overflow: 'auto',
      margin: 'auto'
    },
  }))
  ;

export { useStyles }