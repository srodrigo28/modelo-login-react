import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Faz a requisição para verificar se o usuário existe
      const response = await axios.get(`http://localhost:3000/users`, {
        params: { username, email, password },
      });

      if (response.data.length > 0) {
        // Usuário encontrado, login com sucesso
        const user = response.data[0];
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login realizado com sucesso!');
        setTimeout( () => {
            navigate('/Home');
        }, 3000)
        setError(null);
      } else {
        // Usuário não encontrado
        setError('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'black', color: 'white' }}>
      <form onSubmit={handleLogin} style={{ width: '300px', padding: '2rem', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Login</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label>Usuário</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
