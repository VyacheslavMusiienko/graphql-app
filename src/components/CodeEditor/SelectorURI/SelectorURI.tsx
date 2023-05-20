import { useAppDispatch, useAppSelector } from '../../../store';
import { EditorSlice } from '../../../store/reducers/EditorSlice';
import styles from './SelectorURI.module.scss';

const SelectorURI = () => {
  const { schemaURI } = useAppSelector((state) => state.EditorReducer);
  const { setSchema } = EditorSlice.actions;
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setSchema(event.target.value));
  }

  return (
    <div className={styles.main}>
      <div>Select schema</div>
      <select className={styles.select} value={schemaURI} onChange={handleChange}>
        <option>https://rickandmortyapi.com/graphql</option>
        <option>https://countries.trevorblades.com/graphql</option>
      </select>
    </div>
  );
};

export default SelectorURI;
