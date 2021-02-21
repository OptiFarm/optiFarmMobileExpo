import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export const Paragraph = (props) => <Text style={styles.text} {...props} />

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 15
  },
})