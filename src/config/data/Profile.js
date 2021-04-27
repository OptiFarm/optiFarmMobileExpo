import faker from 'faker';
import { cardBackground } from '../theme';

// ANIMAL LIST
const ProfileData = [
  {
    type: 'Personal Data',
    image: 'https://i.ibb.co/c8C4Dpc/user-3.png',
    backgroundColor: cardBackground,
    navigation: 'PersonalData'
  },
  {
    type: 'OptiFarm Pro',
    image: 'https://i.ibb.co/WnYLvbp/graph.png',
    backgroundColor: cardBackground,
    navigation: 'OptifarmPro'
  },
];

export default ProfileData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
}));

// PROFILE DATA
const profileFormData = [
  {
    email: 'derekwatson@gmail.com',
    herdNumber: '13992',
    firstName: 'Derek',
    lastName: 'Watson',
    password: '********',
    farmType: 'Dairy',
    farmAddress: '34 Oriel House'
  }
]

export const ProfileFormData = profileFormData.map((item, index) => ({
  ...item,
  key: faker.random.uuid()
}));