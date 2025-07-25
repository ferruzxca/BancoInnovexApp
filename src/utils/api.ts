export const loginApi = async (email: string, password: string) => {
  try {
    const res = await fetch("https://servidorbanquigt.site:8081/auth/login"
         // const res = await fetch("http://localhost:8080/auth/login"

      , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (error) {
    return { mensaje: "Error de red o servidor", estado: false };
  }
};