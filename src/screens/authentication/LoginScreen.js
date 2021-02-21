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
    errorMsg: {
        color: '#D74747', 
        top: 10
    },
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: 'white',
    },
    error: {
        fontSize: 13,
        color: 'red',
        paddingTop: 8,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
        marginTop: 70,
    },
    forgot: {
        opacity: 0.7,
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: 'black',
    },
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
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Welcome back.</Header>
                <View style={styles.container}>
                    <Input
                        theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
                        label='Username'
                        style={styles.input}
                        selectionColor='black'
                        underlineColor="transparent"
                        mode='outlined'
                        value={username}
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {
                        isValidUser ? null : 
                        <Text style={styles.errorMsg}>Username must be 4 characters long</Text>
                    } 
                    <Input
                        theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
                        label='Password'
                        style={{top: 50}}
                        selectionColor='black'
                        underlineColor="transparent"
                        mode='outlined'
                        value={password}
                        onChangeText={(val) => handlePasswordChange(val)}
                        secureTextEntry
                    />
                    {
                        isValidPassword ? null : 
                        <Text style={{top: 60, color: '#D74747'}}>Password must be 8 characters long</Text>
                    }
                    <View style={styles.forgotPassword}>
                        <TouchableOpacity
                        // onPress={() => navigation.navigate('ForgotPasswordScreen')}
                        >
                        <Text style={styles.forgot}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View> 
                    <Button mode="contained" onPress={() => {loginHandle(username, password)}}>
                        Login
                    </Button>
                </View>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </>
    );
};