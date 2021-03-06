
// https://en.wikipedia.org/wiki/PETSCII

function to(input) {
  const sanitizedInput = input
    .replace(/\r/g, '')
    .replace(/\n/g, '\r')
    .replace(/[^A-Za-z\xc1-\xda 0-9.,?'"!@#$%^&*()-_=+;:<>/\\|}{[\]`~\r]*/g, '')
    .replace(/_/g, '-')
    .replace(/`/g, '\x27');  // '`' in petscii

  let petsciiString = '';
  for (let i = 0; i < sanitizedInput.length; i++) {
    const ascii = sanitizedInput.charCodeAt(i);
    if (ascii >= 65 && ascii <= 90) {
      petsciiString += String.fromCharCode(ascii + 32);
    } else if (ascii >= 97 && ascii <= 122) {
      petsciiString += String.fromCharCode(ascii - 32);
    } else if (ascii >= 193 && ascii <= 218) {
      petsciiString += String.fromCharCode(ascii - 128);
    } else {
      petsciiString += sanitizedInput[i];
    }
  }
  return petsciiString;
}

function from(input) {
  const convertedInput = input.replace(/\r/g, '\n');
  return to(convertedInput)
    .replace(/\r/g, '\n');
}

module.exports = {
  to,
  from
};
