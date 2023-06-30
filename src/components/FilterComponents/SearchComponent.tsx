import './filter.css';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { updateQueryFilter } from '@common/store';

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

  return (
    <div className="filter-container">
      <span className="filter-icon">{children}</span>
      <input
        type="text"
        placeholder={inputPlaceholder}
        className="input input-bordered input-warning w-full max-w-[200px]"
        onChange={handleInputChange}
      />
    </div>
  );
}
