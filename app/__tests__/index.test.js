const swagger = require('../swagger');
describe("Test sway", () => {
  test("Should init complete", async () => {
    const api = await swagger.initSwagger();
    console.log(api)
  })
});