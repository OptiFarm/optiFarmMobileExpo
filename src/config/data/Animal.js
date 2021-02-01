import faker from 'faker';

const AnimalData = [
  {
    animal_id: '40122',
    animal_tag: 'IE 4745 383',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '20 June 2020',
    animal_breed: 'HBX',
    animal_group: 'Dry Cows',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A'
  },
  {
    animal_id: '32123',
    animal_tag: 'IE 4745 383',
    animal_type: 'Cow',
    animal_sex: 'Female',
    animal_dob: '10 September 2020',
    animal_breed: 'SSS',
    animal_group: 'Dry Cows',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A'
  },
  {
    animal_id: '44442',
    animal_tag: 'IE 4745 383',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '20 July 2020',
    animal_breed: 'FDS',
    animal_group: 'Dry Cows',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A'
  },
  {
    animal_id: '42132',
    animal_tag: 'IE 4745 383',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '13 August 2020',
    animal_breed: 'FCH',
    animal_group: 'Dry Cows',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A'
  }
];

// Group Data
const GroupData = [
  {
    groupName: 'Dry Cows',
    groupAmount: '2',
    GroupDateCreated: '23 October 2020',
    GroupNote: 'This is for dry cows only'
  },
  {
    groupName: 'Calves',
    groupAmount: '3',
    GroupDateCreated: '22 October 2020',
    GroupNote: 'This is for calves only'
  },
]

export const groupData = GroupData.map((item, index) => ({
  ...item,
  key: faker.random.uuid()
}))

export default AnimalData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
  color: '#2A253F'
}));