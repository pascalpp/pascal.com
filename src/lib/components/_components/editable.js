import './editable_textarea.less';

import Button              from './button';
import Column              from '../components/column';
import React               from 'react';
import useAutosizeTextarea from '../hooks/use_autosize_textarea';
import useBoolean          from '../hooks/use_boolean';
import useInput            from '../hooks/use_input';


const EditableContext = React.createContext({});

export default function Editable({ children, editing = false }) {
  const [ isEditing, startEditing, stopEditing ] = useBoolean(editing);

  const context = React.useMemo(
    () => ({ isEditing, startEditing, stopEditing }),
    [ isEditing, startEditing, stopEditing ],
  );

  return (
    <EditableContext.Provider value={context}>
      {children}
    </EditableContext.Provider>
  );
}


function Editing({ children }) {
  const { isEditing } = Editable.useContext();

  if (isEditing)
    return children || null;
  else
    return null;
}


function Viewing({ children }) {
  const { isEditing } = Editable.useContext();

  if (isEditing)
    return null;
  else
    return children || null;
}


function useEditableContext() {
  return React.useContext(EditableContext);
}


function EditButton({ onClick, ...buttonProps }) {
  const { startEditing } = useEditableContext();

  async function onClickEdit(event) {
    event.persist();
    await onClick?.(event);
    if (!event.isDefaultPrevented())
      startEditing();
  }

  return <Button onClick={onClickEdit} label="Edit" {...buttonProps}/>;
}


function CancelButton({ onClick, ...buttonProps }) {
  const { stopEditing } = useEditableContext();

  async function onClickCancel(event) {
    event.persist();
    await onClick?.(event);
    if (!event.isDefaultPrevented())
      stopEditing();
  }

  return <Button onClick={onClickCancel} label="Cancel" {...buttonProps}/>;
}


function SaveButton({ onClick, ...buttonProps }) {
  const { stopEditing } = useEditableContext();

  async function onClickSave(event) {
    event.persist();
    await onClick?.(event);
    if (!event.isDefaultPrevented())
      stopEditing();
  }

  return <Button onClick={onClickSave} label="Save" {...buttonProps}/>;
}


function Textarea({ currentValue, defaultValue, placeholder, save }) {
  return (
    <Editable>
      <Editable.Viewing>
        <ViewTextarea {...{ currentValue, defaultValue }}/>
      </Editable.Viewing>
      <Editable.Editing>
        <EditTextarea {...{ currentValue, defaultValue, placeholder, save }}/>
      </Editable.Editing>
    </Editable>
  );
}

function ViewTextarea({ currentValue, defaultValue }) {
  const value = currentValue || defaultValue;
  const ref   = useAutosizeTextarea({ value });

  return (
    <Column className="editable-textarea">
      <textarea ref={ref} value={value} rows={1} readOnly/>
      <Button.Row right>
        <Editable.EditButton tiny secondary/>
      </Button.Row>
    </Column>
  );
}

function EditTextarea({ currentValue, defaultValue, placeholder, save }) {
  const [ value, onChange ] = useInput(currentValue || defaultValue);
  const ref                 = useAutosizeTextarea({ value });

  async function onClickUseDefault() {
    await save(null);
  }

  async function onClickSave() {
    await save(value);
  }

  return (
    <Column className="editable-textarea">
      <textarea
        ref={ref}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        rows={1}
        autoFocus
      />
      <Button.Row spread={!!defaultValue} right={!defaultValue}>
        {defaultValue && (
          <Editable.SaveButton tiny secondary label="Use default" onClick={onClickUseDefault}/>
        )}
        <Button.Row>
          <Editable.CancelButton tiny secondary/>
          <Editable.SaveButton tiny primary onClick={onClickSave}/>
        </Button.Row>
      </Button.Row>
    </Column>
  );
}


Editable.Editing      = Editing;
Editable.Viewing      = Viewing;
Editable.useContext   = useEditableContext;
Editable.EditButton   = EditButton;
Editable.CancelButton = CancelButton;
Editable.SaveButton   = SaveButton;
Editable.Textarea     = Textarea;
Editable.ViewTextarea = ViewTextarea;
Editable.EditTextarea = EditTextarea;
