import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


import Asis from '../../assets/secure-data-grey.svg';
import AsisActive from '../../assets/secure-data.svg';
import TLS12 from '../../assets/cyber-security-grey.svg';
import TLS12Active from '../../assets/cyber-security.svg';
import TLS13 from '../../assets/data-encryption-grey.svg';
import TLS13Active from '../../assets/data-encryption.svg';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    header: {
        padding: '10px 2px',
        boxShadow: '0 2px 4px 2px rgba(0,0,0,0.06)'
    },
    title: {
        justifyContent: 'center'
    },
    alignCenter: {
        textAlign: 'center'
    },
    body: {
        marginTop: '16px'
    },
    content: {
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        margin: '0px 16px',
        width: '100%'
    },
    logo: {
        width: '106px',
        height: '48px'
    },
    spanTitle: {
        fontSize: '30px',
        fontWeight: 'bold'
    },
    spanText: {
        fontSize: '24px',
        letterSpacing: '0',
        lineHeight: '45px',
    },
    spanText1: {
        fontSize: '15px',
        fontWeight: '300',
        letterSpacing: '0',
        lineHeight: '18px',
    }
}));

const Form = () => {
    const classes = useStyles();

    const [asisIcon, setAsisIcon] = useState(Asis);
    const [tlsOneTwoIcon, setTlsOneTwoIcon] = useState(TLS12);
    const [tlsOneThreeIcon, setTlsOneThreeIcon] = useState(TLS13);
    const [version, setVersion] = useState(null);
    const [ellipticalParam, setEllipticalParam] = useState(null);

    const tlsMasterData = [
        {
            id: 'asis',
            displayName: 'AS - IS',
            iconId: `${asisIcon}`,
            position: 0,
            hasChild: false
        },
        {
            id: 'tls12',
            displayName: 'TLS 1.2',
            iconId: `${tlsOneTwoIcon}`,
            position: 1,
            hasChild: true,
        },
        {
            id: 'tls13',
            displayName: 'TLS 1.3',
            iconId: `${tlsOneThreeIcon}`,
            position: 2,
            hasChild: true,
        }
    ];

    const ellipticalData = ['secp256r1(0x0017)', 'secp384r1(0X0018)', 'secp521r1(0X0019)', 'X25519(0X001D)', 'X448(0X001E)'];

    const handleTLS = (selectedVersion) => {
        const { id } = selectedVersion;
        if (id === 'asis') {
            setTlsOneTwoIcon(TLS12);
            setTlsOneThreeIcon(TLS13);
            setAsisIcon(AsisActive);
        } else if (id === 'tls12') {
            setAsisIcon(Asis);
            setTlsOneThreeIcon(TLS13);
            setTlsOneTwoIcon(TLS12Active);
        } else {
            setAsisIcon(Asis);
            setTlsOneTwoIcon(TLS12);
            setTlsOneThreeIcon(TLS13Active);
        }
        setVersion(selectedVersion);
    }

    const renderTLSMaster = () => {
        return tlsMasterData.map((data) => {
            return (
                <Grid item xs={3} key={data.id} onClick={() => handleTLS(data)}>
                    <Card>
                        <CardContent className={classes.alignCenter} >
                            <Grid item xs={12}>
                                <img className={classes.img} alt="complex" src={data.iconId} />
                            </Grid>
                            <Grid item xs={12}>
                                <span className={classes.spanText}>{data.displayName}</span>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
    }

    const renderEllipticalParam = () => {
        return ellipticalData.map((data) => {
            return (
                <Grid item xs={2} key={data} onClick={() => setEllipticalParam(data)}>
                    <Card>
                        <CardContent className={classes.alignCenter} >
                            <Grid item xs={12}>
                                <span className={classes.spanText1}>Curve - {data}</span>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
    }

    const showAlert = () => {
        return (
            <Alert severity="success">Data saved successfully!</Alert>
        )
    }

    const submitData = () => {
        const payload = {
            version: version.id,
            ellipticalParam: ellipticalParam
        }
        const data = fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                console.log("response - ", response.status);
                if(response.status === 201) {
                    showAlert();
                }
                return response.json();
            })
            .catch((error) => {
                console.error(error);
            });
        return data;
    }

    return (
        <Grid container className={classes.body} spacing={2}>
            <Card className={classes.content}>
                {/* COMPONENT - Select TLS Version */}
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="subtitle2">
                                Select TLS Version
                            </Typography>
                        </Grid>
                        {renderTLSMaster()}
                    </Grid>
                    {version?.hasChild &&
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle2">
                                    Select Elliptic Curve Parameter
                          </Typography>
                            </Grid>
                            {renderEllipticalParam()}
                        </Grid>
                    }
                </CardContent>
                {/* COMPONENT - CONTENT FOOTER */}
                <CardActions className={classes.title}>
                    <Button variant="contained">Cancel</Button>
                    <Button variant="contained" color="primary" onClick={() => { submitData() }}>
                        Save
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Form;
