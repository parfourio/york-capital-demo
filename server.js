const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const CANONICAL = 'yorkcapital.parfour.io';

app.use((req, res, next) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  const proto = req.headers['x-forwarded-proto'] || 'https';

  if (host && !host.includes(CANONICAL)) {
    return res.redirect(301, 'https://' + CANONICAL + req.url);
  }
  if (proto === 'http') {
    return res.redirect(301, 'https://' + CANONICAL + req.url);
  }
  next();
});

app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
