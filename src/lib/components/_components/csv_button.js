import Button    from '../components/button';
import PropTypes from 'prop-types';
import React     from 'react';


// Button for CSV downloads
//
// rows: array of objects, with human-readable keys
// filename: string, filename for the CSV file
// buttonProps: any props to apply to the button: label, iconLeft, etc.

export default function CsvButton({ rows, filename, ...buttonProps }) {
  const csv = convertJsonRowsToCsv(rows);
  if (!csv)
    return null;

  const blob = new window.Blob([ csv ], { type: 'text/csv;charset=utf-8;' });
  const href = URL.createObjectURL(blob);

  return (
    <Button href={href} download={filename} external {...buttonProps}/>
  );
}

CsvButton.propTypes = {
  rows:     PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string.isRequired,
};


function convertJsonRowsToCsv(rows) {
  if (!rows?.length)
    return null;

  const headerRow = Object.keys(rows[0]).map(addQuotes).join(',');
  const dataRows  = rows.map(row => Object.values(row).map(addQuotes).join(','));
  const csv       = [ headerRow, ...dataRows ].join('\n');
  return csv;
}

function addQuotes(text) {
  if (isUndefined(text))
    return '""';
  else
    return `"${text}"`;
}

function isUndefined(value) {
  return typeof value === 'undefined' || value === null;
}
