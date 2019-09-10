const server = require("./api/server");

const port = 7000;
server.listen(port, () => {
  console.log(`Server Listening on Port: ${port}`);
});
