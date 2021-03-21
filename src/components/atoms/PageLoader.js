import React from 'react';

// COMPONENTS
import { View, ActivityIndicator} from 'react-native';

// THEME
import { cardBackground, defaultBackground } from '../../config/theme';

export const PageLoader = () => {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: defaultBackground}}>
          <ActivityIndicator />
        </View>
    )
};