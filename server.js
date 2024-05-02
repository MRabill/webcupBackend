const app = require("./app");
const debug = require("debug")("rcap-express-skeleton:server");
const http = require("http");
const { Table } = require("console-table-printer");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", () => onListening(server));

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// const p = new Table({
//   columns: [
//     { name: "SERVER", alignment: "left" },
//     { name: "URL", alignment: "left", color: "blue" },
//     { name: "PORT", color: "red", alignment: "left" },
//     { name: "ENV", alignment: "left" },
//     { name: "DATABASE", alignment: "left" },
//     { name: "STATUS", color: "green", alignment: "left" },
//   ],
// });
function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  const port = bind.replace("port ", "");
  // p.addRow({
  //   SERVER: process.env.APP_NAME,
  //   URL: `http://localhost:${port}`,
  //   PORT: parseInt(port),
  //   ENV: process.env.NODE_ENV,
  //   DATABASE: process.env.DB_SERVER,
  //   STATUS: "RUNNING",
  // });
  // p.printTable();
  console.info(
    `${process.env.APP_NAME} listening on ${bind} in mode: ${process.env.NODE_ENV}, DB: ${process.env.HOSTIP} , URL: ${process.env.URL}`
  );
}
