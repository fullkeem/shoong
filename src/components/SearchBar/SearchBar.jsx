import { searchStore } from '@/store/store';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';

/**
 * @param {{
 * name:string,
 * placeholder:string,
 * bgStyle:string}} props
 * @returns
 */
export default function SearchBar({ name, placeholder, bgStyle }) {
  const { search, setSearch, resetSearch } = searchStore();
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

  return (
    <form
      className={`${bgStyle} flex w-1/3 flex-row items-center justify-start gap-2 rounded-3xl border border-primary bg-white px-4 py-2`}
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
        className="w-full self-center bg-transparent outline-none"
        onChange={debounce(handleSearch, 500)}
        defaultValue={search}
      />
    </form>
  );
}
