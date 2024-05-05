import axios from 'axios'

export default function Input() {

  const handleButtonClick = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/blockchain', { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.error('Error calling backend:', error);
    }
  };

    
    return <button onClick={handleButtonClick}>GET CHAIN</button>;
  }