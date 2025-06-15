import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setQuote(data))
      .catch(err => console.error('Error fetching quote:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {quote ? (
          <>
            <h2>คำคมจาก Backend</h2>
            <blockquote style={{ fontStyle: 'italic' }}>
              "{quote.text}"
              <br />
              <span style={{ fontWeight: 'bold' }}>— {quote.author}</span>
            </blockquote>
          </>
        ) : (
          <p>กำลังโหลดคำคม...</p>
        )}
      </header>
    </div>
  );
}

export default App;
