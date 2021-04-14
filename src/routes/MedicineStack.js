import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// SCREENS IMPORTS
import MedicineDetail from "../screens/medicine/MedicineDetail";
import MedicineForm from "../screens/medicine/MedicineForm";
import AssignMedicationForm from "../screens/medicine/AssignMedicationForm";
import AssignMedicationConfirm from "../screens/medicine/AssignMedicationConfirm";
import EditMedicineForm from "../screens/medicine/EditMedicineForm";

const MedicineHomeStack = createStackNavigator();
export default function MedicineStackComp() {
  return (
    <MedicineHomeStack.Navigator headerMode="none">
      <MedicineHomeStack.Screen
        name="MedicineDetail"
        component={MedicineDetail}
      />
      <MedicineHomeStack.Screen name="MedicineForm" component={MedicineForm} />
      <MedicineHomeStack.Screen
        name="AssignMedicationForm"
        component={AssignMedicationForm}
      />
      <MedicineHomeStack.Screen
        name="AssignMedicationConfirm"
        component={AssignMedicationConfirm}
      />
      <MedicineHomeStack.Screen
        name="EditMedicineForm"
        component={EditMedicineForm}
      />
    </MedicineHomeStack.Navigator>
  );
}
