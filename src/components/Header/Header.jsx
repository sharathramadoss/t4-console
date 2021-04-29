import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../../assets/Bitmap.png';

const useStyles = makeStyles(() => ({
    header: {
        padding: '10px 2px',
        boxShadow: '0 2px 4px 2px rgba(0,0,0,0.06)'
    },
    title: {
        paddingTop: '16px !important',
        paddingLeft: '16px !important',
        justifyContent: 'space-around'
    },
    logo: {
        width: '106px',
        height: '48px'
    },
    spanTitle: {
        fontSize: '30px',
        fontWeight: '400',
        color: '#DFA24A'
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.header} spacing={2}>
            <Grid item>
                <img className={classes.logo} alt="complex" src={Logo} />
            </Grid>
            <Grid item xs={12} className={classes.title} sm container>
                <span className={classes.spanTitle}>T4 Console</span>
            </Grid>
        </Grid>
    );
}

export default Header;
