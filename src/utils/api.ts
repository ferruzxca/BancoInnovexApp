export const loginApi = async (username: string, password: string) => {
  await new Promise(res => setTimeout(res, 800));
  if ((username === 'raul' || username === 'demo') && password === '1234') {
    return {
      token: 'jwt-token-demo',
      user: { username, name: 'Raúl Innovex', email: 'raul@neovexbank.com' }
    };
  }
  return null;
};