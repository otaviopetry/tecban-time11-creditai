import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Linking } from 'react-native';

import logoImg from '../../assets/logo-fundo-claro.png';
import bankIcon from '../../assets/bank-icon.png';

import api from '../../services/api';

export default function WelcomeScreen ({ navigation }) {

    const [token, setToken] = useState();
    const [consentId, setConsentId] = useState();
    const [bankURL, setBankURL] = useState();

    useEffect(() => {
        api.get('/bank1/get-token')
            .then(response => {
                setToken(response.data);
            }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        api.get('/bank1/create-consent-request')
            .then(response => {
                setConsentId(response.data);
            }).catch(err => console.log(err));
    }, [token])

    useEffect(() => {
        api.get('/bank1/get-bank-url')
            .then(response => {
                setBankURL(response.data)
            })
            .catch(err => console.log(err));
    }, [consentId])

    useEffect(() => {
        api.get('/bank1/set-redirect-url')
            .then(response => {
                console.log(response.data);
            }).catch(err => console.log(err.data));
    }, []);

    function handleOpenBankApp () {
        Linking.openURL(bankURL);

        setTimeout( () => {
            navigation.navigate('ReturnFromConsent');
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Sua vida financeira sob controle</Text>
                <Text style={styles.subtitle}>Vincule suas contas bancárias e ganhe um auxiliar digital para melhorar suas finanças</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ReturnFromConsent')} style={styles.bank1Button}>
                    <Image source={bankIcon} style={styles.bankIcon} />
                    <Text style={styles.bankButtonText}>Banco 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.bank2Button}>
                     <Image source={bankIcon} style={styles.bankIcon} />
                    <Text style={styles.bankButtonText}>Banco 2</Text>
                </TouchableOpacity>
            </View>

            <StatusBar barStyle="light-content" backgroundColor="#360033" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#E9DAE3',        
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 56,
        paddingHorizontal: 36
    },
    logo: {
        marginBottom: 32,
        maxWidth: 180,
        height: 115,         
    },
    textContainer: {
        width: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#360033'
    },
    subtitle: {
        color: '#360033'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'space-around',
    },
    bankIcon: {
        marginBottom: 16
    },
    bank1Button: {
        alignItems: 'center',
        width: '40%',
        padding: 24,
        borderRadius: 16,
        backgroundColor: '#360033',
    },
    bank2Button: {
        width: '40%',
        alignItems: 'center',
        padding: 24,
        borderRadius: 16,
        backgroundColor: '#7F305F',
    },
    bankButtonText: {
        textAlign: 'center',
        color: '#fff'
    },
    nextScreen: {
        marginTop: 16,
        fontSize: 24
    }
})