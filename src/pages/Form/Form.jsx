import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PeerMap from '../../assets/peer-map.png';
import Asis from '../../assets/secure-data-grey.svg';
import AsisActive from '../../assets/secure-data.svg';
import TLS12 from '../../assets/cyber-security-grey.svg';
import TLS12Active from '../../assets/cyber-security.svg';
import TLS13 from '../../assets/data-encryption-grey.svg';
import TLS13Active from '../../assets/data-encryption.svg';
import { Loader } from 'simple-react-loader'
import { StyledCard } from './Form.styled'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    header: {
        padding: '10px 2px',
        boxShadow: '0 2px 4px 2px rgba(0,0,0,0.06)'
    },
    title: {
        justifyContent: 'center',
        marginTop: '16px'
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
    activeGrid: {
        border: '1px solid #DFA24A',
        backgroundColor: '#FFF7ED'
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
    },
    spacingTop: {
        marginTop: '16px'
    },
    heading: {
        fontSize: '15px',
        letterSpacing: '0',
        lineHeight: '18px'
    },
    saveButton: {
        background: '#DFA24A',
        fontSize: '15px',
        letterSpacing: '0',
        lineHeight: '18px',
        fontWeight: '300',
        width: '90px',
        height: '35px'
    },
    cancelButton: {
        border: '1px solid #DFA24A',
        fontWeight: '300',
        width: '90px',
        height: '35px'
    },
    align: {
        textAlign: 'center'
    }
});

const Form = () => {
    const classes = useStyles();

    const [asisIcon, setAsisIcon] = useState(Asis);
    const [tlsOneTwoIcon, setTlsOneTwoIcon] = useState(TLS12);
    const [tlsOneThreeIcon, setTlsOneThreeIcon] = useState(TLS13);
    const [enableSave, setEnableSave] = useState(false);
    const [version, setVersion] = useState(null);
    const [ellipticalParam, setEllipticalParam] = useState(null);
    const [status, setStatus] = useState(false);
    const [loader, setLoader] = useState(false);

    const tlsMasterData = [
        {
            id: 'as-is',
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
            hasChild: true
        },
        {
            id: 'tls13',
            displayName: 'TLS 1.3',
            iconId: `${tlsOneThreeIcon}`,
            position: 2,
            hasChild: true
        }
    ];

    const ellipticalData = [
        {
            tlsAlg: 'ECDH',
            tlsAlgName: 'secp256r1',
            tlsAlgPrefix: 'Curve 1',
            tlsAlgSuffix: '(0x0017)'
        },
        {
            tlsAlg: 'ECDH',
            tlsAlgName: 'secp384r1',
            tlsAlgPrefix: 'Curve 2',
            tlsAlgSuffix: '(0X0018)'
        },
        {
            tlsAlg: 'ECDH',
            tlsAlgName: 'secp521r1',
            tlsAlgPrefix: 'Curve 3',
            tlsAlgSuffix: '(0X0019)'
        },
        {
            tlsAlg: 'XDH',
            tlsAlgName: 'x25519',
            tlsAlgPrefix: 'Curve 4',
            tlsAlgSuffix: '(0X001D)'
        },
        {
            tlsAlg: 'XDH',
            tlsAlgName: 'x448',
            tlsAlgPrefix: 'Curve 5',
            tlsAlgSuffix: '(0X001E)'
        }
    ];

    const handleTLS = (selectedVersion) => {
        tlsMasterData.find(data => data.id == selectedVersion.id).isActive = true;

        const { id } = selectedVersion;
        if (id === 'as-is') {
            setTlsOneTwoIcon(TLS12);
            setTlsOneThreeIcon(TLS13);
            setAsisIcon(AsisActive);
            setEnableSave(true);
        } else if (id === 'tls12') {
            setAsisIcon(Asis);
            setTlsOneThreeIcon(TLS13);
            setTlsOneTwoIcon(TLS12Active);
            setEnableSave(false);
        } else {
            setAsisIcon(Asis);
            setTlsOneTwoIcon(TLS12);
            setTlsOneThreeIcon(TLS13Active);
            setEnableSave(false);
        }
        setEllipticalParam(null)
        setVersion(selectedVersion);
    }

    const handleEllipticalParam = (data) => {
        setEllipticalParam(data);
        setEnableSave(true);
    }

    const renderTLSMaster = () => {
        return tlsMasterData.map((data) => {
            return (
                <Grid item xs={3} key={data.id} onClick={() => handleTLS(data)}>
                    <StyledCard activecard={data.id === version?.id}>
                        <CardContent className={classes.alignCenter}>
                            <Grid item xs={12}>
                                <img className={classes.img} alt="complex" src={data.iconId} />
                            </Grid>
                            <Grid item xs={12}>
                                <span className={classes.spanText}>{data.displayName}</span>
                            </Grid>
                        </CardContent>
                    </StyledCard>
                </Grid>
            )
        })
    }

    const renderEllipticalParam = () => {
        return ellipticalData.map((data) => {
            return (
                <Grid item xs={2} key={data.tlsAlgName} onClick={() => handleEllipticalParam(data)}>
                    <StyledCard activecard={data.tlsAlgName === ellipticalParam?.tlsAlgName}>
                        <CardContent className={classes.alignCenter} >
                            <Grid item xs={12}>
                                <span className={classes.spanText1}>{data.tlsAlgPrefix} - {data.tlsAlgName}{data.tlsAlgSuffix}</span>
                            </Grid>
                        </CardContent>
                    </StyledCard>
                </Grid>
            )
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStatus(false);
    };

    const showAlert = () => {
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">Data saved successfully!</Alert>
            </Snackbar>
        )
    }

    const submitData = async () => {
        setLoader(true)
        const successResponse = "success";
        const payload = {
            version: version?.id,
            tlsAlg: ellipticalParam?.tlsAlg,
            tlsAlgName: ellipticalParam?.tlsAlgName
        }

        const data = await fetch('http://23.101.26.26:8888/api/v1/tls-config/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if (response.status === 201 || response.status === 202) {
                setStatus(true)
            }
            setLoader(false);
            return successResponse;
        }).catch((error) => {
            setLoader(false);
            console.error(error);
        });
        setLoader(false);
        return data;
    }

    const cancelData = () => {
        setEllipticalParam(null);
        setAsisIcon(Asis);
        setTlsOneTwoIcon(TLS12);
        setTlsOneThreeIcon(TLS13);
        setVersion(null);
        setEnableSave(false);
    }

    return (
        <Grid container className={classes.body} spacing={2}>
            {loader && <Loader showLoader={loader} type="pulse" />}
            <Card className={classes.content}>
                {/* COMPONENT - Select TLS Version */}
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className={classes.spacingTop}>
                            <span className={classes.heading}>
                                Peer Map
                            </span>
                        </Grid>
                        <Grid item xs={12} className={classes.align}>
                            <img alt="complex" src={PeerMap} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className={classes.spacingTop}>
                            <span className={classes.heading}>
                                Select TLS Version
                            </span>
                        </Grid>
                        {renderTLSMaster()}
                    </Grid>
                    {version?.hasChild &&
                        <Grid container spacing={3}>
                            <Grid item xs={12} className={classes.spacingTop}>
                                <span className={classes.heading}>
                                    Select Elliptic Curve Parameter
                                </span>
                            </Grid>
                            {renderEllipticalParam()}
                        </Grid>
                    }
                </CardContent>
                {/* COMPONENT - CONTENT FOOTER */}
                <CardActions className={classes.title}>
                    <Button variant="outlined" className={classes.cancelButton} onClick={() => { cancelData() }}>Cancel</Button>
                    <Button variant="contained" className={classes.saveButton} onClick={() => { submitData() }} disabled={!enableSave}>
                        Save
                    </Button>
                </CardActions>
                {status && showAlert()}
            </Card>
        </Grid>
    );
}

export default Form;
