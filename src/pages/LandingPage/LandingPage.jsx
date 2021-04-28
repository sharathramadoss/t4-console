import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../../components/Header/Header';
import Form from '../Form/Form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

const LandingPage = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root} fixed>
            {/* COMPONENT - HEADER */}
            <Header />
            {/* COMPONENT - CONTENT */}
            <Form />
        </Container>
    );
}

export default LandingPage;
