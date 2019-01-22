const createApp = require('../app');

async function main() {
  const app = await createApp();
  app.listen(3000);
}

main().catch((err) => {
  console.log(err);
  process.exit(-1);
});