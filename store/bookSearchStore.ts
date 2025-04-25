import { create } from 'zustand';

interface BookSearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const useBookSearchStore = create<BookSearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useBookSearchStore;