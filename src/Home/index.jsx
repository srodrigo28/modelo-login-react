import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
      const user = localStorage.getItem('user');
      
    if (!user) {
      alert('Faça login para acessar esta página.');
      navigate('/login');
    }
  }, [navigate]);

  return <div>
    <h1>Olá, Seja bem vindo</h1>   
  </div>;
}