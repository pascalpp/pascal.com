import './upload_file.less';

import { UnsupportedFileError } from './drop_zone';
import Button                   from './button';
import Column                   from './column';
import DropZone                 from './drop_zone';
import parse                    from './file_upload/parse_file';
import React                    from 'react';
import rollbar                  from '../rollbar';
import UploadCloud              from '../assets/icons/upload-cloud.svg';


const allowedExtensions = [ 'csv', 'txt', 'xls', 'xlsx', 'tsv' ];

export default function UploadFile({ onSuccess, onError }) {
  function onFile(file) {
    if (file) {
      const reader = new window.FileReader();
      const type   = getType({ file, reader });

      reader.onloadend = function({ target }) {
        const data = target.result;
        try {
          const { headers, records  } = parse({ data, type });
          const fileName              = file.name;
          onSuccess({ headers, records, fileName });
        } catch (error) {
          error.file = file;
          rollbar.error(error);
          onError(new UnsupportedFileError(file));
        }
      };

      if (type === 'binary')
        reader.readAsBinaryString(file);
      else if (type === 'array')
        reader.readAsArrayBuffer(file);
      else
        reader.readAsText(file);
    }
  }

  return (
    <form>
      <DropZone className="upload-file" onFile={onFile} onError={onError} allowedExtensions={allowedExtensions}>
        <Column center className="upload-file-content">
          <UploadCloud className="upload-cloud-icon"/>
          <p className="instructions">
            Drag and drop a file here<br/>or
          </p>
          <p>
            <Button Tag="span" small secondary className="upload-file-button" label="Choose a file"/>
          </p>
          <p className="instructions">
            Supported files: <span className="allowed-extensions">{allowedExtensions.join(', ')}</span>
          </p>
        </Column>
      </DropZone>
    </form>
  );
}


export function getType({ file, reader }) {
  const isText = file.type?.startsWith('text/');
  if (isText)
    return 'string';
  else if (reader.readAsBinaryString)
    return 'binary';
  else
    return 'array';
}
