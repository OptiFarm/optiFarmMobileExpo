import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const { width, height } = Dimensions.get('window');
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 12;
export const defaultBackground = '#161C29'
export const cardBackground = '#1C2436'

// Medicine Levels
export const medicineLevelLow = '#D74747'
export const medicineLevelMedium = '#FF9F47'
export const medicineLevelHigh = '#82F5A8'

export const topOS = Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() - 20;

export const CELL_HEIGHT = height * 0.18;

interface medicineColorProps {
  quantity: String;
}

export const foodConfig = {
  colors: {
    orange: '#FB9B06',
  },
};