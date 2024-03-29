import React from 'react'
import { Image, StyleSheet } from 'react-native'

export const Logo = () => (
  <Image source={require('../../assets/images/logo.png')} style={styles.image} />
)

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})