import Fuse  from 'fuse.js';
import React from 'react';

import './filtered_list.less';

// default fuse options are optimized for the contacts page
const defaultFuseOptions = {
  shouldSort:         true,
  threshold:          0.3,
  location:           0,
  distance:           100,
  maxPatternLength:   72,
  minMatchCharLength: 1,
  ignoreLocation:     true,
  keys:               [
    {
      name:   'name.full',
      weight: 0.1,
    },
    {
      name:   'name.given',
      weight: 0.09,
    },
    {
      name:   'name.surname',
      weight: 0.08,
    },
    {
      name:   'contact.email.address',
      weight: 0.07,
    },
    {
      name:   'contact.phone.text',
      weight: 0.07,
    },
    {
      name:   'status',
      weight: 0.06,
    },
    {
      name:   'conversation.note.body',
      weight: 0.06,
    },
    {
      name:   'lastActivity.text',
      weight: 0.05,
    },
    {
      name:   'conversation.assignees.user.name',
      weight: 0.05,
    },
  ],
};

export default class FilteredList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fuse = null;
  }

  componentDidMount() {
    const options = this.props.fuseOptions || defaultFuseOptions;
    this.fuse     = new Fuse(this.props.collection, options);
  }

  render() {
    const { children: render } = this.props;
    const { collection }       = this.props;
    const { query }            = this.props;
    const { emptyView }        = this.props;

    if (!collection)
      return render([]);

    if (this.fuse && query && query.length > 0) {
      this.fuse.setCollection(collection);
      const filtered        = this.fuse.search(query).map(({ item }) => item);
      const noSearchResults = filtered?.length === 0;
      if (noSearchResults)
        return emptyView || <DefaultEmptyView/>;
      else
        return render(filtered);
    } else
      return render(collection);
  }
}


export function DefaultEmptyView() {
  return (
    <div className="no-search-results">
      <h3 className="title">Nothing found</h3>
    </div>
  );
}
