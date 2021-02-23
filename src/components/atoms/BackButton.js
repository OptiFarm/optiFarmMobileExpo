import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { MaterialIcons } from '@expo/vector-icons'; 
import { SPACING } from '../../config/theme';


export const BackButton = ({ goBack, color }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <MaterialIcons name="arrow-back-ios" size={30} color={color} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    left: SPACING,
  }
})