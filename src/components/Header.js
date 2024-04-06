import React from 'react';
import Navigation from './Navigation';
import {createTheme,ThemeProvider } from '@material-ui/core/styles';


const Header = () => {
  const theme = createTheme();
    return (
      <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
      );
    };

export default Header;