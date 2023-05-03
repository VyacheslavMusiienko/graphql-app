import { NavLink } from 'react-router-dom';
import { Paths } from '../../../utils/enums';
// import styles from './NavigationLink.module.scss';

interface Props {
  path: Paths;
  text: string;
}

const Link = ({ path, text }: Props) => <NavLink to={path}>{text}</NavLink>;

export default Link;
