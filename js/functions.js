//Функция для проверки длины строки

function isStringLengthValid(str, maxLength) {
  // Проверяем длину строки и возвращаем результат
  return str.length <= maxLength;
}

isStringLengthValid();

//Функция является ли строка полиндромом

function isPalindrome(str) {
  // Удаляем все пробелы и приводим строку к нижнему регистру
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();

  // Переменная для перевёрнутой строки
  let reversedStr = '';

  // Переворачиваем строку
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }

  // Сравниваем нормализованную строку с перевёрнутой
  return normalizedStr === reversedStr;
}

isPalindrome();

//Дополнительное задание

function extractDigits(input) {
  // Приводим входные данные к строке
  const str = typeof input === 'number' ? input.toString() : input;

  // Проверяем, что входные данные являются строкой
  if (typeof str !== 'string') {
    return NaN;
  }

  // Переменная для хранения извлечённых цифр
  let digits = '';

  // Перебираем каждый символ строки
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const digit = parseInt(char, 10);

    // Проверяем, является ли символ цифрой
    if (!Number.isNaN(digit)) {
      digits += digit;
    }
  }

  // Если не было найдено ни одной цифры, возвращаем NaN
  if (digits.length === 0) {
    return NaN;
  }

  // Преобразуем извлечённые цифры в целое положительное число и возвращаем его
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
