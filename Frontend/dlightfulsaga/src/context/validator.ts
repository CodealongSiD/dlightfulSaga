export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/.test(password);
};

export const validateName = (name: string) => {
  return name.trim().length >= 3;
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};