import React, { forwardRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom'
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TabPanel from './tabpanel'
import History from './history'
import Settings from './settings'
import { useStyles } from '../services/styles';

const useVerticalTabs = (openTab: number) => {
  const classes = useStyles();
  const [value, setValue] = useState(openTab);
  const { t } = useTranslation()

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const SettingLink = useMemo(
    () => forwardRef((linkProps, ref) => (
      <Link key={'001'} to={'/settings'} {...linkProps} />
    )), [],
  );

  const HistoryLink = useMemo(
    () => forwardRef((linkProps, ref) => (
      <Link key={'002'} to={'/history'} {...linkProps} />
    )), [],
  );

  const StatsLink = useMemo(
    () => forwardRef((linkProps, ref) => (
      <Link key={'003'} to={'/stats'} {...linkProps} />
    )), [],
  );

  const AccountLink = useMemo(
    () => forwardRef((linkProps, ref) => (
      <Link key={'004'} to={'/account'} {...linkProps} />
    )), [],
  );
  return { t, classes, isMobile, value, handleChange, SettingLink, StatsLink, AccountLink, HistoryLink }
}

interface VerticalTabsProps {
  openTab: number
}

export default function VerticalTabs(props: VerticalTabsProps) {
  const { t, classes, isMobile, value, handleChange,
    SettingLink, StatsLink, AccountLink, HistoryLink } = useVerticalTabs(props.openTab)

  return (
    <div className={isMobile ? classes.rootMobile : classes.root}>
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={isMobile ? classes.tabsMobile : classes.tabs}
      >
        <Tab label={t('Settings')} icon={<SettingsIcon />} component={SettingLink} />
        <Tab label={t('History')} icon={<ChatIcon />} component={HistoryLink} />
        <Tab label={t('Stats')} icon={<EqualizerIcon />} component={StatsLink} />
        <Tab label={t('Account')} icon={<AccountCircleIcon />} component={AccountLink} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Settings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <History />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Stats
      </TabPanel>
      <TabPanel value={value} index={3}>
        Account
      </TabPanel>
    </div>
  );
}
