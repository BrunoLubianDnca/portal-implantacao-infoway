import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('http://localhost:3001/api/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Teste Dev', documento: '12345678901', empresa: 'Pessoa Fisica' })
    });
    console.log('status', res.status);
    const text = await res.text();
    console.log('body', text);
  } catch (err) {
    console.error('erro', err.message);
  }
}

test();
