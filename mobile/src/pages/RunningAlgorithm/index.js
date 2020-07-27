import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';

import loaderImg from '../../assets/loader.png';

export default function ReturnFromConsent ({ navigation }) {

    setTimeout(() => {
        navigation.navigate('Dashboard')
    }, 4000)

    return (
        <View style={styles.container}>

            <Image source={loaderImg} alt="Calculando..." style={styles.loaderImg} />

            <Text style={styles.title}>Carregando as melhores soluções para você...</Text>
            
            <StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7D0C4B',
        paddingHorizontal: 32,
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderImg: {
        maxWidth: 150,
        height: 150,
        marginBottom: 32
    },  
    title: {
        marginBottom: 64,
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    nextScreen: {
        marginTop: 16,
        fontSize: 24
    },
    ctaButton: {

    }
})