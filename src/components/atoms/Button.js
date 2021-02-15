import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { cardBackground } from '../../config/theme'

export const Button = ({ mode, style, ...props }) => (
  <PaperButton
    theme={{ colors: { primary: 'black',underlineColor:'transparent',}}}
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: 'black' },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  />
)

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: 'white'
  },
})