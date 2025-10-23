const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const fetchEmpresaByCNPJ = async (cnpj) => {
  try {
    const response = await fetch(`${API_URL}/api/cnpj/${cnpj.replace(/\D/g, '')}`);
    if (!response.ok) return '';
    const data = await response.json();
    return data.nome || '';
  } catch {
    return '';
  }
};

const AuthScreen = () => {
  // Máscara dinâmica para CPF ou CNPJ
  const maskDocumento = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length <= 11) {
      // CPF: 000.000.000-00
      return v
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14);
    } else {
      // CNPJ: 00.000.000/0000-00
      return v
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
        .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
        .slice(0, 18);
    }
  };
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [docValid, setDocValid] = useState(false);
  const navigate = useNavigate();

  const handleDocumentoBlur = async () => {
    const v = documento.replace(/\D/g, '');
    if (v.length === 14) {
      setLoading(true);
      setError('');
      const nomeEmpresa = await fetchEmpresaByCNPJ(v);
      setEmpresa(nomeEmpresa);
      setLoading(false);
      if (!nomeEmpresa) {
        setError('Empresa não encontrada para este CNPJ.');
        setDocValid(false);
      } else {
        setDocValid(true);
      }
    } else if (v.length === 11) {
      setEmpresa('Pessoa Física');
      setDocValid(true);
    } else {
      setDocValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const docNum = documento.replace(/\D/g, '');
    const empresaValida = empresa && empresa.trim() !== '' ? empresa.trim() : '';
    if (!nome || !docNum || (docNum.length === 14 && !empresaValida)) {
      setError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, documento: docNum, empresa: empresaValida })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('usuario', JSON.stringify({ nome, documento: docNum, empresa: empresaValida }));
        navigate('/');
      } else {
        setError(data.error || 'Falha ao salvar no backend.');
      }
    } catch (err) {
      setError('Erro de conexão com backend.');
    }
  };

  // Input icon SVGs
  const iconNome = (
    <span style={{ position: 'absolute', left: 12, top: 10, opacity: 0.7 }}>
      <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#ff6600"/><path d="M10 11c2.5 0 5 1.25 5 2.5V15H5v-1.5C5 12.25 7.5 11 10 11Z" fill="#fff"/><circle cx="10" cy="8" r="2" fill="#fff"/></svg>
    </span>
  );
  const iconCnpj = (
    <span style={{ position: 'absolute', left: 12, top: 10, opacity: 0.7 }}>
      <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="10" fill="#ff6600"/><path d="M6 7h8v6H6V7Z" fill="#fff"/><rect x="8" y="9" width="4" height="2" fill="#ff6600"/></svg>
    </span>
  );
  const iconEmpresa = (
    <span style={{ position: 'absolute', left: 12, top: 10, opacity: 0.7 }}>
      <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="10" fill="#ff6600"/><path d="M6 14V8l4-3 4 3v6H6Z" fill="#fff"/></svg>
    </span>
  );
  const iconCheck = (
    <span style={{ position: 'absolute', right: 12, top: 10 }}>
      <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#2ecc40"/><path d="M7 10.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
    </span>
  );

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg,#fff 60%,#f8f8f8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      padding: '0 12px'
    }}>
      {/* Split screen layout */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: 900,
        minHeight: 520,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        overflow: 'hidden',
      }}>
        {/* Left panel: image/identity */}
        <div style={{
          flex: 1,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}>
          <img src="/images/Logo Infoway Op01.png" alt="Logo" style={{ width: 180, maxWidth: '90%', borderRadius: 12, boxShadow: '0 4px 24px rgba(255,102,0,0.12)' }} />
        </div>
        {/* Right panel: form */}
        <div style={{
          flex: 1.2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 2rem',
          position: 'relative',
        }}>
          {/* Progress bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            background: 'linear-gradient(90deg,#ff6600 60%,#ffb366 100%)',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            padding: '0.5rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(255,102,0,0.08)',
          }}>
            <svg width="22" height="22" style={{ marginRight: 8 }}><circle cx="11" cy="11" r="11" fill="#fff"/><path d="M11 7v5l3 3" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.08rem', letterSpacing: 1 }}>Passo 1 de 3</span>
          </div>
          {/* Title with icon */}
          <h2 style={{ color: '#222', fontWeight: 800, fontSize: '2.1rem', marginBottom: 10, letterSpacing: 1, textAlign: 'center', lineHeight: 1.2, marginTop: 38 }}>
            Bem-vindo ao Portal de Implantação
          </h2>
          {/* Subtitle */}
          <p style={{ color: '#666', fontSize: '1.08rem', marginBottom: 18, textAlign: 'center', lineHeight: 1.5, maxWidth: 320, fontWeight: 400 }}>
            Para iniciar sua implantação, informe seus dados.<br />
            <span style={{ color: '#ff6600', fontWeight: 500 }}>É só preencher e clicar em "Iniciar Implantação"!</span>
          </p>
          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 340 }}>
            {/* Nome */}
            <div style={{ position: 'relative', marginBottom: 18 }}>
              <label style={{ display: 'block', fontWeight: 500, color: '#222', fontSize: '0.98rem', letterSpacing: 1, marginBottom: 4 }}>Seu nome</label>
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1.5px solid #eee',
                  fontSize: '1.08rem',
                  background: '#f8f8f8',
                  color: '#222',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => e.target.style.border = '1.5px solid #ff6600'}
                onBlur={e => e.target.style.border = '1.5px solid #eee'}
              />
            </div>
            {/* CPF ou CNPJ */}
            <div style={{ position: 'relative', marginBottom: 18 }}>
              <label style={{ display: 'block', fontWeight: 500, color: '#222', fontSize: '0.98rem', letterSpacing: 1, marginBottom: 4 }}>CPF ou CNPJ</label>
              <input
                type="text"
                value={documento}
                onChange={e => setDocumento(maskDocumento(e.target.value))}
                onBlur={e => { handleDocumentoBlur(); e.target.style.border = docValid ? '1.5px solid #2ecc40' : '1.5px solid #eee'; }}
                required
                placeholder="Digite seu CPF ou CNPJ"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: docValid ? '1.5px solid #2ecc40' : '1.5px solid #eee',
                  fontSize: '1.08rem',
                  background: '#f8f8f8',
                  color: '#222',
                  boxShadow: docValid ? '0 0 0 2px #2ecc4033' : '0 2px 8px rgba(0,0,0,0.06)',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => e.target.style.border = '1.5px solid #ff6600'}
              />
              {docValid && iconCheck}
              {error && <p style={{ color: '#ff6600', fontSize: '0.95rem', marginTop: 4 }}>{error}</p>}
            </div>
            {/* Empresa */}
            <div style={{ position: 'relative', marginBottom: 18 }}>
              <label style={{ display: 'block', fontWeight: 500, color: '#222', fontSize: '0.98rem', letterSpacing: 1, marginBottom: 4 }}>Nome da empresa</label>
              <input
                type="text"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                readOnly={!!empresa && !error}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1.5px solid #eee',
                  fontSize: '1.08rem',
                  background: error ? '#fffbe6' : '#f8f8f8',
                  color: '#222',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => e.target.style.border = '1.5px solid #ff6600'}
                onBlur={e => e.target.style.border = '1.5px solid #eee'}
                placeholder={error ? 'Digite manualmente' : ''}
              />
            </div>
            {/* CTA Button */}
            <button type="submit" style={{
              width: '100%',
              marginTop: 10,
              padding: '1rem 0',
              background: 'linear-gradient(90deg,#ff6600 60%,#ffb366 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px rgba(255,102,0,0.08)',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s, background 0.2s',
              letterSpacing: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
              onMouseOver={e => e.target.style.boxShadow = '0 4px 16px rgba(255,102,0,0.18)'}
              onMouseOut={e => e.target.style.boxShadow = '0 2px 8px rgba(255,102,0,0.08)'}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="22" height="22" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="5" strokeDasharray="31.4" strokeDashoffset="0"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite"/></circle></svg>
                  Validando…
                </span>
              ) : (
                <>
                  Iniciar Implantação
                  <span><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#fff"/><path d="M8 11h6M13 8l3 3-3 3" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                </>
              )}
            </button>
            {/* Microtext */}
            <div style={{ textAlign: 'center', marginTop: 12, color: '#888', fontSize: '0.92rem', lineHeight: 1.4 }}>
              <span style={{ marginRight: 4 }}><svg width="16" height="16" fill="none"><rect width="16" height="16" rx="8" fill="#eee"/><path d="M8 11.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0-6a2.5 2.5 0 0 1 2.5 2.5c0 1.38-1.12 2.5-2.5 2.5S5.5 9.38 5.5 8A2.5 2.5 0 0 1 8 5.5Z" fill="#888"/></svg></span>
              Seus dados são usados apenas para personalizar sua implantação.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
