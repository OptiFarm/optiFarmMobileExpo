import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';
import { cardBackground, defaultBackground } from '../../config/theme';

export const CustomSheetBackground = ({ style, animatedIndex, }) => {
    const containerStyle = useMemo(() => [
        styles.container,
        style,
        {
            backgroundColor: defaultBackground
        },
    ], [style, animatedIndex]);
    return React.createElement(Animated.View, { pointerEvents: "none", style: containerStyle });
};

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
    },
});