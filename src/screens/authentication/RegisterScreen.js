import * as React from 'react';
import { AuthContext } from '../../components/context'
import UserData from '../../model/Users'
import {useNavigation} from '@react-navigation/core'

// Components
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import { TextInput as Input } from 'react-native-paper'
import { Background } from '../../components/atoms/Background'
import { Header } from '../../components/atoms/Header'
import { Button } from '../../components/atoms/Button'
import { Logo } from '../../components/atoms/Logo'
import { BackButton } from '../../components/atoms/BackButton';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 30,
    },
    input: {
        backgroundColor: 'white',
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
      },
    link: {
        fontWeight: 'bold',
        color: 'black'
    },
});

export default function RegisterScreen ({navigation}) {
    return (
        <>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Create Account</Header>
                <View style={styles.container}>
                    <Input
                        theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
                        label='Full Name'
                        style={styles.input}
                        selectionColor='black'
                        underlineColor="transparent"
                        mode='outlined'
                        // value={username}
                        // onChangeText={(val) => textInputChange(val)}
                        // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    <Input
                        theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
                        label='Email'
                        style={styles.input}
                        selectionColor='black'
                        underlineColor="transparent"
                        mode='outlined'
                        // value={username}
                        // onChangeText={(val) => textInputChange(val)}
                        // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    <Input
                        theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
                        label='Farm Type'
                        style={styles.input}
                        selectionColor='black'
                        underlineColor="transparent"
                        mode='outlined'
                        // value={username}
                        // onChangeText={(val) => textInputChange(val)}
                        // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    <Input
                        theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
                        label='Veterinary Practice'
                        style={styles.input}
                        selectionColor='black'
                        underlineColor="transparent"
                        mode='outlined'
                        // value={username}
                        // onChangeText={(val) => textInputChange(val)}
                        // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    <Input
                        theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
                        label='Password'
                        selectionColor='black'
                        underlineColor="transparent"
                        mode='outlined'
                        // value={username}
                        // onChangeText={(val) => textInputChange(val)}
                        // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                </View>
                <Button
                    mode="contained"
                    // onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
                >
                    Sign Up
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </>
    );
};