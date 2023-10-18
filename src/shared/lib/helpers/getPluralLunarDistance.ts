const ruOrdinalRules = new Intl.PluralRules('ru');

/**
 * Функция, которая склоняет словосочетание "лунные орбиты" в зависимости от числа
 * @param {Number} distance - целое число
 * @returns {String} целое число и склоняемое окончание
 */
export const getPluralLunarDistance = (distance: number): string => {
  const pluralRule = ruOrdinalRules.select(distance);

  switch (pluralRule) {
    case 'one':
      return `${distance} лунная орбита`;
    case 'few':
      return `${distance} лунные орбиты`;
    case 'many':
      return `${distance} лунных орбит`;
    default:
      return `${distance} лунных орбит`;
  }
};
