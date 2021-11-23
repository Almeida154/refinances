const capitalizeFirstLetter = (str: string = 'Algo está errado') =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default capitalizeFirstLetter;
