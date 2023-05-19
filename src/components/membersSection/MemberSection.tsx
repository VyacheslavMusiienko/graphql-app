import Member from './Member';

import styles from './member.module.scss';

import Ivan from '../../assets/img/ivan.jpg';
import Dzmitry from '../../assets/img/dzmitry.jpg';
import Vyacheslav from '../../assets/img/vyacheslav.jpg';

const members = [
  {
    id: 1,
    name: 'vyacheslav_name',
    description: 'ToDo description 1',
    photo_src: Vyacheslav,
  },
  {
    id: 2,
    name: 'ivan_name',
    description: 'ToDo description 2',
    photo_src: Ivan,
  },
  {
    id: 3,
    name: 'dzmitry_name',
    description: 'ToDo description 3',
    photo_src: Dzmitry,
  },
];

const MemberSection = () => {
  return (
    <section>
      <div className={styles.container}>
        <ul className={styles.team}>
          {members.map(({ id, name, description, photo_src }) => {
            return <Member key={id} name={name} description={description} photo_src={photo_src} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default MemberSection;
