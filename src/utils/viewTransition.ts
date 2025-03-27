// View transitions API helper for Next.js
export const startViewTransition = (callback: () => void): void => {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
};