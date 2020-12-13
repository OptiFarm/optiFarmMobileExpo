import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface headerProps {
    label: String;
}

export const PageHeader = ({label}: headerProps) => {
    return (
        <Text style={styles.header}>{label}</Text>
  )
};

const styles = StyleSheet.create({
    header: {
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 35,
        lineHeight: 55,
        color: 'white',
        top: 60,
        left: 15,
        marginBottom: 80
    }
});