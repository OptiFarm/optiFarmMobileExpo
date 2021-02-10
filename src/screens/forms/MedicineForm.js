import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import {StyleSheet, View, Text, TextInput, Alert, FlatList, TouchableOpacity} from 'react-native';
import GoBack from '../../components/atoms/GoBack';
import { PageHeader } from '../../components/atoms/PageHeader'
import { Input, IndexPath, Select, Button } from '@ui-kitten/components';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// Data
import MedicineFormData from '../../config/form/MForm';

// Sizing
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    input: {
        color: 'white',
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 20,
        paddingTop: 20,
        backgroundColor: '#3F3B51',
        borderColor: defaultBackground,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'white', 
        borderColor: defaultBackground, 
        height: 50, 
        borderRadius: 10,
        top: 20
    },
});

export default function MedicineForm () {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <GoBack />
            <PageHeader  label="Medicine Details"/>
                
            {/* Form */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={MedicineFormData}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => {

                return (
                    <>
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.a}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.b}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.c}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.d}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.e}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.f}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.g}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.h}
                        textStyle={{height: 35}}
                    />
                    <Input
                        style={styles.input}
                        size='large'
                        placeholder={item.i}
                        textStyle={{height: 35}}
                    />
                    <Button style={styles.button}>
                        <Text style={{color: 'black', fontSize: 20, fontFamily: 'RobotoMono_700Bold'}}>Done</Text>
                    </Button>
                    </>
                );
              }}
            ></FlatList>
        </SafeAreaView>
    )
}