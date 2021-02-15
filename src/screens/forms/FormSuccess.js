import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/core'

// Components
import { Background } from '../../components/atoms/Background'
import { Header } from '../../components/atoms/Header'
import { Button } from '../../components/atoms/Button'
import { Logo } from '../../components/atoms/Logo'

// Theme
import { SPACING, defaultBackground } from '../../config/theme';

export default function FormSuccess () {
    const navigation = useNavigation()
    return (
        <>
          <Background>
            <Feather name="check-square" size={50} color="green" />
            <Header>Medicine Added</Header>
            <Text style={{textAlign: 'center', fontSize: 15, top: 20, opacity: 0.7}}>Your new medicine has been added to the system</Text>
            <Button mode="contained" style={{top: 50, borderRadius: 15}} onPress={() => navigation.navigate('Home')} >
                Done
            </Button>
          </Background>
        </>
    );
};