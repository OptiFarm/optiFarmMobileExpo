import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS IMPORTS
import MedicineDetail from '../screens/medicine/MedicineDetail'
import MedicineForm from '../screens/medicine/MedicineForm'
import AssignMedication from '../screens/medicine/AssignMedication'
import AssignMedicationConfirm from '../screens/medicine/AssignMedicationConfirm'

const MedicineHomeStack = createStackNavigator();
export default function MedicineStackComp() {
  return (
    <MedicineHomeStack.Navigator headerMode="none">
      <MedicineHomeStack.Screen name="MedicineDetail" component={MedicineDetail} />
      <MedicineHomeStack.Screen name="MedicineForm" component={MedicineForm} />
      <MedicineHomeStack.Screen name="AssignMedication" component={AssignMedication} />
      <MedicineHomeStack.Screen name="AssignMedicationConfirm" component={AssignMedicationConfirm} />
    </MedicineHomeStack.Navigator>
  );
};