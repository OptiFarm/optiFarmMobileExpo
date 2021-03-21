import faker from 'faker';

const MedicineData = [
    {
        medicineName: 'Penstrep',
        medicineType: 'Liquid',
        medicineLevel: 'Low Quantity',
        medicineQuantity: '2/10 ml',
        medicinePurchaseDate: '23 October 2020',
        medicinePurchaseAt: 'Glanbia',
        medicineExpiry: '2 January 2021',
        medicineBatchNo: '11233',
        medicineWithdrawal: 'Active',
        medicineMeat: '12 Days',
        medicineMilk: '10 Days'
    },
    {
        medicineName: 'Synulox Bolus',
        medicineType: 'Pills',
        medicineLevel: 'High Quantity',
        medicineQuantity: '17/20 ml',
        medicinePurchaseDate: '19 October 2020',
        medicinePurchaseAt: 'Glanbia',
        medicineExpiry: '13 January 2021',
        medicineBatchNo: '11233',
        medicineWithdrawal: 'Active',
        medicineMeat: '12 Days',
        medicineMilk: '10 Days'
    },
    {
        medicineName: 'Synulox Bolus',
        medicineType: 'Pills',
        medicineLevel: 'Medium Quantity',
        medicineQuantity: '10/20 ml',
        medicinePurchaseDate: '19 October 2020',
        medicinePurchaseAt: 'Glanbia',
        medicineExpiry: '11 February 2021',
        medicineBatchNo: '11233',
        medicineWithdrawal: 'Active',
        medicineMeat: '12 Days',
        medicineMilk: '10 Days'
    },
    {
        medicineName: 'Test test',
        medicineType: 'Pills',
        medicineLevel: 'Medium Quantity',
        medicineQuantity: '10/20 ml',
        medicinePurchaseDate: '19 October 2020',
        medicinePurchaseAt: 'Glanbia',
        medicineExpiry: '5 March 2021',
        medicineBatchNo: '11233',
        medicineWithdrawal: 'Active',
        medicineMeat: '12 Days',
        medicineMilk: '10 Days'
    }
];

const MedicatedAnimalData = [
    {
        administered_by: "Conor",
        animal: "40122",
        medication: "Penstrep",
        quantity_administered: "2",
        reason_for_administration: "For test",
        withdrawalPeriod: 'Active',
        withdrawalMeat: "12 Days",
        withdrawalMilk: "10 Days",
    },
];

export default MedicineData.map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}));

export const homepageMedicineData = MedicineData.slice(0, 3).map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}))

export const medicatedAnimalData = MedicatedAnimalData.map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}));