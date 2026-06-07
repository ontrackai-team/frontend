export const sendMessage = (message: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reply: `Mock AI: You said "${message}"`,
      });
    }, 1000);
  });
};