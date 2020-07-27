import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import logoImg from '../../assets/logo-fundo-escuro.png';
import welcomeIllustration from '../../assets/welcome-illustration.png';

export default function FirstPage ({ navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logoImg} alt="Logo da credita.ai" style={styles.logo} />
            <Image source={welcomeIllustration} styles={styles.welcomeIllustration} />
            <View style={styles.textContainer}>
                <Text style={styles.welcomeTitle}>Tome controle da sua vida financeira</Text>
                <Text style={styles.welcomeText}>Com o credita.ai, você centraliza suas informações financeiras e conta com o nosso algoritmo para definir um caminho para os seus objetivos</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={ () => navigation.navigate('WelcomeScreen') }>
                    <Text style={styles.createAccount}> Criar conta </Text> 
                </TouchableOpacity>
    
                <TouchableOpacity onPress={ () => navigation.navigate('WelcomeScreen') }>
                    <Text style={styles.signIn}> Entrar </Text> 
                </TouchableOpacity>
            </View>

            <StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
        </SafeAreaView>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#360033',        
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 56,
    },
    nextScreen: {
        marginTop: 16,
        fontSize: 24
    },
    logo: {
        marginBottom: 16,
        maxWidth: 200,
        height: 120,         
    },
    welcomeIllustration: {
        marginBottom: 24,
        maxWidth: 180,
        height: 220
    },
    textContainer: {
        flex: 1,
        width: '100%',
        marginTop: 56,
        paddingHorizontal: 40
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    welcomeText: {
        color: '#fff'
    },
    buttonContainer: {
        width: '100%',
        paddingLeft: 24,
        paddingRight: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    createAccount: {
        backgroundColor: '#fff',
        color: "#360033",
        padding: 16,
        borderRadius: 32
    },
    signIn: {
        color: '#fff'
    }
})