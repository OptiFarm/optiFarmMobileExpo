import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { topOS } from '../../../src/config/theme'

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
        fontFamily: 'Sora-Bold',
        fontSize: 35,
        lineHeight: 55,
        color: 'white',
        top: topOS,
        left: 15,
        marginBottom: 40
    }
});