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
    type: 'Settings',
    image: 'https://i.ibb.co/JqZJj9y/settings.png',
    backgroundColor: cardBackground,
    navigation: ''
  },
  {
    type: 'Refferal Code',
    image: 'https://i.ibb.co/gzC9fBP/heart-shape-rounded-edges-variant-with-white-details.png',
    backgroundColor: cardBackground,
    navigation: ''
  },
  {
    type: 'Our Handbook',
    image: 'https://i.ibb.co/9GTfzrc/story.png',
    backgroundColor: cardBackground,
    navigation: ''
  },
  {
    type: 'FAQs',
    image: 'https://i.ibb.co/8zdDgfv/chat.png',
    backgroundColor: cardBackground,
    navigation: ''
  },
];

// PROFILE DATA
const profileFormData = [
  {
    email: 'conorclarke@gmail.com',
    herdNumber: '13992',
    firstName: 'Conor',
    lastName: 'Clarke',
    password: '********',
    farmType: 'Dairy',
    farmAddress: '34 Oriel House'
  }
]

export default ProfileData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
}));

export const ProfileFormData = profileFormData.map((item, index) => ({
  ...item,
  key: faker.random.uuid()
}));