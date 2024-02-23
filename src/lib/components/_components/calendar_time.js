//  Show calendar time: "Today 5:00am", "Last Wednesday", etc
import { differenceInCalendarDays } from 'date-fns';
import { format }                   from 'date-fns';
import { parseISO }                 from 'date-fns';


const shortFormats = {
  today:     'h:mm a',
  yesterday: '\'Yesterday\'',
  tomorrow:  '\'Tomorrow\'',
  thisWeek:  'eeee',
  other:     'MM/dd/yyyy',
};

const longFormats = {
  today:     '\'Today\'     h:mm a',
  yesterday: '\'Yesterday\' h:mm a',
  tomorrow:  '\'Tomorrow\' h:mm a',
  thisWeek:  '\'Last\' eeee h:mm a',
  other:     'MM/dd/yyyy h:mm a',
};


//  time - Date object
//  long - If true, use long format
export default function CalendarTime({ time, long = false }) {
  if (!time)
    return null;

  const parsedTime = typeof (time) === 'string' ? parseISO(time) : time;

  if (!isValidDate(parsedTime))
    return null;

  const formats = long ? longFormats : shortFormats;
  const diff    = differenceInCalendarDays(parsedTime, Date.now());
  if (diff < -6)
    return format(parsedTime, formats.other);
  else if (diff < -1)
    return format(parsedTime, formats.thisWeek);
  else if (diff === -1)
    return format(parsedTime, formats.yesterday);
  else if (diff === 0)
    return format(parsedTime, formats.today);
  else if (diff === 1)
    return format(parsedTime, formats.tomorrow);
  else
    return format(parsedTime, formats.other);
}


export function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
