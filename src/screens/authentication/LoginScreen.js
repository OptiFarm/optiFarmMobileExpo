import { database } from 'faker';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../components/context'
import UserData from '../../model/Users'

// Components
import {StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import { Button } from '@ui-kitten/components';

// Theme
import { SPACING, defaultBackground, height, width } from '../../config/theme';

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#9D9D9D', 
        borderBottomWidth: 1, 
        width: width / 1.1, 
        top: 20, 
        color: 'white',
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 20
    },
    button: {
        backgroundColor: 'white', 
        borderColor: defaultBackground, 
        height: 60, 
        borderRadius: 10,
        top: height / 5
    },
    errorMsg: {
        color: '#D74747', 
        top: 30
    },
    inputTitle: {
        fontFamily: 'RobotoMono_700Bold', 
        fontSize: 15, 
        color: 'grey'
    }
});

export default function LoginScreen ({navigation}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [inputTextChange, setInputTextChange] = React.useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [isValidUser, setIsValidUser] = React.useState(true);
    const [isValidPassword, setIsValidPassword] = React.useState(true);

    const { signIn } = React.useContext(AuthContext);

    // Check username length
    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setIsValidUser(true)
        } else {
            setIsValidUser(false)
        }
    }

    // Check username length in real time
    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setUsername(val),
            setInputTextChange(true),
            setIsValidUser(true)
        } else {
            setUsername(val),
            setInputTextChange(false),
            setIsValidUser(false)
        }
    } 

    // Check password
    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setPassword(val),
            setIsValidPassword(true)
        } else {
            setPassword(val),
            setIsValidPassword(false)
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = UserData.filter( item => {
            return userName == item.username && password == item.password;
        } );

        if ( username.length == 0 || password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, padding: SPACING, backgroundColor: defaultBackground, paddingBottom: -50 }}>
                <View style={{marginTop: height / 5}}>          
                    <View style={{marginBottom: height / 10}}>
                        <Text style={styles.inputTitle}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                        />
                        {
                            isValidUser ? null : 
                            <Text style={styles.errorMsg}>Username must be 4 characters long</Text>
                        } 
                    </View>
                    <View style={{marginBottom: height / 10}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={(val) => handlePasswordChange(val)}
                            secureTextEntry
                        />
                        {
                            isValidPassword ? null : 
                            <Text style={styles.errorMsg}>Password must be 8 characters long</Text>
                        } 
                    </View>
                </View>
                <Button style={styles.button} onPress={() => {loginHandle(username, password)}}>
                        <Text style={{color: 'black', fontSize: 20, fontFamily: 'RobotoMono_700Bold'}}>Log In</Text>
                </Button>
            </SafeAreaView>
        </>
    );
};