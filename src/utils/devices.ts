export const isAppleDevice = (): boolean => {
  return /iPhone|iPad|iPod/.test(navigator.userAgent);
};
