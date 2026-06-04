export const sendMessage = (message: string) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        reply:
          "Mock AI Response: You are studying well. Keep going!",
      });
    }, 1000);
  });
};