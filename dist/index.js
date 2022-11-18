'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const api_1 = __importDefault(require('./routes/api'));
// Creating express object
const app = (0, express_1.default)();
// Defining port number
const port = 3000;
// https://expressjs.com/en/starter/static-files.html
// Function to serve all static Images
app.use('/images', express_1.default.static('assets'));
app.use('/api', api_1.default);
app.get('/', (req, res) => {
  res.send(
    '<h1>Starting...</h1><h2 style="color:green;">please redirect to "/api/images"</h2>'
  );
});
// Server setup
app.listen(port, () => {
  console.log(`Running server on port ${port}...`);
});
exports.default = app;
