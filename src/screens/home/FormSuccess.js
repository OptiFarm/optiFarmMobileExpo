import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/core'

// COMPONENTS
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Background } from '../../components/atoms/Background'
import { Header } from '../../components/atoms/Header'
import { Button } from '../../components/atoms/Button'
import { Logo } from '../../components/atoms/Logo'

// THEME
import { SPACING, defaultBackground } from '../../config/theme';

export default function FormSuccess () {
    const navigation = useNavigation()
    return (
        <>
          <Background>
            <Feather name="check-square" size={50} color="#82F5A8" />
            <Header style={{color:'white', fontSize: 30, fontFamily: 'Sora-SemiBold', top: SPACING}}>Animal Added</Header>
            <Text style={{textAlign: 'center', fontSize: 18, top: 30, opacity: 0.8, color: 'white', fontFamily: 'Sora-SemiBold'}}>Your new animal has been added to the system</Text>
            <Button mode="contained" style={{top: 70, borderRadius: 15}} onPress={() => navigation.navigate('HomeTab')} >
                Done
            </Button>
          </Background>
        </>
    );
};