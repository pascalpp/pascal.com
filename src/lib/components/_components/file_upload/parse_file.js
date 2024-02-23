import XLSX from 'xlsx';

export default function parse({ data, type }) {
  const raw                     = (type !== 'binary');
  const workbook                = XLSX.read(data, { type, raw });
  const sheetName               = workbook.SheetNames[0];
  const sheet                   = workbook.Sheets[sheetName];
  const rows                    = XLSX.utils.sheet_to_json(sheet, {
    header:    1,
    blankrows: false,
    defval:    '',
    raw,
  });
  const noEmptyColumns          = rows.map(removeEmptyColumns);
  const [ headers, ...records ] = noEmptyColumns;
  const noEmptyHeaders          = headers && Array.from(headers).map(replaceEmptyHeader);

  return {
    headers: noEmptyHeaders || [],
    records,
  };
}


function replaceEmptyHeader(header, index) {
  if (header)
    return header;
  else {
    const column = index + 1;
    return `Empty Header (col: ${column})`;
  }
}

function removeEmptyColumns(aRow, rowIndex, allRows) {
  // loop throgh the columns in the row, filtering out ones that are empty in
  // every row
  return aRow.filter((column, columnIndex) => {
    // include this column if any other rows have data in that column
    return allRows.some(row => row[columnIndex] !== '');
  });
}
