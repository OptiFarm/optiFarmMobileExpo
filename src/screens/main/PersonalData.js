import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";

// COMPONENT
import { Text, View, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'

// THEME
import { SPACING, defaultBackground, cardBackground } from '../../config/theme';

// DATA
import { ProfileFormData } from '../../config/data/Profile';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    name: {
      fontSize: 18,
      fontFamily: 'Sora-SemiBold',
      color: 'white',
      paddingLeft: SPACING
    },
    subName: {
        fontSize: 15,
        fontFamily: 'Sora-SemiBold',
        color: 'white',
        opacity: 0.8,
        paddingLeft: SPACING,
        paddingTop: SPACING
    },
    itemImage: {
        width: 25,
        height: 25,
    },
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
        height: 60,
        padding: 10,
        borderRadius: 10,
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

export default function PersonalData ({navigation}) {

    const { register, setValue, handleSubmit, control, reset, errors } = useForm();

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>
            <PageHeader label="Personal Data" goBack={navigation.goBack} showChevron='true'/>
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <View style={{width: 80, height: 80, backgroundColor: cardBackground, borderRadius: 15, alignSelf: 'center'}}>
                <Image
                    source={{ uri: 'https://i.ibb.co/LYbhhT1/index-png-1.png' }}
                    style={{width: 80, height: 80, borderRadius: 15,}}
                />
            </View>
            <View style={{backgroundColor: defaultBackground, flex: 1, paddingBottom: 50}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={ProfileFormData}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ padding: SPACING, }}
                    renderItem={({ item }) => {
                        return (
                            <>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.label}>First Name</Text>
                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                        <TextInput
                                            style={[styles.input, {width: 170}]}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                        )}
                                        name="firstName"
                                        rules={{ required: true }}
                                        defaultValue={item.firstName}
                                    />
                                </View>

                                <View style={{position: 'absolute', right: 0}}>
                                    <Text style={styles.label}>Last Name</Text>
                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                        <TextInput
                                            style={[styles.input, {width: 170}]}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                        )}
                                        name="lastName"
                                        rules={{ required: true }}
                                        defaultValue={item.lastName}
                                    />
                                </View>
                            </View>

                            <Text style={styles.label}>Herd Number</Text>
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
                                name="herdNumber"
                                rules={{ required: true }}
                                defaultValue={item.herdNumber}
                            />

                            <Text style={styles.label}>Farm Type</Text>
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
                                name="farmType"
                                rules={{ required: true }}
                                defaultValue={item.farmType}
                            />


                            <Text style={styles.label}>Address</Text>
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
                                name="farmAddress"
                                rules={{ required: true }}
                                defaultValue={item.farmAddress}
                            />

                            <Text style={styles.label}>Email Address</Text>
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
                                name="email"
                                rules={{ required: true }}
                                defaultValue={item.email}
                            />

                            <Text style={styles.label}>Password</Text>
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
                                name="password"
                                rules={{ required: true }}
                                defaultValue={item.password}
                            />

                            <Button
                                contentStyle={{height: 50, width: 25, }} 
                                mode="contained" 
                                color='#F4F3BE' 
                                style={{marginTop: 30, borderRadius: 10}} 
                                contentStyle={{height: 50}} 
                                labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                            >
                                Edit
                            </Button>
                            </>
                        );
                    }}
                />
            </View>
        </View>
        </>
    )
}