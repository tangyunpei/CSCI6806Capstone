/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
export function addLight(color: string, amount: number) {
  const cc = Number.parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

/**
 * Darkens a HEX color given the passed percentage
 * @param {string} color The color to process
 * @param {number} amount The amount to change the color by
 * @returns {string} The HEX representation of the processed color
 */
export function darken(color: string, amount: number) {
  const baseColor = color.includes('#')
    ? color.substring(1, color.length)
    : color;
  const baseAmount = Math.trunc((255 * amount) / 100);
  return `#${subtractLight(baseColor.substring(0, 2), baseAmount)}${subtractLight(
    baseColor.substring(2, 4),
    baseAmount
  )}${subtractLight(baseColor.substring(4, 6), baseAmount)}`;
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function lighten(color: string, amount: number) {
  const baseColor = color.includes('#')
    ? color.substring(1, color.length)
    : color;
  const baseAmount = Math.trunc((255 * amount) / 100);
  return `#${addLight(baseColor.substring(0, 2), baseAmount)}${addLight(
    baseColor.substring(2, 4),
    baseAmount
  )}${addLight(baseColor.substring(4, 6), baseAmount)}`;
}

/**
 * 判断是否 url
 */
const RegExp = /^http(s)?:\/\//iu;
export function isUrl(url: string) {
  return RegExp.test(url);
}

/**
 * 一维数组转二维数组
 */
export function arrayTrans(arr: number[]): number[][] {
  const newArr: number[][] = [];
  while (arr.length > 0) {
    newArr.push(arr.splice(0, 2));
  }
  return newArr;
}

/**
 * Subtracts the indicated percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function subtractLight(color: string, amount: number) {
  const cc = Number.parseInt(color, 16) - amount;
  const c = cc < 0 ? 0 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

export function hexToRgba(hex: string, opacity: number) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const baseHex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(baseHex);
  const baseOpacity = opacity >= 0 && opacity <= 1 ? Number(opacity) : 1;
  return result
    ? `rgba(${[
        Number.parseInt(result[1], 16),
        Number.parseInt(result[2], 16),
        Number.parseInt(result[3], 16),
        baseOpacity,
      ].join(',')})`
    : baseHex;
}
