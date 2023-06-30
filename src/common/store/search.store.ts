import { atom } from 'nanostores';

export const $isSearchOpen = atom(false);
export const $queryFilter = atom('');

export const updateSearchShow = () => {
  $isSearchOpen.set(!$isSearchOpen.get());
};

export const updateQueryFilter = (query: string) => {
  $queryFilter.set(query);
};
