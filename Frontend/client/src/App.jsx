import { useState } from 'react';
import axios from 'axios';

function App() {
  const [word, setWord] = useState(''); 
  const [translated, setTranslated] = useState(''); 
  const [error, setError] = useState(''); 

  const handleTranslate = async () => {
    if (!word) {
      setError('กรุณากรอกคำที่ต้องการแปล'); 
      setTranslated(''); 
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/translate', { word });
      setTranslated(response.data.translated); 
      setError('');
    } catch (err) {
      setTranslated('');  
      setError('เกิดข้อผิดพลาดในการแปล');
    }
  };

  return (

  <div className='bg-gray-700 min-h-screen flex items-center justify-center'>
    <div className='container bg-white p-8 rounded-xl shadow-lg max-w-md'>
      <h1 className="text-3xl font-bold text-center mb-4">Dictionary App</h1>
      <input type="text" value={word} placeholder='กรอกคำที่ต้องการจะแปล'  onChange={(e)=> {setWord(e.target.value); setTranslated('');}} className='mt-2 p-3 py-2 border border-blue-500 w-full rounded-md' />
      <button onClick={handleTranslate} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"> แปลความหมาย  </button>
      {translated&&(
        <>
          <div className='mt-5'>
            <h1 className='text-4xl font-bold uppercase'>{word}</h1>
            <h1 className='text-lg font-bold text-green-600'>ความหมาย : {translated}</h1>
          </div>

        </>
      )
      }
    
    </div>
  </div>


  );
}

export default App;
