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

const topMedicine = [
    {
        medicineName: 'Penstrep',
        medicineType: 'Liquid',
        medicineLevel: 'Low Quantity',
        medicineQuantity: '2/10 ml',
        medicinePurchaseDate: '23 October 2020'
    },
    {
        medicineName: 'Synulox Bolus',
        medicineType: 'Pills',
        medicineLevel: 'High Quantity',
        medicineQuantity: '17/20 ml',
        medicinePurchaseDate: '19 October 2020'
    },
    {
        medicineName: 'Synulox Bolus',
        medicineType: 'Pills',
        medicineLevel: 'Medium Quantity',
        medicineQuantity: '10/20 ml',
        medicinePurchaseDate: '19 October 2020'
    },
];

export default CardData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
}));

export const popularMedicine = topMedicine.map((item, index) => ({
    ...item,
    key: faker.random.uuid(),
}));
