import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import { StyleSheet, View, Text, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-paper';

// THEME
import { SPACING, height, defaultBackground, cardBackground, width } from '../../config/theme';

// DATA
import { MedicineFormData } from '../../config/form/Form';

const styles = StyleSheet.create({
    label: {
        color: 'white',
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 20,
        marginLeft: 0,
        fontFamily: 'Sora-SemiBold',
        fontSize: 18
    },
    input: {
        backgroundColor: cardBackground,
        height: 50,
        padding: 10,
        borderRadius: 15,
        fontFamily: 'Sora-SemiBold',
        fontSize: 18,
        color: 'white'
    },
    button: {
        marginTop: 40,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#F3F4B8',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 0,
      borderRadius: 15,
      color: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: cardBackground,
      height: 50,
      fontFamily: 'Sora-SemiBold',
      fontSize: 18
    },
});

export default function MedicineForm ({navigation}) {

    // REACT HOOK FORM FUNCTIONS
    const { register, setValue, handleSubmit, control, reset, errors } = useForm();
    const onSubmit = data => {
      console.log(data);
      navigation.navigate('Home', {screen: 'FormSuccess'});
    };
  
    const onChange = arg => {
      return {
        value: arg.nativeEvent.text,
      };
    };

    const placeholder = {
        label: 'Select quantity type',
        value: null,
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <PageHeader  label="Add New Medicine" goBack={navigation.goBack} showChevron='true'/>
            <KeyboardAvoidingView behavior='height' style={{flex: 1, height: height, width: width}}>

                {/* Form */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={MedicineFormData}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ padding: SPACING, }}
                    renderItem={({ item }) => {
                        return (
                            <>
                            <Text style={styles.label}>{item.a}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    autoFocus={true}
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="medicineName"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.b}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="suppliedBy"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.c}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="dateOfPurchase"
                                rules={{ required: true }}
                                defaultValue={null}
                            />
                            
                            <Text style={styles.label}>{item.d}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    keyboardType='decimal-pad'
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="quantity"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.e}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <RNPickerSelect
                                        items={[
                                            { label: 'Ml', value: 'ml' },
                                            { label: 'Mg', value: 'mg' },
                                            { label: 'Litres', value: 'litres' },
                                            { label: 'Grams', value: 'grams' },
                                            { label: 'Kgs', value: 'kgs' },
                                            { label: 'Units', value: 'units' }
                                        ]}
                                        onValueChange={value => onChange(value)}
                                        style={styles.input}
                                        onBlur={onBlur}
                                        style={pickerSelectStyles}
                                        placeholder={placeholder}
                                    />
                                )}
                                name="quantityType"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.f}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    keyboardType='decimal-pad'
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="withdrawalForMilk"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.g}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    keyboardType='decimal-pad'
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="withdrawalForMeat"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.h}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    keyboardType='decimal-pad'
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="batchNo"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.i}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="expiryDate"
                                rules={{ required: true }}
                                defaultValue={null}
                            />


                            <Text style={styles.label}>{item.j}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                )}
                                name="notes"
                                rules={{ required: true }}
                                defaultValue={null}
                            />
                            
                            <Button
                                contentStyle={{height: 50, width: 25, }} 
                                mode="contained" 
                                color='#F4F3BE' 
                                style={{marginTop: 30, borderRadius: 10}} 
                                contentStyle={{height: 50}} 
                                labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                                onPress={handleSubmit(onSubmit)}
                            >
                                Submit
                            </Button>
                            </>
                        );
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}