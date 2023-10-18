const ruOrdinalRules = new Intl.PluralRules('ru');

/**
 * Функция, которая склоняет слово "астероид"
 * @param {Number} asteroids - целое астероидов
 * @returns {String} целое число и склоняемое окончание
 */
export const getPluralAsteroids = (asteroids: number): string => {
  const pluralRule = ruOrdinalRules.select(asteroids);

  switch (pluralRule) {
    case 'one':
      return `${asteroids} астероид`;
    case 'few':
      return `${asteroids} астероида`;
    case 'many':
      return `${asteroids} астероидов`;
    default:
      return `${asteroids} астероидов`;
  }
};
