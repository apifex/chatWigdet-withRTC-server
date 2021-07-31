import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { UserContext } from '../services/userContext'
import serverActions from '../services/serverActions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import WarningIcon from '@material-ui/icons/Warning';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button'
import TranslateIcon from '@material-ui/icons/Translate';
import { useStyles } from '../services/styles';

const useNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const userContext = useContext(UserContext)
  const { t, i18n } = useTranslation()
  const history = useHistory()

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLLIElement>) => {
    i18n.changeLanguage(event.currentTarget.id)
    setAnchorEl(null);
  };

  const handleLogout = () => {
    serverActions.logout()
    if (userContext?.setUser) userContext.setUser(null)
    history.push("/login");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem id='en' onClick={handleMenuClose}>English</MenuItem>
      <MenuItem id='fr' onClick={handleMenuClose}>Français</MenuItem>
      <MenuItem id='pl' onClick={handleMenuClose}>Polski</MenuItem>
    </Menu>
  );

  return { t, userContext, handleLangMenuOpen, handleLogout, renderMenu }
}

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const { t, userContext, handleLangMenuOpen, handleLogout, renderMenu } = useNavBar()

  return (
    userContext?.user ?
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleLangMenuOpen}
            >
              <TranslateIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              {t('Welcome')}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.section}>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <WarningIcon />
                </Badge>
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>{t("Log out")}</Button>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div> : null
  );
}

