import Member from './Member';

import styles from './member.module.scss';

import Ivan from '../../assets/ivan.jpg';
import Dzmitry from '../../assets/dzmitry.jpg';
import Vyacheslav from '../../assets/vyacheslav.jpg';

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
    <section className={styles.team}>
      {members.map(({ id, name, description, photo_src }) => {
        return (
          <div key={id}>
            <Member name={name} description={description} photo_src={photo_src} />
          </div>
        );
      })}
    </section>
  );
};

export default MemberSection;
