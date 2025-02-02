import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import  { initializeVectorStore }  from './vectorStore';
import { createRAGPipeline } from './ragPipeline';

dotenv.config();

const app = express();
app.use(express.json());

let ragPipeline: ((query: string) => Promise<string>) | undefined;

async function initialize() {
  console.log('initialize here 1');
  const vectorStore = await initializeVectorStore();
  console.log('initialize here 2');
  ragPipeline = await createRAGPipeline(vectorStore);
  console.log('initialize here 3');
}

initialize();

app.post('/chat', async (req: Request, res: Response) => {
  const { body } = req;
  
  if (!body?.message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  if (!ragPipeline) {
    res.status(500).json({ error: 'RAG pipeline not initialized' });
    return;
  }

  try {
    const response = await ragPipeline?.(body?.message);
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'An error occurred while processing your message' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});