import faker from 'faker';

const MedicineFormData = [
    {
        a: 'Date of Purchase',
        b: 'Medicine Name',
        c: 'Supplied By',
        d: 'Withdrawal Active',
        e: 'Withdrawal For Milk',
        f: 'Withdrawal For Meat',
        g: 'Batch No',
        h: 'Expiry Date',
        i: 'Notes'
    }
];

export default MedicineFormData.map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}));