import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 

// Components
import { Avatar } from '@ui-kitten/components';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity} from 'react-native';

// Theme
import { SPACING, width } from '../../config/theme';

import { AuthContext } from '../context'

const styles = StyleSheet.create({
    headingContainer: {
        padding: SPACING,
        flexDirection: 'row'
    },
    heading: {
        fontSize: 22,
        marginBottom: SPACING / 2.5,
        color: 'white',
        fontFamily: 'RobotoMono_500Medium'
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
                <Avatar
                    style={{width: 50, height: 50}}
                    size='large'
                    source={require('../../assets/images/conor.png')}
                    ImageComponent={ImageBackground}
                />
            </View>
            <View style={{marginTop: SPACING * -0.25}}>
                <Text style={styles.heading}>Hi, Conor</Text>
                <Text style={styles.subHeading}>
                    16 February 2021
                </Text>
            </View>
       </View>
    )
};