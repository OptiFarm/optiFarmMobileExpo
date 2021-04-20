import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    Alert,
} from "react-native";
import { PageHeader } from '../../components/atoms/PageHeader';
import { Button } from "react-native-paper";

// QUERY
import { useMutation } from '@apollo/client';
import { SAVE_GROUP } from '../../config/graphql/mutation';

// THEME
import { SPACING, height, defaultBackground, cardBackground, width, topOS } from '../../config/theme';

const styles = StyleSheet.create({
    header_inner: {
        flex: 1,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        marginTop: topOS,
    },
    label: {
        color: "white",
        marginTop: SPACING,
        marginBottom: 10,
        marginHorizontal: 20,
        marginLeft: 0,
        fontFamily: "Sora-SemiBold",
        fontSize: 18,
        opacity: 0.8,
    },
    input: {
        backgroundColor: cardBackground,
        height: 65,
        padding: 10,
        borderRadius: 15,
        fontFamily: "Sora-SemiBold",
        fontSize: 20,
        color: "white",
        marginBottom: 25,
    },
});

export default function GroupForm ({ navigation }) {

    // ADD GROUP QUERY
    const [addGroup, { data }] = useMutation(SAVE_GROUP, {
        onCompleted(data) {
            if(data.saveGroup.responseCheck.success) {
                navigation.navigate("GroupTab");
            } else {
                const message = data.saveGroup.responseCheck.message;
                Alert.alert("Unable to Add New Group", message);
            }
        }
    });

    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        errors,
    } = useForm();

    const onSubmit = (data) => {
        addGroup({
            variables: {
                group_name: data.groupName,
                group_description: String(data.groupDesc),
            },
        });
      };

    const onChange = (arg) => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    const ref_input2 = useRef();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <View
                style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: SPACING,
                marginBottom: SPACING,
                }}
            >
                <View style={styles.header_inner}>
                <PageHeader
                    label="Add Group"
                    goBack={navigation.goBack}
                    showChevron="true"
                />
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView style={{ padding: SPACING }}>
                    <>
                        <Text style={styles.label}>Group Name</Text>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    autoFocus={true}
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    onSubmitEditing={() => ref_input2.current.focus()}
                                    value={value}
                                    returnKeyType="next"
                                    placeholder="enter group name"
                                    placeholderTextColor="#848D95"
                                    blurOnSubmit={false}
                                />
                            )}
                            name="groupName"
                            rules={{ required: true }}
                            defaultValue={null}
                        />

                        <Text style={styles.label}>Description</Text>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    ref={ref_input2}
                                    value={value}
                                    returnKeyType="done"
                                    placeholder="enter group description"
                                    placeholderTextColor="#848D95"
                                />
                            )}
                            name="groupDesc"
                            rules={{ required: false }}
                            defaultValue={null}
                        />
                    </>
                </ScrollView>
                <Button
                    mode="contained"
                    color="#F4F3BE"
                    style={{ margin: SPACING, borderRadius: 10, width: width-25, }}
                    contentStyle={{ height: 50 }}
                    labelStyle={{
                        fontFamily: "Sora-Bold",
                        fontSize: 17,
                        color: cardBackground,
                    }}
                    onPress={handleSubmit(onSubmit)}
                >
                    create group
                </Button>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}