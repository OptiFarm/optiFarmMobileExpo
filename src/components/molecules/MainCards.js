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

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_ANIMAL_COUNT } from '../../config/graphql/queries';

// Theme
import { SPACING, width } from '../../config/theme';

// Sizing
export const CELL_WIDTH = width * 0.65;
const CELL_HEIGHT = CELL_WIDTH * 1.45;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

const styles = StyleSheet.create({
    itemSubtype: {
      fontSize: 17,
      fontFamily: 'Sora-SemiBold',
      color: 'white',
      paddingTop: SPACING
    },
    itemText: {
      fontSize: 30,
      width: CELL_WIDTH - SPACING * 2,
      fontFamily: 'Sora-Bold', 
      color: 'white',
      paddingTop: 22
    },
    itemImage: {
      width: CELL_WIDTH * 0.2,
      height: CELL_WIDTH * 0.2
    }
});

export function MainCards ( { navigation, animalCount }) {

    const CardData = [
        {
            id: '1',
            type: 'Herd Book',
            desc: 'Your collection of animals',
            image: 'https://i.ibb.co/3d9GTLc/book.png',
            navigate: 'HerdBook',
            color: '#1C2436',
            backgroundColor: '#FF929C',
            countLabel: 'Animal Count: ',
            count: animalCount,
        },
        {
            id: '2',
            type: 'Medicine Usage',
            desc: 'Your collection of medicated animals',
            image: 'https://i.ibb.co/7k5SnZs/charity.png',
            navigate: 'MedicineUsage',
            color: '#1C2436',
            backgroundColor: '#9968ED',
        },
    ];

    return (
        <FlatList
            data={CardData}
            keyExtractor={(item) => item.id}
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
                            marginLeft: SPACING,
                            marginRight: SPACING,
                            marginBottom: SPACING,
                        }}
                        onPress={() => navigation.navigate('Home', {screen: `${item.navigate}`})}
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
                                <Text style={[styles.itemSubtype, {top: 20}]}>{item.countLabel}<Text style={{color: '#F4F3BE'}}>{item.count}</Text></Text>
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