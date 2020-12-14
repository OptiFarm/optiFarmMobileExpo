import faker from 'faker';

const CardData = [
  {
    type: 'Herd Book',
    desc: 'Your collection of animals',
    image: 'https://i.ibb.co/dppF9xh/books-1.png',
    navigate: 'Herd',
    color: '#E3F8FB'
  },
  {
    type: 'Remedies',
    desc: 'Your collection of medicated animals',
    image: 'https://i.ibb.co/mF94bCf/pills-6.png',
    navigate: 'HomePage',
    color: '#E2E7FF'
  },
];

export default CardData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
}));