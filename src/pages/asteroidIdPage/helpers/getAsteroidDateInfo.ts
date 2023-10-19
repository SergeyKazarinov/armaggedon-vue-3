import type { IAsteroid, ICloseApproachData } from '@/pages/mainPage';
import { DateTime } from 'luxon';

export interface IAsteroidDateInfo {
  dateInterval: number | undefined;
  closeApproachData: ICloseApproachData;
}

/**
 *
 * @param {IAsteroid} asteroid объект астероида
 * @param {string} today дата сегодняшнего дня в формате 2023-10-21
 * @returns {Object} Объект с данными
 * @property {ICloseApproachData} closeApproachData - объект с данными приближения
 * @property {number} dateInterval - число дней до даты сближения
 */
export const getAsteroidDateInfo = (
  asteroid: IAsteroid,
  today: string
): IAsteroidDateInfo | undefined => {
  for (const obj of asteroid.close_approach_data) {
    if (obj.close_approach_date >= today) {
      const dateInterval = DateTime.fromISO(obj.close_approach_date)
        .diff(DateTime.now(), 'days')
        .toObject().days;

      return {
        dateInterval: Math.ceil(dateInterval!),
        closeApproachData: obj
      };
    }
  }
};
