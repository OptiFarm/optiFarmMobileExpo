import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { AuthContext } from '../context'

// Components
import { Avatar } from 'react-native-paper';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

// Theme
import { SPACING } from '../../config/theme';

const styles = StyleSheet.create({
    headingContainer: {
        padding: SPACING,
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontSize: 22,
        marginBottom: SPACING / 2.5,
    },
    subHeading: {
        fontSize: 12,
        opacity: 0.4,
        color: 'white'
    }
});


export const HomeUserHeader = (props) => {
    const { signOut } = React.useContext(AuthContext)
    return (
        <View style={styles.headingContainer}>
            <View style={{marginRight: SPACING}}>
                <Avatar.Image
                    size={50}
                    source={require('../../assets/images/conor.png')}
                />
            </View>
            <MaterialIcons name="notifications" size={35} color="white" style={{position: 'absolute', right: 0, paddingRight: SPACING}} />
            <TouchableOpacity onPress={() => {signOut()}} style={{position: 'absolute', right: 0, paddingRight: 60}}>
                <MaterialIcons name="logout" size={35} color="white"/>
            </TouchableOpacity>
       </View>
    )
};