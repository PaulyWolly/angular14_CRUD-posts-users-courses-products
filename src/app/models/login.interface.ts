export interface LoginInterface {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  date: string;
  email: string;
  active: boolean;
  role: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  },
  phone: string;

}
