const login = async (username, password) => {
  console.log('Tentativa de login iniciada'); // Log inicial para rastrear tentativas de login
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    console.log('Resposta recebida do servidor'); // Log quando a resposta é recebida

    const data = await response.json();

    if (!response.ok) {
      console.error('Resposta de erro do servidor:', data); // Log detalhado de erros de resposta
      throw new Error(data.message || 'Falha ao fazer login');
    }

    console.log('Login bem-sucedido, token recebido'); // Log em caso de sucesso no login

    // Armazenar token no cookie
    setAuthToken(data.token);
    return data.token;  // Retorna o token para uso imediato
  } catch (error) {
    console.error('Erro durante a tentativa de login:', error); // Log de erro capturado
    throw error;
  }
};

const setAuthToken = token => {
  console.log('Configurando token no cookie'); // Log para rastrear a configuração do cookie
  // Configurações seguras para o cookie
  const options = {
    expires: new Date(Date.now() + 3600000), // 1 hora de validade
    secure: true,   // Apenas transmite o cookie sobre HTTPS
    httpOnly: true, // Não acessível via JavaScript no navegador
    sameSite: 'Strict' // Proteção contra ataques CSRF
  };

  document.cookie = `authToken=${token}; path=/; expires=${options.expires.toUTCString()}; secure=${options.secure}; httpOnly=${options.httpOnly}; SameSite=${options.sameSite}`;
  console.log('Token configurado com sucesso no cookie'); // Log após a configuração do cookie
};

const getAuthToken = () => {
  console.log('Recuperando token do cookie'); // Log para rastrear a recuperação do token
  const value = `; ${document.cookie}`;
  const parts = value.split(`; authToken=`);
  if (parts.length === 2) {
      console.log('Token encontrado no cookie'); // Log se o token for encontrado
      return parts.pop().split(';').shift();
  }
  console.log('Token não encontrado no cookie'); // Log se o token não for encontrado
  return null;
};

export { login, getAuthToken };
