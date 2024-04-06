import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles, createTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  link: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.5),
    },
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Navigation = () => {
  const theme = createTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Ethereum Blockchain Explorer
          </Typography>
          {!isMobile && (
            <>
              <Link to="/" variant="button" underline="none" color="inherit" className={classes.link}>
                Transactions
              </Link>
              <Link to="/transfer" variant="button" underline="none" color="inherit" className={classes.link}>
                Transfer
              </Link>
              <Link to="/blocks" variant="button" underline="none" color="inherit" className={classes.link}>
                Blocks
              </Link>
            </>
          )}
          {isMobile && (
            <>
              <Button variant="text" href="/" color="inherit" className={classes.button}>
                Transactions
              </Button>
              <Button variant="text" href="/transfer" color="inherit" className={classes.button}>
                Transfer
              </Button>
              <Button variant="text" href="/blocks" color="inherit" className={classes.button}>
                Blocks
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navigation;