const base64ToArrayBuffer = (binaryString) => {
  const sanitizedBinary = binaryString.replace(/data:.*;base64,/, "");
  const bString = window.atob(sanitizedBinary);
  const bLength = bString.length;
  const bytes = new Uint8Array(bLength);
  for (let i = 0; i < bLength; i++) {
    const ascii = bString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};

export default base64ToArrayBuffer;
