import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import {useNavigation} from '@react-navigation/core'
import { Ionicons } from '@expo/vector-icons'; 

// Components
import { Input } from '@ui-kitten/components';

// Data
import MedicineData, { homepageMedicineData } from '../../config/data/Medicine';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground, medicineLevelLow, medicineLevelMedium, medicineLevelHigh } from '../../config/theme';

// Sizing
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 18,
        fontFamily: 'RobotoMono_700Bold',
        color: 'white',
        paddingTop: 5
    },
    animalType: {
        fontSize: 15,
        opacity: 0.7,
        top: 5,
        color: 'grey',
        fontFamily: 'RobotoMono_700Bold'
    },
    searchInput: {
        padding: SPACING, 
        top: CELL_HEIGHT / 10, 
        borderRadius: 10, 
        backgroundColor: 'white', 
        width: width / 1.30, 
        borderColor: defaultBackground
    },
    scanIcon: {
        top: CELL_HEIGHT / 5,
        left: width / 30
    },
    hideList: {
        opacity: 0,
        height: 0
    },
    searchInput: {
        padding: SPACING, 
        top: CELL_HEIGHT / 10, 
        borderRadius: 10, 
        backgroundColor: 'white', 
        width: width / 1.30, 
        borderColor: defaultBackground
    },
    showSearch: {
        flexDirection: 'row'
    },
    hideSearch: {
        opacity: 0,
        height: 0
    },
    showHeader: {
        flexDirection: 'row'
    },
    hideHeader: {
        opacity: 0,
        height: 0
    }
});

export default function MedicineList (props) {
    const navigation = useNavigation()
    
    // Seperate data for homepage (render 3)
    const data = props.homepage ? homepageMedicineData : MedicineData
    return (
        <>
            {/* Only in HomeSceen */}
            <View style={props.homepage ? styles.showHeader : styles.hideHeader}>
              <Text
                style={{fontSize: 25, fontFamily: 'RobotoMono_700Bold', top: CELL_HEIGHT / 10, color: 'white', padding: SPACING}}
              >
                View Medicine
              </Text>
              <Text 
                style={[
                  styles.heading,
                  { fontSize: 15, lineHeight: CELL_HEIGHT * 0.6, position: 'absolute', right: 10, fontFamily: 'RobotoMono_700Bold', color: 'white' },
                ]}>
                See All
              </Text>
            </View>

            <View style={props.homepage ? styles.hideSearch : styles.showSearch}>
                <Input
                    placeholder='Search Animal' 
                    // onChangeText={this.handleSearch}
                    style={styles.searchInput}
                    size='large'
                    placeholder='Search for Medicine'
                    textStyle={{height: 35}}
                />
                <TouchableOpacity>
                    <Ionicons name="add-circle-outline" size={45} color="white" style={styles.scanIcon} />
                </TouchableOpacity>
            </View>
            {/* Medicine Cards */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item }) => {

                // Medicine Color
                const color = item.medicineLevel === 'Low Quantity' ? medicineLevelLow
                              : item.medicineLevel === 'Medium Quantity' ? medicineLevelMedium
                              : medicineLevelHigh

                return (
                  <TouchableOpacity 
                    style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: 180 }}
                  >
                  <View style={{ flex: 1, padding: 15 }}>
                      <View style={[StyleSheet.absoluteFillObject,
                          { backgroundColor: cardBackground, borderRadius: 15, borderLeftColor: color, borderLeftWidth: 2}]}></View>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Text style={styles.name}>{item.medicineName}</Text>
                          <Text style={styles.animalType}>{item.medicineType}</Text>    
                        </View>
                        <View style={{position: 'absolute', right: 0}}>
                          <Text style={[styles.name, {color: color, fontSize: 15, top: 20}]}>{item.medicineLevel}</Text>
                        </View>
                      </View>
                      
                      <View
                          style={{
                              borderBottomColor: '#9D9D9D',
                              borderBottomWidth: 1,
                              top: 25,
                              marginBottom: 15
                          }}
                      />
                      <View style={{flexDirection: 'row'}}>
                          <View>
                              <Text style={{fontSize: 15, paddingTop: 35, fontWeight: 'bold', color: 'grey'}}>Quantity</Text>
                              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold' }}>{item.medicineQuantity}</Text>
                          </View>
                          <View style={{position: 'absolute', right: 0}}>
                              <Text style={{fontSize: 15, paddingTop: 35, fontWeight: 'bold', color: 'grey'}}>Date of Purchase</Text>
                              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold' }}>{item.medicinePurchaseDate}</Text>
                          </View>
                      </View>
                  </View>
                </TouchableOpacity>
                );
              }}
            ></FlatList>
        </>
    );
};