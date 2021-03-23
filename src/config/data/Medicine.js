import faker from 'faker';

const MedicineData = [
    {
        medicineName: 'Penstrep',
        medicineType: 'Liquid',
        medicineLevel: 'Low Quantity',
        medicineQuantity: '2/10 ml',
        medicinePurchaseDate: '23 October 2020',
        medicinePurchaseAt: 'Glanbia',
        medicineExpiry: '2 April 2021',
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
        medicineExpiry: '13 August 2021',
        medicineBatchNo: '11233',
        medicineWithdrawal: 'Active',
        medicineMeat: '12 Days',
        medicineMilk: '10 Days'
    },
    {
        medicineName: 'Milbotyl',
        medicineType: 'Liquid',
        medicineLevel: 'Medium Quantity',
        medicineQuantity: '9/20 ml',
        medicinePurchaseDate: '11 August 2020',
        medicinePurchaseAt: 'Glanbia',
        medicineExpiry: '11 February 2021',
        medicineBatchNo: '11233',
        medicineWithdrawal: 'Active',
        medicineMeat: '21 Days',
        medicineMilk: '15 Days'
    },
    {
        medicineName: 'Levacide',
        medicineType: 'Liquid',
        medicineLevel: 'High Quantity',
        medicineQuantity: '16/20 ml',
        medicinePurchaseDate: '22 December 2020',
        medicinePurchaseAt: 'Glanbia',
        medicineExpiry: '11 December 2021',
        medicineBatchNo: '11233',
        medicineWithdrawal: 'Active',
        medicineMeat: '13 Days',
        medicineMilk: '17 Days'
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