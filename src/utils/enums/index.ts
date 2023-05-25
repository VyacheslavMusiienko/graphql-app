enum Paths {
  Welcome = '/',
  Main = '/main',
  SignIn = '/signin',
  SignUp = '/signup',
}

export enum FooterLinks {
  RsSchool = 'https://rs.school/react/',
  Luferov = 'https://github.com/Luferov1',
  Musiienko = 'https://github.com/vyacheslavmusiienko',
  Nikanau = 'https://github.com/sbavia',
}

export enum Languages {
  RU = 'ru',
  EN = 'en',
}

export enum SignInInputNames {
  Email = 'email',
  Password = 'password',
}

export enum SignUpInputNames {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  RepeatPassword = 'repeatPassword',
}

export enum ErrorTypes {
  Required = 'required',
  MinLength = 'minLength',
  Pattern = 'pattern',
  Validate = 'validate',
}

export default Paths;
