import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-paper';

// QUERY
import { useMutation } from '@apollo/client';
import { SAVE_OR_UPDATE_MEDICATION } from '../../config/graphql/mutation';

// THEME
import { SPACING, height, defaultBackground, cardBackground, width } from '../../config/theme';

const styles = StyleSheet.create({
    label: {
        color: 'white',
        marginTop: SPACING,
        marginBottom: 10,
        marginHorizontal: 20,
        marginLeft: 0,
        fontFamily: 'Sora-SemiBold',
        fontSize: 18,
        opacity: 0.8,
    },
    input: {
        backgroundColor: cardBackground,
        height: 50,
        padding: 10,
        borderRadius: 15,
        fontFamily: 'Sora-SemiBold',
        fontSize: 20,
        color: 'white',
        marginBottom: 25
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
      fontSize: 18,
      marginBottom: 25
    },
});

export default function MedicineForm ({navigation}) {

    // ADD ANIMAL DATA MUTATION
    const [addMedicine, { data }] = useMutation(SAVE_OR_UPDATE_MEDICATION);


    // REACT HOOK FORM FUNCTIONS
    const { register, setValue, handleSubmit, control, reset, errors } = useForm();
    const onSubmit = data => {
      console.log(data);

    //   Object {
    //     "__typename": "Medication",
    //     "batch_number": "Test 6",
    //     "comments": "test",
    //     "expiry_date": "2021-05-20T00:00:00.000Z",
    //     "id": "607044e45ac8d40bc06abaaa",
    //     "medication_name": "Penstrep",
    //     "medicine_type": "VACCINATION",
    //     "purchase_date": "2020-12-05T00:00:00.000Z",
    //     "quantity": 100,
    //     "quantity_type": "ML",
    //     "remaining_quantity": 100,
    //     "supplied_by": "Glanbia",
    //     "withdrawal_days_dairy": 10,
    //     "withdrawal_days_meat": 10,
    //   },

      const medication_name = data.medicineName;
      const medicine_type = data.medicineType;
      const supplied_by = data.suppliedBy;
      const quantity = parseInt(data.quantity);
      const quantity_type = data.quantityType;
      const withdrawal_days_meat = parseInt(data.withdrawalForMeat);
      const withdrawal_days_dairy = parseInt(data.withdrawalForMilk);
      const batch_number = data.batchNo;
      const expiry_date = data.expiryDate;
      const dateOfPurchase = data.dateOfPurchase;
      const comments = data.notes;

      addMedicine({ variables: { 
        medication_name: medication_name, 
        medicine_type: medicine_type,
        supplied_by: supplied_by,
        quantity: quantity,
        quantity_type: quantity_type,
        withdrawal_days_meat: withdrawal_days_meat,
        withdrawal_days_dairy: withdrawal_days_dairy,
        batch_number: batch_number,
        expiry_date: expiry_date,
        purchase_date: dateOfPurchase,
        comments: comments,
      } });

    // medication_name: "Conor Testing 2"
    // supplied_by: "Virginia Veterinary Clinic"
    // quantity: 1000
    // quantity_type: ML
    // medicine_type: DOSE
    // withdrawal_days_meat: 10
    // withdrawal_days_dairy: 12
    // batch_number: "1237485"
    // expiry_date: "2021-12-12"
    // purchase_date: "2021-04-09"
    // comments: "Testing"

    // addMedicine({ variables: { 
    //     medication_name: 'TESTTEST', 
    //     medicine_type: 'VACCINATION',
    //     supplied_by: 'Glanbia',
    //     quantity: 12,
    //     quantity_type: 'ML',
    //     withdrawal_days_meat: 3,
    //     withdrawal_days_dairy: 4,
    //     batch_number: 'TEST 1',
    //     expiry_date: '2020-11-12',
    //     purchase_date: '2019-11-11',
    //     comments: 'TEST',
    //   } });

    //   navigation.navigate('Home', {screen: 'FormSuccess'});
    };
  
    const onChange = arg => {
      return {
        value: arg.nativeEvent.text,
      };
    };

    const placeholderType = {
        label: 'Select quantity type',
        value: null,
    };

    const placeholderQuantity = {
        label: 'Select quantity type',
        value: null,
    };

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    const ref_input7 = useRef();
    const ref_input8 = useRef();
    const ref_input9 = useRef();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <PageHeader  label="Add New Medicine" goBack={navigation.goBack} showChevron='true'/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1,}}>
                <ScrollView style={{padding: SPACING}}>
                    <>
                    <Text style={styles.label}>Medicine Name</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            autoFocus={true}
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='next'
                            placeholder='Penstrep'
                            placeholderTextColor='#848D95'
                            onSubmitEditing={() => ref_input2.current.focus()}
                            blurOnSubmit={false}
                        />
                        )}
                        name="medicineName"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Medicine Type</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <RNPickerSelect
                                items={[
                                    { label: 'Vaccination', value: 'VACCINATION' },
                                    { label: 'Antibiotic', value: 'ANTIBIOTIC' },
                                    { label: 'Dose', value: 'DOSE' },
                                ]}
                                onValueChange={value => onChange(value)}
                                style={styles.input}
                                onBlur={onBlur}
                                style={pickerSelectStyles}
                                placeholder={placeholderType}
                            />
                        )}
                        name="medicineType"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Supplied By</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='next'
                            placeholder='Glanbia'
                            placeholderTextColor='#848D95'
                            ref={ref_input2}
                            onSubmitEditing={() => ref_input3.current.focus()}
                            blurOnSubmit={false}
                        />
                        )}
                        name="suppliedBy"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Date of Purchase</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='next'
                            placeholder='21 March 2021'
                            placeholderTextColor='#848D95'
                            ref={ref_input3}
                            onSubmitEditing={() => ref_input4.current.focus()}
                        />
                        )}
                        name="dateOfPurchase"
                        rules={{ required: true }}
                        defaultValue={null}
                    />
                    
                    <Text style={styles.label}>Quantity</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            keyboardType='decimal-pad'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='done'
                            placeholder='5'
                            placeholderTextColor='#848D95'
                            ref={ref_input4}
                        />
                        )}
                        name="quantity"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Quantity Type</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <RNPickerSelect
                                items={[
                                    { label: 'ML', value: 'ML' },
                                    { label: 'MG', value: 'MG' },
                                    { label: 'Count', value: 'COUNT' },
                                    { label: 'Unassigned', value: 'UNASSIGNED' },
                                ]}
                                onValueChange={value => onChange(value)}
                                style={styles.input}
                                onBlur={onBlur}
                                style={pickerSelectStyles}
                                placeholder={placeholderQuantity}
                            />
                        )}
                        name="quantityType"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Withdrawal For Milk</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            keyboardType='decimal-pad'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='done'
                            placeholder='12'
                            placeholderTextColor='#848D95'
                            onSubmitEditing={() => ref_input5.current.focus()}
                            blurOnSubmit={false}
                        />
                        )}
                        name="withdrawalForMilk"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Withdrawal For Meat</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            keyboardType='decimal-pad'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='done'
                            placeholder='10'
                            placeholderTextColor='#848D95'
                            ref={ref_input5}
                            onSubmitEditing={() => ref_input6.current.focus()}
                            blurOnSubmit={false}
                        />
                        )}
                        name="withdrawalForMeat"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Batch</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            keyboardType='decimal-pad'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='done'
                            placeholder='11233'
                            placeholderTextColor='#848D95'
                            ref={ref_input6}
                            onSubmitEditing={() => ref_input7.current.focus()}
                        />
                        )}
                        name="batchNo"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Expiry Date</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='next'
                            placeholder='21 January 2022'
                            placeholderTextColor='#848D95'
                            ref={ref_input7}
                            onSubmitEditing={() => ref_input8.current.focus()}
                        />
                        )}
                        name="expiryDate"
                        rules={{ required: true }}
                        defaultValue={null}
                    />


                    <Text style={styles.label}>Notes</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            returnKeyType='done'
                            ref={ref_input8}
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
                        style={{marginVertical: SPACING, borderRadius: 10}} 
                        contentStyle={{height: 50}} 
                        labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                    </>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}