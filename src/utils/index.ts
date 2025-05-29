export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setUser = (user: Record<string, any>) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): Record<string, any> | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const clearAuth = () => {
  removeToken();
  removeUser();
};
