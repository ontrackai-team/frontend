export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const loginUser = (data: LoginData) => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (data.email && data.password) {
        resolve({
          access_token: "mock-token-123",
          user: {
            email: data.email,
          },
        });
      } else {
        reject("Invalid credentials");
      }
    }, 1000);
  });
};

export const registerUser = (data: RegisterData) => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (data.email && data.password) {
        resolve({
          message: "User registered successfully",
        });
      } else {
        reject("Registration failed");
      }
    }, 1000);
  });
};