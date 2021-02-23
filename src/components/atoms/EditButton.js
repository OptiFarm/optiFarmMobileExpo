import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { cardBackground } from '../../config/theme'

import { fonts, SPACING, width, height } from '../../config/theme';
import { CELL_HEIGHT } from '../molecules/AnimalList';

export const EditButton = ({ mode, style, ...props }) => (
  <View style={{padding: SPACING, marginTop: 0}}>
    <PaperButton
        theme={{ colors: { primary: cardBackground, underlineColor:'transparent',}}}
        style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: 'white' },
        style,
        ]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
    />
  </View>
)

const styles = StyleSheet.create({
    button: {
        borderRadius: 10, 
        width: '100%',
        marginBottom: 40,
        paddingVertical: 2,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
})