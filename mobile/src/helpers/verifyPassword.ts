export function hasMinimum(pswd: string) {
  return pswd.length >= 6;
}

export function hasAtLeastOneNumber(pswd: string) {
  const pswdArr: Array<any> = pswd.split('');
  for (let i = 0; i < pswdArr.length; i++) {
    //console.debug(pswdArr[i], typeof pswdArr[i]);
    if (!isNaN(pswdArr[i])) return true;
  }
  return false;
}

export function hasAtLeastOneLetter(pswd: string) {
  const pswdArr = pswd.split('');
  for (let i = 0; i < pswdArr.length; i++)
    if (pswdArr[i].toLowerCase() != pswdArr[i].toUpperCase()) return true;
  return false;
}

export function isValid(pswd: string) {
  const pswdArr = pswd.split('');
  const validCharacters = [
    '~',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '+',
    '=',
    '`',
    '|',
    '{',
    '}',
    ':',
    ';',
    '!',
    '.',
    '?',
    '/',
    '"',
    '(',
    ')',
  ];
  for (let i = 0; i < pswdArr.length; i++)
    if (!pswdArr[i].match(/^[a-zA-Z0-9]$/)) {
      var match = false;
      for (let j = 0; j < validCharacters.length; j++)
        if (pswdArr[i] == validCharacters[j]) {
          match = true;
          break;
        }
      if (!match) return false;
    }
  return true;
}
