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