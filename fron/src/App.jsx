import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!walletAddress) {
        setError('Please enter a wallet address');
        return;
      }

      // Send the POST request to the Express backend
      const res = await axios.post('http://localhost:5500/ml', { walletAddress });
      
      // Handle the response
      setResponseData(res.data);
      setError('');
    } catch (err) {
      console.error('Error:', err.message);
      setError('An error occurred while processing the request.');
      setResponseData(null);
    }
  };

  return (
    <div>
      <h1>Enter Wallet Address</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
