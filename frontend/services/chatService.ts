export const sendMessage = (message: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reply: `Mock AI received: "${message}"`,

        recommendations: [
          "Focus on Database Systems this week.",
          "Complete your frontend integration tasks first.",
          "Revise React fundamentals before next assessment.",
        ],

        timeAnalysis: {
          availableHours: 12,
          recommendedHours: 8,
          message:
            "You have enough time, but need consistent daily study sessions.",
        },

        notifications: [
          "Assignment deadline in 2 days.",
          "You have 3 pending assessments.",
          "New task added by instructor.",
        ],

        resources: [
          {
            title: "React Documentation",
            url: "https://react.dev",
          },
          {
            title: "Next.js Learn",
            url: "https://nextjs.org/learn",
          },
          {
            title: "JavaScript Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          },
        ],
      });
    }, 1000);
  });
};