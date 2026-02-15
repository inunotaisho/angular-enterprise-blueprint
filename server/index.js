const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const app = express();

const staticRoot = path.resolve(__dirname, '../dist/angular-enterprise-blueprint/browser');
const port = process.env.PORT || 3000;

// threshold controls compressing based on file size. Let's not do that
// WARNING: The order matters here...compression must come before express.static
app.use(compression({ threshold: 0 }));
app.use(express.static(staticRoot, { maxAge: '365d' }));

app.use(function (req, res) {
  res.status(404);
  fs.createReadStream(path.join(staticRoot, '/index.html')).pipe(res);
});

app.listen(port, () => {
  console.log(`Portfolio listening on port ${port}`);
});
