const doubleToCurrency = (
  value: number,
  language = 'pt-br',
  currency = 'BRL',
  isDecimal = false,
) =>
  value.toLocaleString(language, {
    style: isDecimal ? 'decimal' : 'currency',
    currency: currency,
  });

export default doubleToCurrency;
