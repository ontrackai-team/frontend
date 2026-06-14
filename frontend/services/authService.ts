export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const loginUser = async (data: LoginData) => {
  // Mock login
  return Promise.resolve({
    success: true,
    token: "mock-jwt-token",
    user: {
      id: 1,
      name: "Test User",
      email: data.email,
    },
  });
};

export const registerUser = async (data: RegisterData) => {
  // Mock registration
  return Promise.resolve({
    success: true,
    message: "Registration successful",
    user: {
      id: 1,
      name: data.name,
      email: data.email,
    },
  });
};