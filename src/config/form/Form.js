import faker from 'faker';

const AnimalFormData = [
    {
        a: 'Tag Number',
        b: 'Sire Number',
        c: 'Mother Number',
        d: 'Sex',
        e: 'Breed',
        f: 'Date of Birth',
        g: 'Pure Breed',
        h: 'Description',
    }
];

export default AnimalFormData.map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}));

const medicineFormData = [
    {
        a: 'Medicine Name',
        b: 'Supplied By',
        c: 'Date of Purchase',
        d: 'Quantity',
        e: 'Quantity Type',
        f: 'Withdrawal For Milk',
        g: 'Withdrawal For Meat',
        h: 'Batch No',
        i: 'Expiry Date',
        j: 'Notes'
    }
]

export const MedicineFormData = medicineFormData.map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}));