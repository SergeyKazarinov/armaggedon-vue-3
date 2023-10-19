const ruOrdinalRules = new Intl.PluralRules('ru');

/**
 * Функция, которая склоняет словосочетание "лунные орбиты" в зависимости от числа
 * @param {Number} distance - целое число
 * @returns {String} целое число и склоняемое окончание
 */
export const getPluralLunarDistance = (distance: number): string => {
  const distanceLuna = Math.floor(distance);
  const pluralRule = ruOrdinalRules.select(distanceLuna);

  switch (pluralRule) {
    case 'one':
      return `${distanceLuna} лунная орбита`;
    case 'few':
      return `${distanceLuna} лунные орбиты`;
    case 'many':
      return `${distanceLuna} лунных орбит`;
    default:
      return `${distanceLuna} лунных орбит`;
  }
};
