import faker from "faker";

// REGISTER DATA
const RegisterFormData = [
  {
    firstName: "First Name",
    surName: "Second Name",
    email: "Email",
    farmType: "Farm Type",
    herdNumber: "Herd Number",
    address: "Address",
    vet: "Veterinary Practice",
    password: "Password",
  },
];

export default RegisterFormData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
}));
