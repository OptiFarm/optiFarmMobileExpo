import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { MaterialIcons } from '@expo/vector-icons'; 

// THEME
import { SPACING, topOS } from '../../config/theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: topOS,
    left: SPACING,
  }
});

export const BackButton = ({ goBack, color }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <MaterialIcons name="arrow-back-ios" size={30} color={color} />
  </TouchableOpacity>
)
