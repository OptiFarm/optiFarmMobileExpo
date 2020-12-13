import React from 'react';
import { StyleSheet, View, ImageBackground, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

// Components
import { Button, Input, Avatar } from '@ui-kitten/components';

// Theme
import { SPACING, width } from '../../config/theme';

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
    },
    icon: {
        left: width / 2.75
    }
});

export const HomeUserHeader = (props) => {
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
                <Text style={styles.heading}>Hi, John</Text>
                <Text style={styles.subHeading}>
                    08 December 2020
                </Text>
            </View>
            <Ionicons name="notifications-outline" size={35} color="white" style={styles.icon} />
       </View>
    )
};