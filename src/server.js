import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";

const tasks = [];

const server = http.createServer(async (request, response) => {
  await json(request, response);

  if (request.method === "GET" && request.url === "/tasks") {
    return response.writeHead(200).end(JSON.stringify(tasks));
  }

  if (request.method === "POST" && request.url === "/tasks") {
    const { title, description } = request.body;

    if (title || description) {
      throw new Error("Preencha todos os campos para criar uma nova tarefa");
    }

    tasks.push({
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    return response.writeHead(201).end();
  }

  return response.end("Hello World");
});

server.listen(3333);
