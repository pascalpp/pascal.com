import './form.less';

import * as Phone          from 'libphonenumber-js';
import capitalize          from '../util/capitalize';
import Card                from '../components/card';
import classnames          from 'classnames';
import Column              from '../components/column';
import React               from 'react';
import SelectComponent     from './select';
import useAutosizeTextarea from '../hooks/use_autosize_textarea';


const FormContext = React.createContext();

export function useContext() {
  return React.useContext(FormContext);
}

/**
 * Form.Form
 *
 * - children: form elements to render inside the form
 * - record: an object representing the form's data. May be flat or
 *   hierarchical.
 * - save: called when the form is submitted. Will receive the current record.
 *   Will not be called if the fomr is invalid.
 * - readOnly: if true, the form will be read-only. Borders will not be shown,
 *   and fields will not be focusable.
 * - id: the form id, to be used when rendering a submit button outside the
 *   form.
 * - getErrorMessage: when an error is thrown during save, this function will be
 *   called with the error. Should return a string, or an array of strings, or
 *   an array of { field, message } objects, or null.
 * - className: the form's class name.
 */
export function Form({
  children,
  record,
  save,
  readOnly,
  id,
  getErrorMessage = getDefaultErrorMessage,
  ...props
}) {
  const ref                           = React.useRef();
  const [ submitting, setSubmitting ] = React.useState(false);
  const [ fields, setFields ]         = React.useState(recordToFields(record));
  const [ error, setError ]           = React.useState(null);
  const [ valid, setValid ]           = React.useState(false);

  const reset = React.useCallback(function reset() {
    setError(null);
    setFields(recordToFields(record));
  }, [ record ]);

  const reportValidity = React.useCallback(function reportValidity() {
    const form = ref.current;
    if (form)
      form.reportValidity();
  }, []);

  const onChange = React.useCallback(function onChange({ target }) {
    setError(prevErrors => {
      if (Array.isArray(prevErrors))
        return prevErrors.filter(err => err.field !== target.name);
      else
        return null;
    });
    const { name } = target;
    const { type } = target;
    const value    = (type === 'checkbox') ? target.checked : target.value;
    setFields(prev => ({ ...prev, [name]: value }));
  }, []);

  const context = React.useMemo(
    () => ({ fields, setFields, onChange, reset, submitting, readOnly, error, setError, valid, reportValidity }),
    [ fields, onChange, reset, submitting, readOnly, error, valid, reportValidity ],
  );

  async function onSubmit(event) {
    event.preventDefault();
    if (!submitting) {
      setSubmitting(true);
      try {
        await save?.(fieldsToRecord(fields));
      } catch (err) {
        if (ref.current) {
          setError(getErrorMessage(err));
          window.requestAnimationFrame(reportValidity);
        }
      } finally {
        if (ref.current)
          setSubmitting(false);
      }
    }
  }

  React.useEffect(function resetWhenRecordChanges() {
    const form = ref.current;
    if (form)
      reset();
  }, [ record, reset ]);

  React.useEffect(function checkValidity() {
    setValid(ref.current.checkValidity());
  }, [ fields ]);

  const className = classnames(props.className, 'groupy-form');

  return (
    <FormContext.Provider value={context}>
      <form {...{ ref, id, className, readOnly, onSubmit }}>
        {children}
      </form>
    </FormContext.Provider>
  );
}


// { name: { full: 'Jane Doe' } } => { 'name.full': 'Jane Doe' }
function recordToFields(record = {}, fields = {}, prefix = '') {
  for (const [ name, value ] of Object.entries(record)) {
    if (value && typeof value === 'object')
      recordToFields(value, fields, `${prefix}${name}.`);
    else
      fields[`${prefix}${name}`] = value; // eslint-disable-line no-param-reassign
  }
  return fields;
}


// { 'name.full': 'Jane Doe' } => { name: { full: 'Jane Doe' } }
function fieldsToRecord(fields, record = {}) {
  for (const [ name, value ] of Object.entries(fields)) {
    const nameParts  = name.split('.');
    const fieldName  = nameParts.pop();
    const insertInto = nameParts.reduce((object, part) => {
      object[part] = object[part] || {}; // eslint-disable-line no-param-reassign
      return object[part];
    }, record);
    insertInto[fieldName] = value; // eslint-disable-line no-param-reassign
  }
  return record;
}


export function getDefaultErrorMessage(error) {
  if (Array.isArray(error?.body?.errors))
    return error.body.errors;
  else
    return error?.friendlyMessage || error?.message;
}


/**
 * Form.Fieldset
 * - a helper component to render a fieldset with a legend around an input.
 *
 * - children: the input to render inside the fieldset.
 * - label: the fieldset's legend. If not provided, no legend will be rendered.
 * - readOnly: if true, the fieldset will be read-only. Borders will not be
 *   shown.
 * - onDoubleClick: a callback to be called when the fieldset is double-clicked.
 *   Can be used to toggle read-only mode, for example.
 * - className: the fieldset's class name.
 * - style: the fieldset's style.
 */
export function Fieldset({ className, children, id, label, readOnly, onDoubleClick, hint, disabled }) {
  const classNames = classnames('input-fieldset', className);

  return (
    <fieldset className={classNames} {...{ onDoubleClick, readOnly, disabled }} aria-label={label}>
      <div className="input-fieldset-content">
        {label && <legend className="input-label" htmlFor={id}>{label}</legend>}
        {children}
      </div>
      {hint && <label htmlFor={id} className="input-hint">{hint}</label>}
    </fieldset>
  );
}

/**
 * Form.Input
 * - for rendering text-based inputs (text, password, email, phone, url, etc.)
 *
 * - name: the input's name. Used to identify the input in the form record.
 * - id: the input's id. Defaults to the input's name.
 * - type: the input's type. Defaults to 'text'.
 * - label: the input's label.
 * - required: if true, the input will be required.
 * - defaultValue: the input's default value.
 * - formatter: a function to autoformat the input's value. Some built-in
 *   formatters are available in Form.Formatter. A default formatter is provided
 *   for some input types, e.g. phone or url.
 * - autoComplete: the input's autoComplete attribute.
 * - placeholder: the input's placeholder.
 * - maxLength: the input's maxLength attribute.
 * - validate: a validation function to be called when the input's value
 *   changes. Will be called with the form's fields. Should return an error
 *   message if the input's value is invalid, or an empty string if it's valid.
 * - onDoubleClick: called when the input is double-clicked.
 */
export function Input({
  name,
  id = name,
  type = 'text',
  label,
  required = false,
  defaultValue,
  formatter = getDefaultFormatter(type),
  autoComplete,
  placeholder,
  pattern,
  maxLength,
  validate,
  onDoubleClick,
  hint,
  disabled,
  ...props
}) {
  const ref      = React.useRef();
  const form     = useContext();
  const value    = form.fields[name] || defaultValue || '';
  const readOnly = form.readOnly || props.readOnly;
  useValidity({ ref, name, validate });

  function onChange(event) {
    const { target }     = event;
    const currentValue   = target.value;
    const formattedValue = formatter(currentValue);
    const currentRange   = [ target.selectionStart, target.selectionEnd ];
    const newRange       = currentRange.map(position => getOffsetPosition(position, currentValue, formattedValue));

    target.value        = formattedValue;
    target.defaultValue = formattedValue;

    // setSelectionRange fails for input type=email and type=number
    if (![ 'email', 'number' ].includes(type))
      target.setSelectionRange(...newRange);

    form.onChange(event);
  }

  return (
    <Fieldset {...{ id, label, readOnly, onDoubleClick, hint, disabled }}>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={formatter(value)}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : 0}
        onChange={onChange}
        onInput={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        title={props.title}
      />
    </Fieldset>
  );
}

/**
 * Form.Textarea
 */
export function Textarea({
  name,
  id = name,
  label,
  required,
  placeholder,
  readOnly,
  className,
  validate,
  onDoubleClick,
  hint,
  disabled,
}) {
  const form  = useContext();
  const value = form.fields[name] || '';
  const ref   = useAutosizeTextarea({ value });
  useValidity({ ref, name, validate });

  return (
    <Fieldset {...{ id, label, readOnly, onDoubleClick, hint, disabled }}>
      <textarea
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={form.onChange}
        onInput={form.onChange}
        value={value}
        ref={ref}
        className={className}
      />
    </Fieldset>
  );
}


/**
 * Form.Select
 */
export function Select({
  name,
  id = name,
  label,
  options,
  required,
  children,
  wide,
  validate,
  onDoubleClick,
  hint,
  disabled,
  ...props
}) {
  const ref        = React.useRef();
  const form       = useContext();
  const { fields } = form;
  const value      = getSelectedValue({ name, fields, options });
  const readOnly   = form.readOnly || props.readOnly;
  useValidity({ ref, name, validate });

  return (
    <Fieldset {...{ id, label, readOnly, onDoubleClick, hint, disabled }}>
      <SelectComponent
        name={name}
        label={label}
        value={value}
        required={required}
        disabled={disabled}
        onChange={form.onChange}
        options={options}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : 0}
        wide={wide}
        ref={ref}
      >
        {children}
      </SelectComponent>
    </Fieldset>
  );
}


function useValidity({ ref, name, validate }) {
  const form       = useContext();
  const { fields } = form;
  const { error }  = form;

  React.useEffect(() => {
    const input      = ref.current;
    const inputError = validate?.(fields);
    const errorList  = error && (Array.isArray(error) ? error : [ error ]);
    const formError  = errorList?.find(err => err.field === name);
    const validity   = inputError || formError?.message || '';
    input?.setCustomValidity(validity);
  }, [ ref, validate, fields, error, name ]);
}


function FormCard({ className, ...props }) {
  const classNames = classnames('form-card', className);
  return (
    <Card className={classNames} {...props}/>
  );
}

export { FormCard as Card };


function FormColumn({ className, ...props }) {
  const classNames = classnames('form-fields', className);
  return (
    <Column className={classNames} {...props}/>
  );
}

export { FormColumn as Column };


export function getOffsetPosition(position, oldValue, newValue) {
  const offset           = newValue.length - oldValue.length;
  const modifiedPosition = position + offset;
  // ensure that position is >= 0 and <= newValue.length
  return clamp(modifiedPosition, 0, newValue.length);
}


function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}



export const Formatter = {
  capitalize(value = '') {
    const parts = value.split(' ');
    return parts.map(capitalize).join(' ');
  },

  url(value = '') {
    return withHttp(value);
  },

  currency(value) {
    if (!value)
      return value;

    const options      = {
      style:    'currency',
      currency: 'USD',
    };
    const currentValue = value.replace(/\D/g, '') / 100;
    const formatted    = new Intl.NumberFormat('en-US', options).format(currentValue);

    return formatted;
  },

  phone(value) {
    const phoneNumber = Phone.parse(value, 'US');
    if (phoneNumber.phone && Phone.isValidNumber(phoneNumber)) {
      const format = phoneNumber.country === 'US' ? 'National' : 'International';
      return Phone.format(phoneNumber, format);
    } else {
      const asYouType      = new Phone.AsYouType('US');
      const output         = asYouType.input(value);
      const allowBackspace = output.replace(/[)\s]+$/g, '');
      return allowBackspace;
    }
  },

  unformatted(value) {
    return value;
  },
};

function getDefaultFormatter(type) {
  switch (type) {
    case 'tel':
      return Formatter.phone;
    case 'url':
      return Formatter.url;
    default:
      return Formatter.unformatted;
  }
}


function getSelectedValue({ name, fields, options }) {
  const defaultValue = '';
  const value        = fields[name];
  const values       = [ value, defaultValue ]; // make a list of possible values
  const currentValue = values.find(isDefined); // find the first defined value
  const isValid      = options.some(option => option.value === currentValue);

  return isValid ? currentValue : defaultValue;
}

function isDefined(value) {
  return value !== undefined && value !== null;
}


// Show error message at the top of the form
export function Error() {
  const { error } = useContext();
  const errorList = error && (Array.isArray(error) ? error : [ error ]);

  if (errorList?.some(isErrorString)) {
    return (
      <ul className="form-error-list">
        {errorList.filter(isErrorString).map(err => (<li key={err}><ErrorItem {...{ error: err }}/></li>))}
      </ul>
    );
  } else
    return null;
}

function ErrorItem({ error }) {
  return (
    <div className="form-error-item">
      {error}
    </div>
  );
}

function isErrorString(error) {
  return typeof error === 'string';
}

const httpRegex         = /^https?:\/\//i;
const partialHttpRegex  = /^http:\/?\/?/i;
const partialHttpsRegex = /^https:\/?\/?/i;

export function withHttp(value) {
  const url = value?.trim();

  // if url is valid, don't add prefix
  if (httpRegex.test(url))
    return url;

  // if user starts typing http:// or https://, don't add prefix
  else if ('http://'.startsWith(url) || 'https://'.startsWith(url))
    return url;

  // if user types a prefix but forgets a slash or two, fix it
  else if (partialHttpRegex.test(url))
    return `http://${url.replace(partialHttpRegex, '')}`;
  else if (partialHttpsRegex.test(url))
    return `https://${url.replace(partialHttpsRegex, '')}`;

  // only add prefix if url is non-empty
  else if (url)
    return `http://${url}`;

  else
    return value;
}
