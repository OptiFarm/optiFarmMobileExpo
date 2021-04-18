import * as React from 'react';
import { AuthContext } from '../../components/context'
import { MaterialIcons } from '@expo/vector-icons'; 
import { getStatusBarHeight } from 'react-native-status-bar-height';

// COMPONENTS
import { StyleSheet, View, Text, Alert, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Logo } from '../../components/atoms/Logo'

// DATA 
import UserData from '../../model/Users'

// THEME
import { cardBackground, SPACING } from '../../config/theme'

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        left: SPACING
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: SPACING
    },
    parentContainer: {
        flex: 1,
        padding: 20,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 340,
    },
    input: {
        height: 50,
        borderRadius: 10,
        borderColor: cardBackground,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        fontFamily: 'Sora-SemiBold',
        fontSize: 20,
        color: cardBackground,
        marginBottom: 30,
        paddingLeft: SPACING
    },
    errorMsg: {
        color: '#D74747', 
        marginBottom: 30,
        top: -20
    },
    container: {
        width: '100%',
        marginVertical: 12,
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
    },
    forgot: {
        opacity: 0.7,
        fontSize: 13,
        fontFamily: 'Sora-SemiBold'
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontFamily: 'Sora-Bold',
        color: cardBackground,
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
            <View style={styles.background}>
                <View style={[styles.navBar, {marginTop: getStatusBarHeight()}]}>
                    <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                        <MaterialIcons name="arrow-back-ios" size={30} color={cardBackground} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Sora-Bold', fontSize: 30, color: cardBackground, right: 0}}>
                        Log In
                    </Text>
                    <Text style={styles.rightContainer}>
                    </Text>
                </View>
                <KeyboardAvoidingView style={styles.parentContainer} behavior="padding">  
                    <View style={styles.container}>
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            returnKeyType='done'
                            value={username}
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                        />
                        {
                            isValidUser ? null : 
                            <Text style={styles.errorMsg}>Username must be 4 characters long</Text>
                        } 
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            returnKeyType='done'
                            value={password}
                            onChangeText={(val) => handlePasswordChange(val)}
                            secureTextEntry
                        />
                        {
                            isValidPassword ? null : 
                            <Text style={styles.errorMsg}>Password must be 8 characters long</Text>
                        }
                        <View style={styles.forgotPassword}>
                            <TouchableOpacity
                            // onPress={() => navigation.navigate('ForgotPasswordScreen')}
                            >
                            <Text style={styles.forgot}>Forgot your password?</Text>
                            </TouchableOpacity>
                        </View> 
                        <Button
                            contentStyle={{height: 50, width: 25, }} 
                            mode="contained" 
                            color={cardBackground} 
                            style={{marginTop: 100, borderRadius: 10}} 
                            contentStyle={{height: 50}} 
                            labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: 'white'}}
                            onPress={() => {loginHandle(username, password)}}
                        >
                            Login
                        </Button>
                    </View>
                    <View style={styles.row}>
                        <Text style={{color: cardBackground}}>Don’t have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                            <Text style={styles.link}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};