import { spawn } from "child_process";
import chokidar from "chokidar";

const watchPaths = ["server"];

const command = "bun";
const args = ["server/server.ts"];

let child: ReturnType<typeof spawn> | null = null;

function run() {
  if (child) {
    console.log("🔄 Перезапуск...");
    child.kill();
  }

  child = spawn(command, args, {
    stdio: "inherit",
    shell: true,
  });
}

const watcher = chokidar.watch(watchPaths, {
  ignoreInitial: true,
});

watcher.on("all", (event, path) => {
  console.log(`📁 ${event}: ${path}`);
  run();
});

console.log("👀 Watching files...");
run();
