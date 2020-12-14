import faker from 'faker';

const MedicineData = [
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
    {
        medicineName: 'Test test',
        medicineType: 'Pills',
        medicineLevel: 'Medium Quantity',
        medicineQuantity: '10/20 ml',
        medicinePurchaseDate: '19 October 2020'
    },
    {
        medicineName: 'Test test 2',
        medicineType: 'Pills',
        medicineLevel: 'Medium Quantity',
        medicineQuantity: '10/20 ml',
        medicinePurchaseDate: '19 October 2020'
    },
    {
        medicineName: 'Test test 3',
        medicineType: 'Pills',
        medicineLevel: 'Medium Quantity',
        medicineQuantity: '10/20 ml',
        medicinePurchaseDate: '19 October 2020'
    },
];

export const homepageMedicineData = MedicineData.slice(0, 3).map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}))


export default MedicineData.map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}));