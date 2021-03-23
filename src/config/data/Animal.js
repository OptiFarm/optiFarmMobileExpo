import faker from 'faker';

// ANIMAL LIST
const AnimalData = [
  {
    animal_id: '40122',
    animal_tag: 'IE 4745 383',
    sire_number: '11111',
    mother_number: '222222',
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
    sire_number: '11111',
    mother_number: '222222',
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
    sire_number: '11111',
    mother_number: '222222',
    animal_type: 'Cow',
    animal_sex: 'Female',
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
    sire_number: '11111',
    mother_number: '222222',
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

export default AnimalData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
  color: '#2A253F'
}));

const animalCount = Object.keys(AnimalData).length;

// GROUP LIST
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
}));

// HOMEPAGE CARDS
const CardData = [
  {
    type: 'Herd Book',
    desc: 'Your collection of animals',
    image: 'https://i.ibb.co/3d9GTLc/book.png',
    navigate: 'HerdBook',
    color: '#1C2436',
    backgroundColor: '#FF929C',
    countLabel: 'Animal Count: ',
    count: animalCount
  },
  {
    type: 'Medicine Usage',
    desc: 'Your collection of medicated animals',
    image: 'https://i.ibb.co/7k5SnZs/charity.png',
    navigate: 'MedicineUsage',
    color: '#1C2436',
    backgroundColor: '#9968ED',
  },
];

export const cardData = CardData.map((item, index) => ({
  ...item,
  key: faker.random.uuid()
}));

const AssignMedicationData = [
  {
    animal_id: '40122',
    animal_tag: 'IE 4745 383',
    sire_number: '11111',
    mother_number: '222222',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '20 June 2020',
    animal_breed: 'HBX',
    animal_group: 'Dry Cows',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A',
    animal_lastMedicated: '17 March 2021'
  },
  {
    animal_id: '32123',
    animal_tag: 'IE 4745 383',
    sire_number: '11111',
    mother_number: '222222',
    animal_type: 'Cow',
    animal_sex: 'Female',
    animal_dob: '10 September 2020',
    animal_breed: 'SSS',
    animal_group: 'Calves',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A',
    animal_lastMedicated: '22 February 2021'
  },
  {
    animal_id: '44442',
    animal_tag: 'IE 4745 383',
    sire_number: '11111',
    mother_number: '222222',
    animal_type: 'Cow',
    animal_sex: 'Female',
    animal_dob: '20 July 2020',
    animal_breed: 'FDS',
    animal_group: 'Calves',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A',
    animal_lastMedicated: '11 January 2021'
  },
  {
    animal_id: '42132',
    animal_tag: 'IE 4745 383',
    sire_number: '11111',
    mother_number: '222222',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '13 August 2020',
    animal_breed: 'FCH',
    animal_group: 'Dry Cows',
    animal_vaccine: 'Adrestan',
    animal_doesing: 'N/A',
    animal_medication: 'N/A',
    animal_lastMedicated: '5 March 2021'
  }
];

export const assignMedicationData = AssignMedicationData.map((item, index) => ({
  ...item,
  key: faker.random.uuid()
}));