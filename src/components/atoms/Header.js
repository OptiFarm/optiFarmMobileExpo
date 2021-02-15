import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { defaultBackground } from '../../config/theme'

export const Header = (props) => <Text style={styles.header} {...props} />

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: defaultBackground,
    fontWeight: 'bold',
  },
})