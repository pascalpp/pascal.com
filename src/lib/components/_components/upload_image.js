import './upload_image.less';

import * as FileEntry           from '../util/file_entry';
import { UnsupportedFileError } from './drop_zone';
import Button                   from '../components/button';
import Column                   from '../components/column';
import DropZone                 from './drop_zone';
import React                    from 'react';
import Row                      from '../components/row';
import UploadPhotoModal         from '../components/upload_photo_modal';
import useBoolean               from '../hooks/use_boolean';

import { File }                 from 'react-feather';


const allowedExtensions = [ 'png', 'jpg', 'jpeg' ];

export default function UploadImage({ onSuccess, onError }) {
  const [ isOpen, openModal, closeModal ] = useBoolean(false);
  const [ currentFile, setCurrentFile ]   = React.useState(null);

  async function onFile(file) {
    if (file) {
      try {
        const mimeType      = await FileEntry.getMimeTypeFromFileEntry(file);
        const blob          = await FileEntry.getBlobFromFileEntry(file, mimeType);
        const { nativeURL } = file;
        onSuccess({ blob, mimeType, nativeURL });
        setCurrentFile(file);
      } catch (error) {
        onError(new UnsupportedFileError(file));
      }
    }
  }

  const isCordova = window.navigator.camera;
  function onClick() {
    if (isCordova)
      openModal();
  }

  return (
    <form>
      <DropZone className="upload-image" onClick={onClick} onFile={onFile} onError={onError} allowedExtensions={allowedExtensions}>
        <Column center className="upload-image-content">
          {isCordova && (
            <Button Tag="span" small secondary className="upload-image-button" label="Pick a photo"/>
          )}
          {!isCordova && (
            <>
              <p className="instructions">
                Drag and drop an image file here<br/>or
              </p>
              <p>
                <Button Tag="span" small secondary className="upload-image-button" label="Choose an image"/>
              </p>
              <p className="instructions">
                Supported files: <span className="allowed-extensions">{allowedExtensions.join(', ')}</span>
              </p>
              {currentFile && <FileInfo file={currentFile}/>}
            </>
          )}
        </Column>
      </DropZone>
      {isCordova && (
        <UploadPhotoModal {...{ isOpen, closeModal, onFile }}/>
      )}
    </form>
  );
}


function FileInfo({ file }) {
  const { name, size, type } = file;
  const friendlySize         = getFriendlySize(size);

  return (
    <Column center className="file-info">
      <Row className="file-icon-and-name">
        <File/>
        <span className="file-name">{name}</span>
      </Row>
      <span className="file-metadata">({type}, {friendlySize})</span>
    </Column>
  );
}

function getFriendlySize(bytes) {
  const e = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, e)).toFixed(1)} ${  ' kmgtp'.charAt(e)  }b`;
}
