import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';

import avatarImg from '../../assets/avatar.png';
import coinImg from '../../assets/credita-coin.png';
import objectiveIcon from '../../assets/objective-icon.png';

export default function Dashboard ({ navigation }) {
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={avatarImg} style={styles.avatar} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.userName}>Roberto</Text>
                    <Text style={styles.userObjective}>Buscando estabilidade financeira </Text>
                    <TouchableOpacity style={styles.scorePanel}>
                        <Image source={coinImg} style={styles.coin} />
                        <Text style={styles.scoreText}>65</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.mainObjective}>
                <Text style={styles.sectionTitle}>Principal objetivo</Text>
                <View style={styles.objectivePanel}>
                    <View style={styles.panelInfo}>
                        <Text style={styles.panelTitle}>Reserva de emergência</Text>
                        <Text style={styles.panelSubtitle}>3 meses</Text>
    
                        <Text style={styles.objectiveStatus}>R$2250,13 / R$ 4500,00</Text>  
                    </View>
                    <View style={styles.panelGraphic}>
                        <Text style={styles.objectiveGraphic}>56%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.otherButtonsContainer}>
                <TouchableOpacity style={styles.serviceButton}>
                    <Text styles={styles.serviceTitle}>meus objetivos</Text>
                    <Image source={objectiveIcon} style={styles.serviceButtonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceButton}>
                    <Text styles={styles.serviceTitle}>meus objetivos</Text>
                    <Image source={objectiveIcon} style={styles.serviceButtonIcon} />
                </TouchableOpacity>
            </View>
            <StatusBar barStyle="light-content" backgroundColor="#360033" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    serviceButtonIcon: {
        maxWidth: 50,
        height: 50
    },
    serviceButton: {
        alignItems: 'center'
    },
    mainObjective: {
        marginBottom: 24
    },
    otherButtonsContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',        
        flexDirection: 'row'
    },
    sectionTitle: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8
    },
    panelTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    panelGraphic: {
        marginLeft: 24
    },
    objectiveGraphic: {
        padding: 16,
        borderRadius: 100,
        backgroundColor: '#16A085',
        color: '#fff'
    },
    panelSubtitle: {
        fontStyle: 'italic'
    },
    objectivePanel: {
        backgroundColor: '#fff',
        paddingVertical: 32,
        paddingHorizontal: 32,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 40 ,
        backgroundColor: '#E9DAE3',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    avatar: {
        maxWidth: 120,
        height: 120,
        marginRight: 16 
    },
    headerTextContainer: {
        flexDirection: 'column'
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#380034'

    },
    userObjective: {
        fontStyle: 'italic',
        color: '#380034'
    },
    scorePanel: {
        backgroundColor: '#fff',
        maxWidth: 80,
        borderRadius: 24,
        marginTop: 8,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    coin: {
        maxWidth: 24,
        height: 24,
        marginRight: 8
    },  
    nextScreen: {
        marginTop: 16,
        fontSize: 24
    }
})