import './upload_photo_modal.less';

import * as UI    from '../ui';
import Button     from '../components/button';
import Column     from '../components/column';
import React      from 'react';
import SheetModal from '../components/sheet_modal';

import { Camera } from 'react-feather';
import { Folder } from 'react-feather';


export default function UploadPhotoModal({ isOpen, closeModal, onFile }) {
  const { camera } = window.navigator;

  async function getImage(options) {
    try {
      const uri = await new Promise(function(resolve, reject) {
        camera.getPicture(resolve, reject, options);
      });

      const fileEntry = await new Promise(function(resolve, reject) {
        window.resolveLocalFileSystemURL(uri, resolve, reject);
      });

      closeModal();
      onFile(fileEntry);
    } catch (error) {
      const androidCancelled = (error === 'No Image Selected');
      const iOSCancelled     = (error === 'has no access to assets');
      const cancelled        = (iOSCancelled || androidCancelled);

      if (!cancelled)
        UI.toast('An error occurred. Please check that the app has permission to access the photo gallery.');
    }
  }

  function onClickPhotoLibrary() {
    const sourceType = camera.PictureSourceType.PHOTOLIBRARY;
    getImage({ sourceType });
  }

  function onClickTakePhoto() {
    const sourceType = camera.PictureSourceType.CAMERA;
    getImage({ sourceType });
  }

  return (
    <SheetModal className="upload-photo-modal" isOpen={isOpen} onEscape={closeModal} title="Upload a photo" onClickOverlay={closeModal}>
      <Column>
        <Button wide large secondary label="Choose from library" iconLeft={<Folder/>} onClick={onClickPhotoLibrary}/>
        <Button wide large secondary label="Take photo" iconLeft={<Camera/>} onClick={onClickTakePhoto}/>
        <Button wide large secondary danger label="Cancel" onClick={closeModal}/>
      </Column>
    </SheetModal>
  );
}
