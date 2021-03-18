import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import { StyleSheet, View, Text, TextInput, } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import { Button } from 'react-native-paper';

// THEME
import { SPACING, height, defaultBackground, cardBackground, width } from '../../config/theme';

// DATA
import { ScrollView } from 'react-native';

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

export default function AssignMedication ({ navigation, route }) {

    const {animalID, medicineName, withdrawalMeat, withdrawalMilk} = route.params;

    // REACT HOOK FORM FUNCTIONS
    const { register, setValue, handleSubmit, control, reset, errors } = useForm();
    const onSubmit = data => {
      console.log(data);
      navigation.navigate('FormSuccess');
    };
  
    const onChange = arg => {
      return {
        value: arg.nativeEvent.text,
      };
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: defaultBackground }}>
            <PageHeader label="Assign Medicine" goBack={navigation.goBack} showChevron='true'/>

            <ScrollView style={{padding: SPACING,}}>
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
                    name="animalID"
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
                    name="medicineName"
                    rules={{ required: true }}
                    defaultValue={medicineName}
                />

                <Text style={styles.label}>Amount<Text style={{color: '#D74747', fontSize: 13,}}> Required</Text></Text>
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
                    name="amount"
                    rules={{ required: true }}
                    defaultValue={null}
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

                <Button
                    contentStyle={{height: 50, width: 25}} 
                    mode="contained" 
                    color='#F4F3BE' 
                    style={{marginTop: 30, borderRadius: 10}} 
                    contentStyle={{height: 50}} 
                    labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                    onPress={handleSubmit(onSubmit)}
                >
                    Done
                </Button>
            </ScrollView>
        </SafeAreaView>
    )
}