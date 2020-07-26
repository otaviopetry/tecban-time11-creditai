import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function WelcomeScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen</Text>
            <TouchableOpacity onPress={ () => navigation.navigate('AddBankAccount')} style={styles.nextScreen} >
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