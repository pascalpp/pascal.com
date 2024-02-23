import './table.less';

import Button        from '../components/button';
import Card          from '../components/card';
import classnames    from 'classnames';
import React         from 'react';
import SortableArrow from '../assets/icons/sortable_arrow.svg';


const TableContext = React.createContext({});

export default function Table({
  className,
  rows,
  HeaderRow,
  BodyRow,
  sortBy,
  setSortBy,
  ascending,
  setAscending,
  sorter,
  children,
}) {
  const context = React.useMemo(
    () => ({ sortBy, setSortBy, ascending, setAscending }),
    [ sortBy, setSortBy, ascending, setAscending ],
  );

  const sortedRows = useSortedRows({ rows, sortBy, ascending, sorter });

  const classNames = classnames('table', className);

  return (
    <TableContext.Provider value={context}>
      <table className={classNames}>
        {HeaderRow && (
          <thead><HeaderRow/></thead>
        )}
        {BodyRow && (
          <tbody>
            {sortedRows.map((row, index) => <BodyRow key={row.id || index} {...{ row, index, rows: sortedRows }}/>)}
          </tbody>
        )}
        {children}
      </table>
    </TableContext.Provider>
  );
}


function HeaderCell({
  children,
  className,
  name,
  names = [ name ],
  left,
  right,
  center,
}) {
  const { sortBy, setSortBy, ascending, setAscending } = React.useContext(TableContext);

  const active     = names.includes(sortBy);
  const secondary  = active && sortBy !== names[0];
  const descending = !ascending;
  const classNames = classnames(className, {
    active,
    secondary,
    ascending,
    descending,
    left,
    right,
    center,
  });

  function onClick(event) {
    // allow option/alt-click to sort by a secondary sort key
    if (active && event.altKey && names.length > 1)
      setSortBy(names.find(item => item !== sortBy));
    else if (active)
      setAscending(!ascending);
    else
      setSortBy(names[0]);
  }

  return (
    <th className={classNames}>
      <Button className="header-fill" onClick={onClick} renderNestedContent={false}>
        <div className="header-label">{children}</div>
        <div className="header-arrow"><SortableArrow/></div>
      </Button>
    </th>
  );
}


function TableRow({ children }) {
  return (
    <tr>
      {children}
    </tr>
  );
}


function TableCell({
  children,
  className,
  name,
  names = [ name ],
  left,
  right,
  center,
  colSpan,
  rowSpan,
}) {
  const { sortBy } = React.useContext(TableContext);
  const active     = names.includes(sortBy);
  const classNames = classnames(className, {
    active,
    left,
    right,
    center,
  });

  return (
    <td className={classNames} {...{ colSpan, rowSpan }}>
      {children}
    </td>
  );
}


function TableCard({ className, children, ...restCardProps }) {
  const classNames = classnames('table-card', className);

  const ref                   = React.useRef(null);
  const [ sticky, setSticky ] = React.useState(false);

  React.useEffect(() => {
    const observer = setStickyOnScroll(ref.current, setSticky);
    return () => observer?.disconnect();
  }, []);

  return (
    <div>
      <div className="table-top" ref={ref}/>
      <Card className={classNames} {...restCardProps} data-sticky={sticky}>
        {children}
      </Card>
    </div>
  );
}


function setStickyOnScroll(element, setSticky) {
  if (!element || !window.IntersectionObserver)
    return undefined;

  const observer = new window.IntersectionObserver(entries => {
    const sticky = entries[0].isIntersecting ? null : true;
    setSticky(sticky);
  }, { threshold: 1, rootMargin: '-50px' });

  observer.observe(element);
  return observer;
}


export function useSortedRows({ rows, sortBy, ascending, sorter = alphaNumericComparison }) {
  return React.useMemo(() => {
    // use slice to copy the rows so we don't mutate the original
    return rows?.slice().sort((rowA, rowB) => {
      const valueA = rowA[sortBy];
      const valueB = rowB[sortBy];
      return sorter(valueA, valueB, ascending);
    });
  }, [ rows, sortBy, ascending, sorter ]);
}

function alphaNumericComparison(rowA, rowB, ascending) {
  const [ lower, equal, higher ] = [ -1, 0, 1 ];

  if (isUndefined(rowA) && !isUndefined(rowB))
    return ascending ? lower : higher;

  if (!isUndefined(rowA) && isUndefined(rowB))
    return ascending ? higher : lower;

  if (isUndefined(rowA) && isUndefined(rowB))
    return equal;

  if (isNaN(rowA) || isNaN(rowB)) {
    if (ascending)
      return rowA.localeCompare(rowB);
    else
      return rowB.localeCompare(rowA);
  }

  if (ascending)
    return rowA - rowB;
  else
    return rowB - rowA;
}

function isUndefined(value) {
  return typeof value === 'undefined' || value === null;
}

Table.Row        = TableRow;
Table.HeaderCell = HeaderCell;
Table.Cell       = TableCell;
Table.Card       = TableCard;
