import faker from "faker";

const UserData = [
  {
    id: 1,
    email: "user1@email.com",
    username: "conorc",
    password: "password",
    userToken: "token123",
  },
  {
    id: 2,
    email: "user2@email.com",
    username: "user2",
    password: "pass1234",
    userToken: "token12345",
  },
  {
    id: 3,
    email: "testuser@email.com",
    username: "testuser",
    password: "testpass",
    userToken: "testtoken",
  },
];

export default UserData.map((item, index) => ({
  ...item,
}));

// REGISTER DATA
const registerFormData = [
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

export const RegisterFormData = registerFormData.map((item, index) => ({
  ...item,
  key: faker.random.uuid(),
}));
