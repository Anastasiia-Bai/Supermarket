const express = require("express");
const server = express();
const productsController = require("./controllers/products-controller");
const usersController = require("./controllers/users-controller");
const errorHandler = require("./errors/error-handler");
const loginFilter = require("./login-filter");
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');

server.use(cors({ origin: "http://localhost:4200" }));
server.use(express.json());
server.use("/products", productsController);
server.use("/users", usersController);
server.use("/images", express.static(__dirname + "/images"));

server.post('/images', (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req);

  form.on('fileBegin', function (name, file) {
    file.filepath = __dirname + '/images/' + file.originalFilename;
  });

  form.on('file', function (name, file) {
    res.send("file successfully uploaded");
  });

  res.sendFile(__dirname + '/images');
});

server.post("/receiptFile", async (req, res) => {
  const { content } = req.body;
  console.log(req.body)

  fs.writeFile('Receipt.txt', content, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
      res.status(201).send('File is created successfully.');
  });

});

server.get('/downloadReceip', function (req, res) {
  const file = `${__dirname}/Receipt.txt`;
  res.download(file, "Receipt.txt");
});

server.use(loginFilter);
server.use(errorHandler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));