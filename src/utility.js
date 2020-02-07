//UI Utilities

export const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length

export function rounded(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals)
}
