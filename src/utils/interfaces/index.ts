interface SignInInputs {
  email: string;
  password: string;
}

interface SignUpInputs extends SignInInputs {
  name: string;
  repeatPassword: string;
}

interface ErrorObject {
  message: string;
  id: number;
}

interface IErrors {
  name: boolean;
  email: boolean;
  password: ErrorObject[] | [];
  common: string | null;
}

export { type SignInInputs, type SignUpInputs, type IErrors };
