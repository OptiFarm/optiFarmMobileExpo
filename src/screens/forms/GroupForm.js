import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import { StyleSheet, View, Text, FlatList, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import RNPickerSelect from 'react-native-picker-select';

// THEME
import { SPACING, height, defaultBackground, cardBackground, width } from '../../config/theme';

// DATA

const styles = StyleSheet.create({
    input: {
        color: 'white',
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 20,
        paddingTop: 20,
        backgroundColor: '#3F3B51',
        borderColor: defaultBackground,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'white', 
        borderColor: defaultBackground, 
        height: 50, 
        borderRadius: 10,
        top: 20
    },
});

export default function GroupForm ({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <PageHeader  label="Add New Group" goBack={navigation.goBack} showChevron='true'/>
            <KeyboardAvoidingView behavior='height' style={{flex: 1, height: height, width: width}}>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}