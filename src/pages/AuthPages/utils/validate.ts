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

const validate = (email: string, password: string, displayName: string): true | IErrors => {
  const rEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const oneNumber = /\d/;
  const oneLetter = /[a-zA-Z]/;
  const oneSpecialCharacter = /[@$!%*#?&]/;

  const errorsObject = {
    name: displayName.trim().length < 2,
    email: !email.match(rEmail),
    password: [
      password.trim().length < 8 && {
        id: 1,
        message: 'should be at least 8 symbols',
      },
      !password.trim().match(oneNumber) && {
        id: 2,
        message: 'should have at least one number',
      },
      !password.trim().match(oneLetter) && {
        id: 3,
        message: 'should have at least one letter',
      },
      !password.trim().match(oneSpecialCharacter) && {
        id: 4,
        message: 'should have at least one special character - @$!%*#?&',
      },
    ].filter((el) => el),
  };

  const isErrorObjectEmpty = !(
    errorsObject.name ||
    errorsObject.email ||
    errorsObject.password.length > 0
  );

  if (!isErrorObjectEmpty) {
    return errorsObject as IErrors;
  }

  return isErrorObjectEmpty;
};

export { validate, type IErrors };
