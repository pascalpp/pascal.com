const aliases = {

  customer_since: 'customerSince',
  customersince:  'customerSince',

  client_email:            'email',
  contact_email:           'email',
  contactemail:            'email',
  customer_email:          'email',
  customer_email_address:  'email',
  customeremail:           'email',
  customers_email_address: 'email',
  e_mail:                  'email',
  e_mail_addr:             'email',
  email:                   'email',
  email_address:           'email',
  email_addresses:         'email',
  emailaddr:               'email',
  emailaddress:            'email',
  emailaddresses:          'email',
  emails:                  'email',
  name_email:              'email',
  name_emails:             'email',

  contact:        'full',
  contacts:       'full',
  customer_name:  'full',
  customername:   'full',
  customers_name: 'full',
  full:           'full',
  full_name:      'full',
  fullname:       'full',
  name:           'full',
  name_contact:   'full',
  names:          'full',

  client_first_name:  'given',
  contact_first_name: 'given',
  f_name:             'given',
  first:              'given',
  first_name:         'given',
  firstname:          'given',
  fname:              'given',
  given:              'given',
  given_name:         'given',
  nmfrst:             'given',

  customer_id: 'id',
  id:          'id',

  last_transaction:      'lastTransaction',
  last_transaction_date: 'lastTransaction',
  lasttransaction:       'lastTransaction',
  lastTransaction:       'lastTransaction',
  transaction:           'lastTransaction',

  cell:           'phone',
  cell_phone:     'phone',
  cellphone:      'phone',
  client_mobile:  'phone',
  client_phone:   'phone',
  contact_mobile: 'phone',
  contact_phone:  'phone',
  contactmobile:  'phone',
  contactphone:   'phone',
  mobile:         'phone',
  mobile_phone:   'phone',
  mobilephone:    'phone',
  phone:          'phone',
  phone_number:   'phone',

  preferred: 'preferred',

  clerk:              'provider',
  client_assigned_to: 'provider',
  employee:           'provider',
  employee_name:      'provider',
  job_lead:           'provider',
  provider:           'provider',
  provider_name:      'provider',
  rep:                'provider',
  sales_person:       'provider',
  service_provider:   'provider',
  tech:               'provider',
  technician:         'provider',
  providername:       'provider',
  providerName:       'provider',
  team_member:        'provider',
  teammember:         'provider',

  last_name:         'surname',
  last:              'surname',
  lname:             'surname',
  nmlst:             'surname',
  surname:           'surname',
  contact_last_name: 'surname',
  client_last_name:  'surname',
  lastname:          'surname',
  l_name:            'surname',
};


export default function guessColumn(column) {
  const lowerColumn = column.toLowerCase();
  if (aliases[lowerColumn])
    return aliases[lowerColumn];
  else
    return null;
}
