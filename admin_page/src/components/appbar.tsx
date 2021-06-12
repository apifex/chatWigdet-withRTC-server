import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TranslateIcon from '@material-ui/icons/Translate';
import {useStyles} from '../styles'
import {useTranslation} from 'react-i18next'


const NavBar = () => {
    const {t, i18n} = useTranslation()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (event: any) => {
      i18n.changeLanguage(event.target.id) 
      console.log(event.target.id)
      setAnchorEl(null);
    };

    

    return(
    <AppBar position="absolute">
        <Toolbar>
          <IconButton edge="start" onClick={handleClick} className={classes.menuButton} color="inherit" aria-label="menu">
            <TranslateIcon /> 
          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id='en' onClick={handleClose}>English</MenuItem>
        <MenuItem id='fr' onClick={handleClose}>Francais</MenuItem>
        <MenuItem id='pl' onClick={handleClose}>Polski</MenuItem>
        </Menu>
          <Typography variant="h6" className={classes.title}>
            {t("Welcome")} Admin
          </Typography>
          <Button color="inherit">Monday, 27/02/2021</Button>
          <Button color="inherit">23:17</Button>
          <Button color="inherit">{t("Contact")}</Button>
          <Button color="inherit">{t("Log out")}</Button>
        </Toolbar>
      </AppBar>
    )
}

export default NavBar