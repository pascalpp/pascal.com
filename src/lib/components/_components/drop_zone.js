import './drop_zone.less';

import Button     from '../components/button';
import classnames from 'classnames';
import React      from 'react';


export class UnsupportedFileError extends Error {
  constructor(file) {
    const message = 'We do not support this file type.';
    super(message);
    this.file = file;
  }
}


export default function DropZone({
  className,
  children,
  inputId = 'dropzone-input',
  onFile,
  onError,
  onClick,
  allowedExtensions,
}) {
  const ref    = React.useRef();
  const accept = allowedExtensions.map(extension => `.${extension}`).join(', ');

  const handleFile = React.useCallback(function handleFile(file) {
    const extension = file?.name?.split('.').pop().toLowerCase();
    const isAllowed = allowedExtensions.includes(extension);

    if (isAllowed)
      onFile(file);
    else
      onError(new UnsupportedFileError(file));
  }, [ onFile, onError, allowedExtensions ]);

  function onChange({ target }) {
    handleFile(target.files[0]);
  }

  React.useEffect(function() {
    const dropzone = ref.current;

    function onDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      handleFile(event.dataTransfer.files[0]);
    }

    function onDragOver(event) {
      event.preventDefault();
    }

    function toggleActive() {
      dropzone.classList.toggle('active');
    }

    dropzone.addEventListener('dragenter', toggleActive);
    dropzone.addEventListener('dragleave', toggleActive);
    dropzone.addEventListener('drop', onDrop);
    dropzone.addEventListener('dragover', onDragOver);

    return () => {
      dropzone.removeEventListener('dragenter', toggleActive);
      dropzone.removeEventListener('dragleave', toggleActive);
      dropzone.removeEventListener('drop', onDrop);
      dropzone.removeEventListener('dragover', onDragOver);
    };
  }, [ handleFile ]);

  const classNames = classnames('drop-zone', className);

  return (
    <Button Tag="label" className={classNames} ref={ref} htmlFor={inputId} onClick={onClick} renderNestedContent={false}>
      {children}
      <input id={inputId} type="file" accept={accept} onChange={onChange}/>
    </Button>
  );
}
