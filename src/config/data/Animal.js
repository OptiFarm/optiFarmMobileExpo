import faker from 'faker';

const AnimalData = [
  {
    animal_id: '40122',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '20 June 2020',
    animal_breed: 'HBX',
    animal_group: 'Dry Cows',
  },
  {
    animal_id: '32123',
    animal_type: 'Cow',
    animal_sex: 'Female',
    animal_dob: '10 September 2020',
    animal_breed: 'SSS',
    animal_group: 'Dry Cows',
  },
  {
    animal_id: '44442',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '20 July 2020',
    animal_breed: 'FDS',
    animal_group: 'Dry Cows',
  },
  {
    animal_id: '42132',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '13 August 2020',
    animal_breed: 'FCH',
    animal_group: 'Dry Cows',
  },
  {
    animal_id: '11142',
    animal_type: 'Cow',
    animal_sex: 'Female',
    animal_dob: '12 April 2020',
    animal_breed: 'ACS',
    animal_group: 'Dry Cows',
  },
  {
    animal_id: '13564',
    animal_type: 'Cow',
    animal_sex: 'Male',
    animal_dob: '21 December 2020',
    animal_breed: 'REW',
    animal_group: 'Dry Cows',
  }
];

export default AnimalData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
  color: '#2A253F'
}));