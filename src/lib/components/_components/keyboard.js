import useEventListener from '../hooks/use_event_listener';


export default function Keyboard() {
  useEventListener('deviceready', showAccessoryBar, document);
  useEventListener('keyboardWillShow', onKeyboardWillShow);
  useEventListener('keyboardWillHide', onKeyboardWillHide);

  return null;
}


export function showAccessoryBar() {
  window.Keyboard?.hideFormAccessoryBar?.(false);
}

export function hideAccessoryBar() {
  window.Keyboard?.hideFormAccessoryBar?.(true);
}

function onKeyboardWillShow() {
  document.documentElement.classList.add('keyboard-open');
}

function onKeyboardWillHide() {
  document.documentElement.classList.remove('keyboard-open');
}
