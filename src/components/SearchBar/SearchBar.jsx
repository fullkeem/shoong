import { searchStore } from '@/store/store';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

/**
 * @param {{
 * name:string,
 * placeholder:string,
 * bgStyle:string}} props
 * @returns
 */
export default function SearchBar({ name, placeholder, bgStyle }) {
  const { search, setSearch, resetSearch } = searchStore();
  const location = useLocation();
  const inputRef = useRef();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    resetSearch();
    const unmount = () => {
      resetSearch();
    };
    return unmount;
  }, [resetSearch]);

  useEffect(() => {
    resetSearch();
  }, [location, resetSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [search]);

  return (
    <form
      className={`${bgStyle} inline-flex flex-row items-center justify-start gap-2 rounded-3xl  border border-primary px-4 py-2`}
      style={{ maxWidth: '1280px' }}
    >
      <label className="self-center" htmlFor={name}>
        <BsSearch className="h-6" />
      </label>
      <input
        type="search"
        id={name}
        ref={inputRef}
        placeholder={placeholder}
        className="self-center w-full bg-transparent outline-none"
        onChange={debounce(handleSearch, 500)}
        defaultValue={search}
      />
    </form>
  );
}
