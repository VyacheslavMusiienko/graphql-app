import i18n from 'i18next';

export function translate(key: string, context?: string | undefined) {
  return i18n.t(key, context ? { context } : undefined);
}

export function giveSignInInputOptions() {
  return {
    email: {
      required: translate('signUpError', 'email'),
      pattern: {
        value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
        message: translate('signUpError', 'email_pattern'),
      },
    },
    password: {
      required: translate('signUpError', 'password'),
    },
  };
}

export function giveSignUpInputOptions() {
  return {
    name: {
      required: translate('signUpError', 'name'),
      minLength: {
        value: 3,
        message: translate('signUpError', 'name_length'),
      },
      pattern: {
        value: /^[A-Za-z ]*$/,
        message: translate('signUpError', 'name_pattern'),
      },
    },
    email: {
      required: translate('signUpError', 'email'),
      pattern: {
        value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
        message: translate('signUpError', 'email_pattern'),
      },
    },
    password: {
      required: translate('signUpError', 'password'),
      minLength: {
        value: 8,
        message: translate('signUpError', 'password_length'),
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        message: translate('signUpError', 'password_pattern'),
      },
    },
    repeatPassword: {
      required: translate('signUpError', 'repeatPassword'),
    },
  };
}
