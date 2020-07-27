import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ReturnFromConsent ({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={ () => navigation.goBack() }>
                <Icon name="chevron-left" style={styles.goBackIcon} />
            </TouchableOpacity>

            <View style={styles.main}>
                <Text style={styles.title}>Contas conectadas com sucesso!</Text>
    
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={ () => navigation.navigate('RunningAlgorithm')} style={styles.ctaButton}>
                        <Text style={styles.buttonText}>Analisar meu perfil</Text>
                    </TouchableOpacity>
                </View>
    
                <StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7D0C4B',
        paddingHorizontal: 32,
        paddingVertical: 40
    },
    goBackIcon: {
        color: '#fff',
        fontSize: 48
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -100
    },
    title: {
        marginTop: 80,
        marginBottom: 64,
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    buttonText: {
        backgroundColor: '#eaeaea',
        padding: 24,
        borderRadius: 24,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7D0C4B'
    },
    nextScreen: {
        marginTop: 16,
        fontSize: 24
    },
    ctaButton: {

    }
})