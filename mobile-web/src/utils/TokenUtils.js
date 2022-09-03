// 將 token 存到 localStorage
export const setAuthToken = (token_name, token_value) => {
  localStorage.setItem(token_name, token_value);
};

// 從 localStorage 讀取 token
export const getAuthToken = (token_name) => {
  return localStorage.getItem(token_name);
};
