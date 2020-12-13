import * as React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


// Data
import CardData from '../../config/data/HomePage';

// Theme
import { SPACING, width } from '../../config/theme';

// Sizing
export const CELL_WIDTH = width * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.3;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

const styles = StyleSheet.create({
    itemSubtype: {
      fontSize: 12,
      opacity: 0.6,
      fontFamily: 'RobotoMono_500Medium'
    },
    itemText: {
      fontSize: 24,
      width: CELL_WIDTH - SPACING * 2,
      fontFamily: 'RobotoMono_500Medium'
    },
    itemImage: {
      width: CELL_WIDTH * 0.64,
      height: CELL_WIDTH * 0.64,
      resizeMode: 'contain',
      position: 'absolute',
      alignSelf: 'center',
    }
});

export function MainCards ( { navigation }) {
    return (
        <FlatList
            data={CardData}
            keyExtractor={(item) => item.key}
            horizontal
            snapToInterval={FULL_SIZE}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        style={{
                            height: CELL_HEIGHT,
                            width: CELL_WIDTH,
                            margin: SPACING,
                            marginTop: 30
                        }}
                        onPress={() => navigation.navigate('Herd')}
                    >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <SharedElement
                                id={`item.${item.key}.bg`}
                                style={[StyleSheet.absoluteFillObject]}
                            >
                                <View
                                    style={[
                                    StyleSheet.absoluteFillObject,
                                    { borderRadius: 16, backgroundColor: `${item.color}` },
                                    ]}
                                />
                            </SharedElement>
                            <SharedElement
                                id={`item.${item.key}.meta`}
                                style={[StyleSheet.absoluteFillObject]}
                            >
                            <View style={{ position: 'absolute', padding: SPACING }}>
                                <Text
                                    style={styles.itemText}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                >
                                {item.type}
                                </Text>
                                <Text style={styles.itemSubtype}>{item.desc}</Text>
                            </View>
                            </SharedElement>
                            <SharedElement
                                id={`item.${item.key}.image`}
                                style={styles.itemImage}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                />
                            </SharedElement>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
};