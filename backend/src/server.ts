import express from 'express';
import cors from 'cors';
import api from './routes/api.routes';


const app = express();

app.use(cors());

app.use(express.json());


app.get('/api/health', (_, res) =>
  res.json({
    status: 'ok'
  })
);


app.use('/api', api);


app.listen(3000, () =>
  console.log(
    'API running at http://localhost:3000'
  )
);