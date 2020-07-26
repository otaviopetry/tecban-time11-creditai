import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function ReturnFromConsent ({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Retorno da autorização</Text>
            <TouchableOpacity onPress={ () => navigation.navigate('RunningAlgorithm')} style={styles.nextScreen} >
                <Text style={styles.nextScreen}> {'->'} </Text>
            </TouchableOpacity>

            <StatusBar style="auto" backgroundColor="blue" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dadada',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextScreen: {
        marginTop: 16,
        fontSize: 24
    }
})