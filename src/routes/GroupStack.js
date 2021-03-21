import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// SCREEN IMPORTS
import GroupDetail from '../screens/group/GroupDetail';
import GroupForm from '../screens/group/GroupForm';

const GroupStack = createStackNavigator();
export default function GroupStackComp() {
    return (
        <GroupStack.Navigator headerMode="none">
            <GroupStack.Screen name="GroupDetail" component={GroupDetail} />
            <GroupStack.Screen name="GroupForm" component={GroupForm} />
        </GroupStack.Navigator>
    );
};