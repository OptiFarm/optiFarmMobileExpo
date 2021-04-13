import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";
import faker from 'faker';

// COMPONENT
import { Text, View, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// THEME
import { SPACING, defaultBackground, cardBackground, topOS } from '../../config/theme';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../../config/graphql/queries';
import { ScrollView } from 'react-native';
 
const styles = StyleSheet.create({
    header_inner: {
        flex:1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginTop: topOS
    },
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

    // USER INFO
    const { data, loading } = useQuery(GET_USER_INFO);

    if (loading) {
        return <PageLoader />
    }

    const item = data.farmer.farmer;

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING, marginBottom: SPACING}}> 
                <View style={styles.header_inner}>
                    <PageHeader label="Personal Data" goBack={navigation.goBack} showChevron='true' />
                </View>              
            </View>   
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <View style={{backgroundColor: cardBackground, borderRadius: 15, alignSelf: 'center', top: -10}}>
                <Image
                    source={{ uri: 'https://i.ibb.co/XLMTmxc/53ccd086b469f546e7debba892ac46a5.jpg' }}
                    style={{width: 80, height: 80, borderRadius: 15,}}
                />
            </View>
            <ScrollView style={{padding: SPACING}}>
                <View style={{backgroundColor: defaultBackground, flex: 1, paddingBottom: 50}}>
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
                                    defaultValue={item.first_name} 
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
                                    defaultValue={item.second_name}
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
                            defaultValue={item.herd_number}
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
                            defaultValue={item.farm_type}
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
                            defaultValue={item.farm_address}
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
                                secureTextEntry
                            />
                            )}
                            name="password"
                            rules={{ required: true }}
                            defaultValue='password'
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
                </View>
            </ScrollView>
        </View>
        </>
    )
}