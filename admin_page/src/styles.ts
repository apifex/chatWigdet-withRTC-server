import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      padding: theme.spacing(0, 3)
    },
    input: {
        margin: theme.spacing(2),
        marginRight: '20px',
         
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    menuButton: {
      marginRight: 80,
    },
    title: {
    
      flexGrow: 1,
    },
    delete: {
      cursor: 'pointer',
      '&:hover':{
          color: "rgb(199, 33, 33)"
      }
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '70vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      
    },
  }));
  