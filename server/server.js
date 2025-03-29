const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('./node_modules/axios/index.d.cts');

const app = express();
const upload = multer();
const PORT = 3000;

// Enable CORS for React Native app
app.use(cors());

// Ollama configuration
const OLLAMA_URL = 'http://localhost:11434/api/generate';

app.post('/process', upload.single('audio'), async (req, res) => {
  try {
    // 1. Get audio chunk from phone
    const audioBuffer = req.file.buffer;
    
    // 2. Convert audio to text (add STT here later)
    const fakeTranscript = "The salesman says this car has clean history";
    
    // 3. Query Ollama
    const response = await axios.post(OLLAMA_URL, {
      model: "mistral",
      prompt: `[CAR EXPERT MODE] Analyze this car negotiation message: ${fakeTranscript}. Identify red flags and give short advice.`,
      stream: false
    });

    res.json({ advice: response.data.response });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});