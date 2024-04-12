import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import css from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newValue = e.target.value;
    dispatch(changeFilter({ name: newValue, number: newValue }));
  }

  return (
    <div className={css.wrapperSearchBar}>
      <p className={css.textSearchBar}>Find contacts by name or number</p>
      <input 
        type="text" 
        onChange={handleChange} 
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;