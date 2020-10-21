export const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
};
