import * as React from 'react';
import { Feather } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/core'

// COMPONENTS
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-paper';

// THEME
import { SPACING, cardBackground, defaultBackground } from '../../config/theme';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: defaultBackground,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
      color:'white', 
      fontSize: 30, 
      fontFamily: 'Sora-SemiBold', 
      top: SPACING
    },
    subLabel: {
      textAlign: 'center', 
      fontSize: 17, 
      top: 30, 
      opacity: 0.8, 
      color: 'white', 
      fontFamily: 'Sora-SemiBold'
    },
    button: {
      marginTop: 100, 
      borderRadius: 10, 
      width: '100%'
    }
})

export default function FormSuccess ({ route }) {

    const { fromScreen } = route.params;

    const navigateTo = fromScreen === 'Medicine' ? 'MedicineTab' : 'HomeTab';

    const navigation = useNavigation()
    return (
        <>
          <View style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <Feather name="check-square" size={50} color="#82F5A8" />
              <Text style={styles.label}>{fromScreen} Added</Text>
              <Text style={styles.subLabel}>Your new {fromScreen} has been added to the system</Text>
              <Button
                  contentStyle={{height: 50, width: 25,}} 
                  mode="contained" 
                  color='#F4F3BE' 
                  style={styles.button} 
                  contentStyle={{height: 50}} 
                  labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                  onPress={() => navigation.navigate(navigateTo)}
              >
                  Done
              </Button>
            </KeyboardAvoidingView>
          </View>
        </>
    );
};