const app = require('../app');

async function main() {
  app.listen(3000);
}

main().catch((err) => {
  process.exit(-1);
});