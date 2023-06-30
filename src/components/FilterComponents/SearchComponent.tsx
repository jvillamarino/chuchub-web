import { useStore } from '@nanostores/react';
import './filter-components.css';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { updateQueryFilter, updateSearchShow } from '@common/store';

export interface Props {
  children: React.ReactNode;
  inputPlaceholder: string;
}

export default function SearchButton({ children, inputPlaceholder }: Props) {
  const [query, setQuery] = useState('');
  const [, debounceSetQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      debounceSetQuery(query);
      updateQueryFilter(query);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query, 250]);

  function handleInputChange(event: BaseSyntheticEvent) {
    setQuery(event.target.value);
  }

  function handleSearchShow() {
    updateSearchShow();
  }

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder={inputPlaceholder}
        className="input input-bordered input-warning w-full max-w-[200px]"
        onChange={handleInputChange}
      />
      <button
        onClick={() => handleSearchShow()}
        className="btn btn-circle btn-md bg-orange-200 hover:bg-orange-400"
      >
        {children}
      </button>
    </div>
  );
}
