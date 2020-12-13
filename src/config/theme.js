import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 12;
export const defaultBackground = '#2A253F'
export const cardBackground = '#3F3B51'

// Medicine Levels
export const medicineLevelLow = '#D74747'
export const medicineLevelMedium = '#FF9F47'
export const medicineLevelHigh = '#82F5A8'



interface medicineColorProps {
  quantity: String;
}

export const foodConfig = {
  colors: {
    orange: '#FB9B06',
  },
};