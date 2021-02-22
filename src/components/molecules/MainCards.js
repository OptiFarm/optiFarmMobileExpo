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
import { Ionicons } from '@expo/vector-icons'; 

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
      fontSize: 14,
      opacity: 0.6,
      fontFamily: 'RobotoMono_500Medium',
      color: 'white',
      paddingTop: SPACING
    },
    itemText: {
      fontSize: 24,
      width: CELL_WIDTH - SPACING * 2,
      fontFamily: 'RobotoMono_500Medium',
      color: 'white',
      paddingTop: SPACING
    },
    itemImage: {
      width: CELL_WIDTH * 0.2,
      height: CELL_WIDTH * 0.2
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
                            height: CELL_HEIGHT / 1.2,
                            width: CELL_WIDTH,
                            margin: SPACING,
                            marginTop: 30
                        }}
                        onPress={() => navigation.navigate(`${item.navigate}`)}
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
                                <View style={{width: 70, height: 70, backgroundColor: `${item.backgroundColor}`, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.itemImage}
                                    />
                                </View>
                                <Text
                                    style={styles.itemText}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                >
                                {item.type}
                                </Text>
                                <Text style={styles.itemSubtype}>{item.desc}</Text>
                            </View>
                            <Ionicons name="chevron-forward-outline" size={35} color="white" style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0, padding: SPACING}} />
                            </SharedElement>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
};