import React, { useRef } from 'react'
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import { StyleSheet, View, Text, FlatList, TextInput, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import { Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

// THEME
import { SPACING, height, defaultBackground, cardBackground, width } from '../../config/theme';

// DATA
import AnimalFormData from '../../config/form/Form';

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

export default function AnimalForm ({navigation}) {

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
        label: 'Select a gender',
        value: null,
    };

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    const ref_input7 = useRef();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <PageHeader  label="Add New Animal" goBack={navigation.goBack} showChevron='true'/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1,}}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={AnimalFormData}
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
                                    keyboardType='decimal-pad'
                                    returnKeyType='done' 
                                    placeholder='40122'
                                    placeholderTextColor='#848D95'
                                    onSubmitEditing={() => ref_input2.current.focus()}
                                    blurOnSubmit={false}
                                />
                                )}
                                name="tagNumber"
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
                                    keyboardType='decimal-pad'
                                    returnKeyType='done'
                                    placeholder='10234'
                                    placeholderTextColor='#848D95'
                                    ref={ref_input2}
                                    onSubmitEditing={() => ref_input3.current.focus()}
                                    blurOnSubmit={false}
                                />
                                )}
                                name="sireNumber"
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
                                    keyboardType='decimal-pad'
                                    returnKeyType='done' 
                                    placeholder='20455'
                                    placeholderTextColor='#848D95'
                                    ref={ref_input3}
                                />
                                )}
                                name="motherNumber"
                                rules={{ required: true }}
                                defaultValue={null}
                            />
                            
                            <Text style={styles.label}>{item.d}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <RNPickerSelect
                                        items={[
                                            { label: 'Male', value: 'male' },
                                            { label: 'Female', value: 'female' }
                                        ]}
                                        onValueChange={value => onChange(value)}
                                        style={styles.input}
                                        onBlur={onBlur}
                                        style={pickerSelectStyles}
                                        placeholder={placeholder}
                                    />
                                )}
                                name="sex"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.e}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    returnKeyType='next'
                                    placeholder='HBX'
                                    placeholderTextColor='#848D95'
                                    ref={ref_input4}
                                    onSubmitEditing={() => ref_input5.current.focus()}
                                />
                                )}
                                name="breed"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.f}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    returnKeyType='next'
                                    placeholder='23 January 2021'
                                    placeholderTextColor='#848D95'
                                    ref={ref_input5}
                                    onSubmitEditing={() => ref_input6.current.focus()}
                                />
                                )}
                                name="dateOfBirth"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.g}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    returnKeyType='next'
                                    placeholder='FDS'
                                    placeholderTextColor='#848D95'
                                    ref={ref_input6}
                                    onSubmitEditing={() => ref_input7.current.focus()}
                                />
                                )}
                                name="pureBreed"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Text style={styles.label}>{item.h}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    returnKeyType='done'
                                    ref={ref_input7}
                                />
                                )}
                                name="description"
                                rules={{ required: true }}
                                defaultValue={null}
                            />

                            <Button
                                contentStyle={{height: 50, width: 25, }} 
                                mode="contained" 
                                color='#F4F3BE' 
                                style={{marginTop: SPACING, borderRadius: 10}} 
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