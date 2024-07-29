function isStringLengthValid(str, maxLength) {
  return str.length <= maxLength;
}

isStringLengthValid();

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();

  let reversedStr = '';

  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }

  return normalizedStr === reversedStr;
}

isPalindrome();

function extractDigits(input) {
  const str = typeof input === 'number' ? input.toString() : input;

  if (typeof str !== 'string') {
    return NaN;
  }

  let digits = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const digit = parseInt(char, 10);

    if (!Number.isNaN(digit)) {
      digits += digit;
    }
  }

  if (digits.length === 0) {
    return NaN;
  }

  return parseInt(digits, 10);
}

extractDigits();

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function isMeetingWithinWorkHours(startWork, endWork, startMeeting, duration) {
  const startWorkMinutes = parseTime(startWork);
  const endWorkMinutes = parseTime(endWork);
  const startMeetingMinutes = parseTime(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
}

isMeetingWithinWorkHours();
