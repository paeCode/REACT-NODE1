import React, { useState } from 'react';
import axios from 'axios';

function Quotes() { // เปลี่ยนชื่อ function ให้ตรงกับชื่อไฟล์
    const [text, setText] = useState("Click the button to get an inspirational quote!");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchQuote = async () => {
        setLoading(true);
        setError("");
        
        try {
            // เรียก API จาก backend
            const response = await axios.get('http://localhost:5000/api/quote');
            
            if (response.data.success) {
                const quote = response.data.data;
                setText(quote.text);
                setAuthor(quote.author);
            } else {
                setError('Failed to fetch quote');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            setError('Error connecting to server. Make sure backend is running on port 5000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <button 
                onClick={fetchQuote}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: '20px'
                }}
            >
                {loading ? 'Loading...' : 'Generate Quote'}
            </button>
            
            {error && (
                <div style={{ 
                    color: 'red', 
                    marginBottom: '20px',
                    padding: '10px',
                    backgroundColor: '#ffe6e6',
                    borderRadius: '5px'
                }}>
                    {error}
                </div>
            )}
            
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ 
                    fontStyle: 'italic', 
                    color: '#333',
                    lineHeight: '1.6'
                }}>
                    "{text}"
                </h2>
                {author && (
                    <h3 style={{ 
                        color: '#666',
                        fontWeight: 'normal'
                    }}>
                        - {author}
                    </h3>
                )}
            </div>
        </div>
    );
}

export default Quotes;