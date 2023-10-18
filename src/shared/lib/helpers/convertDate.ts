import { DateTime } from 'luxon';

/**
 * Функция, котороая переводит формат даты с 2023-10-23 на 23 окт 2023
 * @param {String} date - дата типа string в формате 2023-10-23
 * @returns {String} дату в формате 23 окт 2023
 */

export const convertDate = (date: string): string => {
  return DateTime.fromISO(date).setLocale('ru').toFormat('dd LLL yyyy').replace('.', '');
};
