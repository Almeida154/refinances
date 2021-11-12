const doubleToCurrency = (value: number, language: 'pt-br', currency: 'BRL') =>
  value.toLocaleString(language, {
    style: 'currency',
    currency: currency,
  });

export default doubleToCurrency;
