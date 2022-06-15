import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function DenseAppBar() {
  const classes = useStyles ();

  return (
    <div className={classes.root}>
      <AppBar position="static">
          <div className="container">
        <Toolbar variant="dense">
             <Link className='nav' to="/">  <Typography  variant="h6" color="inherit">
             Giriş
            </Typography>
            </Link>
            <Link className='nav' to="/create">
            <Typography className='nav' variant="h6" color="inherit">
          Sifaris əlavə et
          </Typography>
            </Link> 
        </Toolbar>
          </div>
      </AppBar>
      <br />
      <br />
    </div>
  );
}