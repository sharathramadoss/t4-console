module.exports = {
    TLS_MASTER_DATA: [
        {
            id: 'asis',
            displayName: 'AS - IS',
            iconId: 'asisIcon',
            position: 0,
            hasChild: false
        },
        {
            id: 'tls12',
            displayName: 'TLS 1.2',
            iconId: 'tlsOneTwoIcon',
            position: 1,
            hasChild: true,
        },
        {
            id: 'tls13',
            displayName: 'TLS 1.3',
            iconId: 'tlsOneThreeIcon',
            position: 2,
            hasChild: true,
        }
    ]
}

