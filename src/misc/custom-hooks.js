import { useReducer, useEffect } from 'react';

function showReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [prevState, action.showID];
    }
    case 'Remove': {
      return prevState.filter(showID => showID !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}
export function useShows(key = 'shows') {
  return usePersistedReducer(showReducer, [], key);
}
