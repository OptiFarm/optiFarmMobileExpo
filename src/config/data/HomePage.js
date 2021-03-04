import faker from 'faker';

const CardData = [
  {
    type: 'Herd Book',
    desc: 'Your collection of animals',
    image: 'https://i.ibb.co/dppF9xh/books-1.png',
    navigate: 'Herd',
    color: '#1C2436',
    backgroundColor: '#E3F8FB'
  },
  {
    type: 'Medicine Usage',
    desc: 'Your collection of medicated animals',
    image: 'https://i.ibb.co/mF94bCf/pills-6.png',
    navigate: 'Remedies',
    color: '#1C2436',
    backgroundColor: '#E2E7FF'
  },
];

export default CardData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
}));