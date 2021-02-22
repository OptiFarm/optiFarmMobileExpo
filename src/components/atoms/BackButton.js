import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { MaterialIcons } from '@expo/vector-icons'; 
import { SPACING } from '../../config/theme';


export const BackButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <MaterialIcons name="arrow-back-ios" size={30} color="black" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50 + getStatusBarHeight(),
    left: SPACING,
  }
})