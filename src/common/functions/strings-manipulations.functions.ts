/**
 * removeWhiteSpace
 *
 * @param {string} text
 * @return {*}
 */
export const removeWhiteSpace = (text: string) => {
  return text.split(' ').join('-');
};
