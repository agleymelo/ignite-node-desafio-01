import http from "node:http";
import { randomUUID } from "node:crypto";

const tasks = [];

const server = http.createServer(async (request, response) => {
  const buffers = [];

  for await (const chunk of buffers) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  response.setHeader("Content-Type", "application/json");

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
