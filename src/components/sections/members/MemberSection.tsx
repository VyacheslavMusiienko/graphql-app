import Member from './Member';

import styles from './member.module.scss';

import Ivan from '../../../assets/img/ivan.jpg';
import Dzmitry from '../../../assets/img/dzmitry.jpg';
import Vyacheslav from '../../../assets/img/vyacheslav.jpg';

const members = [
  {
    id: 1,
    name: 'vyacheslav_name',
    role: 'vyacheslav_role',
    description: 'vyacheslav_description',
    photo_src: Vyacheslav,
  },
  {
    id: 2,
    name: 'ivan_name',
    role: 'ivan_role',
    description: 'ivan_description',
    photo_src: Ivan,
  },
  {
    id: 3,
    name: 'dzmitry_name',
    role: 'dzmitry_role',
    description: 'dzmitry_description',
    photo_src: Dzmitry,
  },
];

const MemberSection = () => {
  return (
    <section className={styles.team_wrapper}>
      <div className={styles.container}>
        <ul className={styles.team}>
          {members.map(({ id, name, description, photo_src, role }) => {
            return (
              <Member
                key={id}
                name={name}
                role={role}
                description={description}
                photo_src={photo_src}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default MemberSection;
