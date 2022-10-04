export const waitUntil = async (validator: () => boolean) => {
  return new Promise((resolve) => {
    const validate = validator();
    if (!validate) {
      setTimeout(async () => {
        resolve(await waitUntil(validator));
      }, 100);
      return;
    }
    resolve(true);
  });
};
