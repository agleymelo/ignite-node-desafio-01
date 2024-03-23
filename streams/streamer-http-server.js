import { parse } from "csv-parse";
import fs from 'node:fs'

const CSV = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(CSV);

const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});

async function run() {
  const lines = stream.pipe(csvParse);

  for await (const row of lines) {
    const [title, description] = row

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
  }
}

run()
