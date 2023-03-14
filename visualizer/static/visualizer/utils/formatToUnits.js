export function formatToUnits(number, precision) {
    // Thanks to Novellizator from StackOverflow for this function. Tweaks to the original have been made to fit this site.
    const abbrev = ['', 'K', 'M', 'B', 'T'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ))
    const suffix = abbrev[order];
  
    return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
}