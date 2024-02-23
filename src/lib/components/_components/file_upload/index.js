import './file_upload.less';

import * as Business                  from '../../business';
import { MaxReviewRequestsAlertCard } from '../max_review_requests_warning';
import AlertCard                      from '../alert_card';
import Button                         from '../button';
import Column                         from '../column';
import guessColumn                    from './guess_column';
import MapFields                      from '../../add/map_fields';
import PageSection                    from '../../components/page_section';
import pluralize                      from '../../util/pluralize';
import Radio                          from '../../components/radio';
import React                          from 'react';
import Setting                        from '../../components/setting';
import UploadClipboard                from './upload_clipboard';
import UploadFile                     from '../upload_file';
import useRouteParams                 from '../../hooks/use_route_params';


const initialState = {
  headers:        null, // [{ value: 'firstname', label: 'First Name'}, {value: 'email', label: 'E-mail'} ],
  allRecords:     null,
  records:        null, // [ [ 'a', 'b@broadly.com' ], [ 'c', 'd@broadly.com' ], [ 'd', 'invalid' ] ],
  mapping:        null,  // {'name.full': 'full_name', id: 'customer_id', ...}
  mappingErrors:  null,
  error:          null,
  summary:        null,
  customers:      null,
  view:           'upload',
  sendThankYou:   true,
  customersReady: 0,
};

export default class FileUploadComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleParseSuccess  = this.handleParseSuccess.bind(this);
    this.handleParseError    = this.handleParseError.bind(this);
    this.handleMappingChange = this.handleMappingChange.bind(this);
    this.handleCancel        = this.handleCancel.bind(this);
    this.handleSubmit        = this.handleSubmit.bind(this);
    this.handleOnPaste       = this.handleOnPaste.bind(this);
    this.setSendThankYou     = this.setSendThankYou.bind(this);
  }

  handleParseSuccess({ headers, records, fileName }) {
    const haveHeaders          = headers && headers.length;
    const haveNeededHeaders    = haveHeaders && headers.length >= 2;
    const haveRecords          = records && records.length > 0;
    const canMap               = haveRecords && haveNeededHeaders;
    const isEmpty              = !haveRecords || !haveHeaders;
    const onlyHeaders          = !haveRecords;
    const { validationErrors } = this.props;

    if (canMap)
      this.setMappingState({ headers, fileName, allRecords: records, records });
    else if (isEmpty || onlyHeaders)
      this.setState({ error: validationErrors.emptyRecords(fileName) });
    else
      this.setState({ error: validationErrors.missingColumns(fileName) });
  }

  handleParseError(error) {
    const { validationErrors } = this.props;
    this.setState({ error: validationErrors.notSupported(error) });
  }

  setMappingState({ headers, fileName, allRecords, records }) {
    const { provider }         = this.props;
    const { sendThankYou }     = this.state;
    const { validationErrors } = this.props;

    const preparedHeaders = headers.map(normalizeHeader);
    const headerAsObject  = headers.map((header, index) => ({
      label: headers[index],
      value: preparedHeaders[index],
    }));

    const { recordsLimited, error } = checkSize({ allRecords, sendThankYou, validationErrors });

    const { initialMapping } = this.props;
    const mapping            = this.state.mapping || getInitialMapping({ headers: preparedHeaders, initialMapping });
    const hasMapping         = mapping && Object.keys(mapping).length > 0;

    const newState = {
      headers:    headerAsObject,
      allRecords: records,
      records:    recordsLimited,
      view:       'mapping',
      fileName,
      error,
      mapping,
    };

    if (hasMapping) {
      this.setState({
        ...newState,
        ...getContactsAndSummary({
          records: newState.records,
          headers: newState.headers,
          mapping,
          provider,
          sendThankYou,
        }),
      });
    } else
      this.setState(newState);
  }

  handleOnPaste(event) {
    event.preventDefault();

    this.uploadFile.current.copyFromClipboard();
  }

  handleMappingChange({ mapping }) {
    const errors = validate(mapping);

    const { allRecords }       = this.state;
    const { headers }          = this.state;
    const { provider }         = this.props;
    const { sendThankYou }     = this.state;
    const { validationErrors } = this.props;

    const { recordsLimited, error } = checkSize({ allRecords, sendThankYou, validationErrors });

    this.setState({
      errors,
      mapping,
      records: recordsLimited,
      error,
      ...getContactsAndSummary({ records: recordsLimited, headers, mapping, provider, sendThankYou }),
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { customers }  = this.state;
    const validCustomers = customers.filter(isValidCustomer);
    const { mapping }    = this.state;


    await this.props.handleSubmit({ validCustomers, mapping });
    this.setState({ ...initialState, mapping });
  }

  handleCancel(event) {
    event.preventDefault();

    this.setState({ ...initialState, mapping: this.props.initialMapping });
  }

  setSendThankYou(sendThankYou) {
    const { allRecords }       = this.state;
    const { headers }          = this.state;
    const { mapping }          = this.state;
    const { provider }         = this.props;
    const { validationErrors } = this.props;

    const errors = validate(mapping);

    const { recordsLimited, error } = checkSize({ allRecords, sendThankYou, validationErrors });

    this.setState({
      sendThankYou,
      errors,
      mapping,
      error,
      ...getContactsAndSummary({ records: recordsLimited, headers, mapping, provider, sendThankYou }),
    });
  }

  render() {
    const { businessName }     = this.props;
    const { showSendThankYou } = this.props;
    const { customersReady }   = this.state;
    const { headers }          = this.state;
    const { records }          = this.state;
    const { mapping }          = this.state;
    const { summary }          = this.state;
    const { mappingErrors }    = this.state;
    const { error }            = this.state;
    const { view }             = this.state;
    const { fileName }         = this.state;
    const { sendThankYou }     = this.state;
    const isUpload             = view === 'upload';
    const isMapping            = view === 'mapping';
    const canImport            = isMapping && customersReady > 0;

    const importButtonLabel = canImport
      ? `Import ${customersReady} ${pluralize(customersReady, 'customer')}`
      : 'Import customers';

    return (
      <Column className="file-upload">
        <PageSection>
          <Column>
            {businessName && (
              <h2 className="file-upload-heading">Import customers to {businessName}</h2>
            )}

            <p>
              Upload a spreadsheet with your recent customers and we will send them a review request.<br/>
            </p>
            <p>
              Need help importing? Please see <Button
                link
                href="https://broadlyhelp.force.com/s/article/file-upload"
                label="our support center"
              /> or <Button link
                href="https://s3.amazonaws.com/helpscout.net/docs/assets/5aa029082c7d3a7549516d89/attachments/5b6892282c7d3a03f89d671c/Broadly-Upload-Template.csv"
                label="download sample template"/>.
            </p>
          </Column>
        </PageSection>

        {error && (
          <PageSection>
            <AlertCard type={error.type}>{error.message}</AlertCard>
          </PageSection>
        )}

        {isUpload && (
          <PageSection>
            <UploadFile onSuccess={this.handleParseSuccess} onError={this.handleParseError}/>
          </PageSection>
        )}

        {isMapping && (
          <PageSection>
            <MapFields
              fileName={fileName}
              mapping={mapping}
              headers={headers}
              records={records}
              errors={mappingErrors}
              summary={summary}
              onMappingChange={this.handleMappingChange}/>
          </PageSection>

        )}
        {canImport && showSendThankYou && (
          <PageSection>
            <SendThankYou sendThankYou={sendThankYou} setSendThankYou={this.setSendThankYou}/>
          </PageSection>
        )}

        <PageSection>
          <Button.Row spread className="import-actions">
            <Button.Row>
              {isUpload && (
                <UploadClipboard onSuccess={this.handleParseSuccess} onError={this.handleParseError}/>
              )}
            </Button.Row>
            <Button.Row>
              {isMapping && (
                <Button secondary onClick={this.handleCancel} label="Cancel"/>
              )}
              <Button primary onClick={this.handleSubmit} label={importButtonLabel} disabled={!canImport}/>
            </Button.Row>
          </Button.Row>
        </PageSection>

      </Column>
    );
  }
}


function SendThankYou({ sendThankYou, setSendThankYou }) {
  const defaultShouldSendThankYou = sendThankYou === true;
  const { businessID }            = useRouteParams();
  const hasMaxReviewRequests      = Business.useHasMaxReviewRequests(businessID);
  const shouldSendThankYou        = hasMaxReviewRequests ? false : defaultShouldSendThankYou;

  return (
    <>
      {hasMaxReviewRequests && (
        <div className="review-request-warning-wrapper">
          <MaxReviewRequestsAlertCard {...{ businessID }}/>
        </div>
      )}

      <Setting.Card>
        <Radio
          title="Send review requests"
          subtitle="We will send review requests to all contacts in your file."
          name="sendThankYou"
          value="yes"
          checked={shouldSendThankYou}
          onChange={() => setSendThankYou(true)}
          disabled={hasMaxReviewRequests}
        />
        <Radio
          title="Don’t send review requests"
          subtitle="Upload contacts for messaging, send a review request later from the contact page."
          name="sendThankYou"
          value="no"
          checked={!shouldSendThankYou}
          onChange={() => setSendThankYou(false)}
        />
      </Setting.Card>
    </>
  );
}


export function normalizeHeader(header) {
  const stripped = header.replace(/[#`;:'",.-]/g, '');
  return stripped.trim().toLowerCase().replace(/\s/g, '_');
}


function validate(mapping) {
  const errors = {};
  if (!mapping.phone && !mapping.email)
    errors.email = 'Phone or Email column is required.  Please match at least one of your columns to phone or email';

  if (!mapping.full && !mapping.given && !mapping.preferred && !mapping.surname)
    errors.full = 'Name is required.  Please match at least one of your columns to fields: full name, first name, or last name';

  if (Object.keys(errors).length > 0)
    return errors;
  else
    return null;
}

function getContactsAndSummary({ headers, mapping, records, provider, sendThankYou }) {
  const customers      = getContacts({ headers, mapping, records, provider, sendThankYou });
  const summary        = getSummary(customers);
  const customersReady = summary.ready;

  return {
    customers,
    summary,
    customersReady,
  };
}

function getContacts({ headers, records, mapping, provider, sendThankYou }) {
  const recordsMapped = getRecordsMapped({ headers, mapping, records });
  const customers     = recordsMapped.map(record => toCustomerSchema({ record, provider, sendThankYou }));

  return customers;
}

function getRecordsMapped({ headers, records, mapping }) {
  // headers [{ value: 'full name', label: 'Full Name'}, {value: 'customer id',
  // label: 'Customer ID'}] mapping {name: 'full_name', id: 'customer_id', ...}
  // records [['vinicius', '2']] result  [[name: 'vinicius', id: 2]]
  const mappingInverted = swapKeyWithValue(mapping);

  // mappingInverted {first_name:'given', last_name:'surname',
  // email_address:'email'}
  const mappingAsIndex = headers.reduce((acc, header, index) => {
    return {
      ...acc,
      [index]: mappingInverted[header.value],
    };
  }, {});
  const recordsMapped  = records.map(record => {
    return record.reduce((acc, value, index) => {
      const key = mappingAsIndex[index];
      return {
        ...acc,
        [key]: value.trim ? value.trim() : value,
      };
    }, {});
  });

  return recordsMapped;
}

function swapKeyWithValue(data) {
  return Object.assign({}, ...Object.entries(data).map(([ a, b ]) => ({ [b]: a })));
}

function isValidCustomer(customer) {
  return hasValidName(customer) &&
    hasValidContact(customer);
}

function hasValidName({ name }) {
  return name.full || name.given || name.preferred || name.surname;
}

function hasValidContact({ contact }) {
  return contact.phone || isValidEmail(contact.email);
}

const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isValidEmail(email) {
  return validEmailRegex.test(email);
}

function toCustomerSchema({ record, provider, sendThankYou }) {
  // Everytime sendThankYou is disabled, update ignoreActivityBefore timestamp.
  // We will ignore all customer activity older than this date to prevent
  // followup messaging.
  const ignoreActivityBefore = sendThankYou ? undefined : new Date();
  const transactions         = getTransactions({ record, sendThankYou });

  const customer = {
    id:   record.id,
    name: {
      full:      record.full,
      given:     record.given,
      surname:   record.surname,
      preferred: record.preferred,
    },
    contact: {
      email: record.email,
      phone: record.phone,
    },
    // If provider, add to transaction.
    transactions,
    customerSince: record.customerSince,
    ignoreActivityBefore,
    source:        {
      name: 'file',
    },
    provider,
  };

  return customer;
}

function getTransactions({ record, sendThankYou }) {
  const timestamp = sendThankYou
    ? record.lastTransaction || new Date()
    // When we don't want to send a review request, only save last transaction
    // date if its in the record. This is so that we don't schedule messages
    // because the ignoreActivityBefore date is older or the same time as the
    // transaction timestamp.
    : record.lastTransaction || null;

  if (timestamp) {
    const provider     = record.provider ? { name: record.provider } : null;
    const transactions = [{ timestamp, provider }];
    return transactions;
  } else
    return [];
}

function checkSize({ allRecords, sendThankYou, validationErrors }) {
  if (sendThankYou) {
    const isLarge        = allRecords.length > 500;
    const recordsLimited = allRecords.slice(0, 500);
    const error          = isLarge ? validationErrors.largeFileWithReviewRequests : null;
    return { recordsLimited, error };
  } else {
    const isLarge        = allRecords.length > 5000;
    const recordsLimited = allRecords.slice(0, 5000);
    const error          = isLarge ? validationErrors.largeFileWithNoReviewRequests : null;
    return { recordsLimited, error };
  }
}

function getInitialMapping({ headers, initialMapping }) {
  const guessed = headers.reduce((acc, header) => {
    const value = guessColumn(header);
    if (value)
      return { ...acc, [value]: header };
    else
      return acc;
  }, {});
  const initial = initialMapping && Object.entries(initialMapping)
    .filter(([ , value ]) => headers.includes(value))
    .reduce((acc, entry) => {
      const [ key, value ] = entry;
      return {
        ...acc,
        [key]: value,
      };
    }, {});

  return { ...guessed, ...initial };
}

function getSummary(customers) {
  const missingInfo = customers.filter(customer => !hasValidContact(customer) || !hasValidName(customer)).length;
  const ready       = customers.length - missingInfo;

  return {
    missingInfo,
    ready,
  };
}
