// eslint-disable-next-line import/prefer-default-export
export const parseJwt = (token): any => {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  // eslint-disable-next-line consistent-return
  return JSON.parse(window.atob(base64));
};
