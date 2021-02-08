import faker from 'faker';

const AnimalFormData = [
    {
        a: 'Tag Number',
        b: 'Herd Number',
        c: 'Sire Number',
        d: 'Mother Number',
        e: 'Sex',
        f: 'Breed',
        g: 'Date of Birth',
        h: 'Group Number',
        i: 'Pure Breed',
        j: 'Description',
    }
];

export default AnimalFormData.map((item, index) => ({
    ...item,
    key: faker.random.uuid()
}));