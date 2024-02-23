import './search_field.less';

import { hideAccessoryBar }     from './keyboard';
import { showAccessoryBar }     from './keyboard';
import React                    from 'react';

import { Search as SearchIcon } from 'react-feather';


export default function SearchField({ query, setQuery, placeholder = 'Search' }) {
  const onChange = React.useCallback(function onChange({ target }) {
    setQuery(target.value);
  }, [ setQuery ]);

  return (
    <div className="search-field">
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onInput={onChange}
        onChange={onChange}
        onTouchStart={hideAccessoryBar}
        onFocus={hideAccessoryBar}
        onBlur={showAccessoryBar}
      />
      <SearchIcon className="search-icon"/>
    </div>
  );
}
