import { TFunction } from 'i18next';

export function giveSignInInputOptions(t: TFunction) {
  return {
    email: {
      required: t('signUpError', { context: 'email' }),
      pattern: {
        value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
        message: t('signUpError', { context: 'email_pattern' }),
      },
    },
    password: {
      required: t('signUpError', { context: 'password' }),
    },
  };
}

export function giveSignUpInputOptions(t: TFunction) {
  return {
    name: {
      required: t('signUpError', { context: 'name' }),
      minLength: {
        value: 3,
        message: t('signUpError', { context: 'name_length' }),
      },
      pattern: {
        value: /^[A-Za-z ]*$/,
        message: t('signUpError', { context: 'name_pattern' }),
      },
    },
    email: {
      required: t('signUpError', { context: 'email' }),
      pattern: {
        value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
        message: t('signUpError', { context: 'email_pattern' }),
      },
    },
    password: {
      required: t('signUpError', { context: 'password' }),
      minLength: {
        value: 8,
        message: t('signUpError', { context: 'password_length' }),
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        message: t('signUpError', { context: 'password_pattern' }),
      },
    },
    repeatPassword: {
      required: t('signUpError', { context: 'repeatPassword' }),
    },
  };
}

export function translate(t: TFunction, key: string, context: string | undefined) {
  return t(key, context ? { context } : undefined);
}
