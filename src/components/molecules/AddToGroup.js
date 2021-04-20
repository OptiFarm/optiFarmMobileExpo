import React, { useState } from "react";

// COMPONENTS
import { View, } from 'react-native';
import { Button } from 'react-native-paper';

// THEME
import { SPACING, cardBackground } from '../../config/theme';

// QUERY
import { useMutation } from "@apollo/client";
import { ADD_ANIMAL_TO_GROUP } from '../../config/graphql/mutation';

export default function AddToGroup ({groups_id, _id}) {

    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const [addToGroup, { data }] = useMutation(ADD_ANIMAL_TO_GROUP, {
        onCompleted(data) {
            console.log(data)
            setLoading(true)
            if (data.addAnimalToGroup.responseCheck.success) {
                setLoading(false);
                setDisableButton(true);
            } else {
                setLoading(false);
                setDisableButton(false);
            }
        }
    });

    const onSubmit = () => {
        addToGroup({
            variables: {
                _id: _id,
                groups_id: groups_id,
            }
        })
        setLoading(true);
    }

    return (
        <Button
            onPress={onSubmit}
            mode="contained" 
            color='#E4E5E9' 
            style={{position: "absolute", right: SPACING, borderRadius: 10,}} 
            uppercase={false}
            labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15, color: cardBackground}}
            loading={loading}
            compact={true}
            disabled={disableButton}
        >
            Add
        </Button>
    )
}