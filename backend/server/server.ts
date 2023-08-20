import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a TypeScript interface for your article data
interface Article {
  title: string;
  authors: string[];
  source: string;
  publication_year: number;
  doi: string;
  summary: string;
  linked_discussion: string;
}

// Create a Mongoose model for articles
const ArticleModel = mongoose.model<Article>('Article', {
  title: String,
  authors: [String],
  source: String,
  publication_year: Number,
  doi: String,
  summary: String,
  linked_discussion: String,
});

// Handle form submission
app.post('/api/articles', async (req: Request, res: Response) => {
  try {
    const newArticle = new ArticleModel(req.body);

    const savedArticle = await newArticle.save();

    res.json(savedArticle);
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'An error occurred while saving the article.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
