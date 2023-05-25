import i18n from 'i18next';

export function translate(key: string, context?: string | undefined) {
  if (context) {
    return i18n.t(key, { context });
  }
  return i18n.t(key);
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
        value: 2,
        message: translate('signUpError', 'name_length'),
      },
      pattern: {
        value: /^[a-zA-Zа-яА-Я]*$/,
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
        value: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        message: translate('signUpError', 'password_pattern'),
      },
    },
    repeatPassword: {
      required: translate('signUpError', 'repeatPassword'),
    },
  };
}
