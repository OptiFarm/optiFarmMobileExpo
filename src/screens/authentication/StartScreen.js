import React from 'react'

// COMPONENTS
import { Logo } from '../../components/atoms/Logo'
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-paper';

// THEME
import { cardBackground } from '../../config/theme'

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 25,
        color: cardBackground,
        fontFamily: 'Sora-Bold'
    },
    text: {
        color: cardBackground,
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 15,
        fontFamily: 'Sora-SemiBold'
    },
    button: {
        marginVertical: 10, 
        borderRadius: 10, 
        width: '100%'
    },
    buttonContent: {
        height: 50,
        width: 25,
    }
})


export default function StartScreen ({ navigation }) {
    return (
        <View style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Logo />
                <Text style={styles.header}>OptiFarm</Text>
                <Text style={styles.text}>Simplify Farming</Text>
                <Button
                    contentStyle={styles.buttonContent} 
                    mode="contained" 
                    color={cardBackground} 
                    style={styles.button} 
                    contentStyle={{height: 50}} 
                    labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: 'white'}}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    Login
                </Button>
                <Button
                    contentStyle={styles.buttonContent} 
                    mode="contained" 
                    color={cardBackground} 
                    style={[styles.button, {backgroundColor: 'white'}]} 
                    contentStyle={{height: 50}} 
                    labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    Sign Up
                </Button>
            </KeyboardAvoidingView>
        </View>
    )
}