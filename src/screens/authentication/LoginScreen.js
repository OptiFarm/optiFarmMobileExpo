import { database } from 'faker';
import * as React from 'react';
import {
    StyleSheet,
    Button,
    View,
    Text,
    TextInput,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../components/context'
import UserData from '../../model/Users'

// Components


// Theme
import { SPACING, defaultBackground, height } from '../../config/theme';

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
            <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: 'white', paddingBottom: -50 }}>
                <View style={{marginTop: height / 4}}>
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {
                        isValidUser ? null : 
                        <Text style={{color: 'red'}}>Username must be 4 characters long</Text>
                    } 
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(val) => handlePasswordChange(val)}
                        secureTextEntry
                    />
                    {
                        isValidPassword ? null : 
                        <Text style={{color: 'red'}}>Password must be 8 characters long</Text>
                    } 
                    <Button title="Sign in" onPress={() => {loginHandle(username, password)}} />
                </View>
            </SafeAreaView>
        </>
    );
};