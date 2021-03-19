import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import { StyleSheet, View, Text, TextInput, Platform} from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import { Button } from 'react-native-paper';

// THEME
import { SPACING, height, defaultBackground, cardBackground, width } from '../../config/theme';

// DATA
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { DatePickerIOS } from 'react-native';

const styles = StyleSheet.create({
    label: {
        color: 'white',
        marginTop: 30,
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
    },
    button: {
        marginTop: 40,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#F3F4B8',
    },
});

export default function AssignMedication ({ navigation, route }) {

    const {animalID, medicineName, withdrawalMeat, withdrawalMilk, medicineQuantity, color} = route.params;

    // REACT HOOK FORM FUNCTIONS
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        // console.log(data);
        navigation.navigate('AssignMedicationConfirm', data);
    };

    // GET DATE
    var today = new Date();
    var date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: defaultBackground }}>
            <PageHeader label="Assign Medicine" goBack={navigation.goBack} showChevron='true'/>
            <Text style={{paddingTop: SPACING, paddingHorizontal: SPACING, color: 'white', fontSize: 20, fontFamily: 'Sora-SemiBold',}}>Quantity Left: <Text style={{color: color,}}> {medicineQuantity}</Text></Text>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1,}}>
                <ScrollView style={{paddingHorizontal: SPACING,}}>
                    <Text style={styles.label}>Animal ID</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            editable={false}
                        />
                        )}
                        name="animal"
                        rules={{ required: true }}
                        defaultValue={animalID}
                    />

                    <Text style={styles.label}>Medicine Name</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            editable={false}
                        />
                        )}
                        name="medication"
                        rules={{ required: true }}
                        defaultValue={medicineName}
                    />

                    <Text style={styles.label}>Withdrawal For Meat</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            editable={false}
                        />
                        )}
                        name="withdrawalMeat"
                        rules={{ required: true }}
                        defaultValue={withdrawalMeat}
                    />

                    <Text style={styles.label}>Withdrawal For Milk</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            editable={false}
                        />
                        )}
                        name="withdrawalMilk"
                        rules={{ required: true }}
                        defaultValue={withdrawalMilk}
                    />          

                    <Text style={styles.label}>Quantity<Text style={{color: '#D74747', fontSize: 13,}}> Required</Text></Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            autoFocus={true}
                            onChangeText={value => onChange(value)}
                            keyboardType={'decimal-pad'}
                        />
                        )}
                        name="quantity_administered"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Administered By<Text style={{color: '#D74747', fontSize: 13,}}> Required</Text></Text>
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
                        name="administered_by"
                        rules={{ required: true }}
                        defaultValue={null}
                    />          

                    <Text style={styles.label}>Note</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            onChangeText={value => onChange(value)}
                        />
                        )}
                        name="reason_for_administration"
                        rules={{ required: true }}
                        defaultValue={null}
                    />

                    <Text style={styles.label}>Date of Administration</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            editable={false}
                        />
                        )}
                        name="date_of_administration"
                        rules={{ required: true }}
                        defaultValue={date}
                    />  

                    <Button
                        contentStyle={{height: 50, width: 25}} 
                        mode="contained" 
                        color='#F4F3BE' 
                        style={{marginTop: 30, borderRadius: 10}} 
                        contentStyle={{height: 50}} 
                        labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                        onPress={handleSubmit(onSubmit)}
                        // onPress={() => console.log('test')}
                        >
                        Done
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}