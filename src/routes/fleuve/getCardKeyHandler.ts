// wip

import type { PageId } from './pages.store';
import { focusNextElement, focusCardId, focusSelector } from './focusHelpers';
import {
  activatePage,
  removePage,
  reorderPage,
  movePageUp,
  movePageDown,
  addParentAbovePage,
  replaceEmptyParent,
  deactivatePage,
} from './pages.store';

export interface CardKeyHandlerOptions {
  pageId: PageId;
  active: boolean;
  parentId: PageId;
  previousSiblingId: PageId;
  nextSiblingId: PageId;
  firstChildId: PageId;
}

const tutorialId = 'tutorial-start-page';
const deleteConfirmation = 'Are you sure you want to remove this card and all of its connections?';
const deleteTutorialConfimation = 'You’re about to delete this tutorial. You can restore it in the settings menu.';

export default function getCardKeyHandler({
  pageId,
  active,
  parentId,
  previousSiblingId,
  nextSiblingId,
  firstChildId,
}: CardKeyHandlerOptions) {
  const editDesscription = `#edit-description-${pageId}`;
  const addSiblingConnection = `#add-connection-${parentId}`;
  const addChildConnection = `#add-connection-${pageId}`;

  return function onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (['d', 'e'].includes(event.key.toLowerCase())) {
      if (active) {
        const editButton = document.querySelector(editDesscription) as HTMLButtonElement;
        editButton?.click();
      }
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (event.shiftKey) {
        const newParent = movePageDown(pageId);
        if (active) {
          activatePage(newParent.id);
          activatePage(pageId);
        }
        requestAnimationFrame(() => {
          focusCardId(pageId);
        });
      } else if (event.altKey) {
        const newParent = addParentAbovePage(pageId);
        requestAnimationFrame(() => {
          activatePage(newParent.id);
          if (active) {
            activatePage(pageId);
          }
          requestAnimationFrame(() => {
            focusCardId(pageId);
          });
        });
      } else {
        focusCardId(firstChildId) || focusSelector(addChildConnection) || activatePage(pageId);
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (event.shiftKey) {
        reorderPage(pageId, 'up');
        requestAnimationFrame(() => {
          focusCardId(pageId);
        });
      } else {
        focusCardId(previousSiblingId);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (event.shiftKey) {
        reorderPage(pageId, 'down');
        requestAnimationFrame(() => {
          focusCardId(pageId);
        });
      } else {
        focusCardId(nextSiblingId) || focusSelector(addSiblingConnection);
      }
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (event.shiftKey) {
        movePageUp(pageId);
        requestAnimationFrame(() => {
          const el = focusCardId(pageId);
          if (active) el?.click();
        });
      } else if (event.altKey) {
        replaceEmptyParent(pageId);
        requestAnimationFrame(() => {
          const el = focusCardId(pageId);
          if (active) el?.click();
        });
      } else {
        focusCardId(parentId);
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (active) {
        deactivatePage(pageId);
      } else {
        target.click();
      }
    }

    // Space key
    if (event.key === ' ') {
      event.preventDefault();
      if (active) {
        deactivatePage(pageId);
      } else {
        target.click();
      }
    }

    if (event.key === 'Escape') {
      if (active) {
        event.preventDefault();
        deactivatePage(pageId);
      } else {
        focusCardId(parentId);
      }
    }

    if (['Backspace', 'Delete'].includes(event.key)) {
      event.preventDefault();
      const isTutorial = pageId === tutorialId;
      const message = isTutorial ? deleteTutorialConfimation : deleteConfirmation;
      const confirmed = confirm(message);
      if (confirmed) {
        removePage(pageId);
        focusCardId(nextSiblingId) || focusCardId(previousSiblingId) || focusNextElement();
      }
    }
  };
}
