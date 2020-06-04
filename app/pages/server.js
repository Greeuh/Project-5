import { createServer } from 'https';
import { parse } from 'url';
import { readFileSync } from 'fs';
import next from 'next';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync('/etc/letsencrypt/live/projet5ocr.antoineparriaud.fr/fullchain.pem'),
  cert: readFileSync('/etc/letsencrypt/live/projet5ocr.antoineparriaud.fr/privkey.pem')
};

app.prepare()
  .then(() => {
    createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    })
  });