const _ = require('lodash');
const swaggerCombine = require('swagger-combine');
const sway = require('sway');

async function initSwagger() {
  const swaggerIndex = `${__dirname}/swagger/index.yml`;
  const content = await swaggerCombine(swaggerIndex);
  return await sway.create({
    definition: content
  });
}

function swaggerMiddleware(swayInstance) {
  return async function (ctx, next) {
    const operation = swayInstance.getOperation(ctx.path, ctx.method);
    if (!operation) {
      console.log(`${ctx.method} ${ctx.path} swagger definition not found`);
      return next();
    }
    const requestValidationResult = operation.validateRequest(ctx.request);
    if (requestValidationResult.errors.length > 0) {
      console.log(requestValidationResult);
      throw new Error(requestValidationResult);
    }
    if (requestValidationResult.warnings.length > 0) {
      console.warn('Swagger validation warning:', requestValidationResult.warnings);
    }
    await next();
    const responseSchema = operation.getResponse(ctx.status);
    if (!responseSchema) {
      console.log("Swagger response schema not found");
      return;
    }
    responseSchema.definitionFullyResolved.schema = _.get(responseSchema, `definitionFullyResolved.content.${ctx.type}.schema`);
    const responseValidationResult = responseSchema.validateResponse({
      body: ctx.response.body,
      encoding: 'utf-8',
      headers: ctx.response.headers,
      statusCode: ctx.status
    });
    if (responseValidationResult.errors.length > 0) {
      console.log(responseValidationResult);
      throw new Error(responseValidationResult);
    }
    if (responseValidationResult.warnings.length > 0) {
      console.warn('Swagger validation warning:', responseValidationResult.warnings);
    }
  }
}

module.exports.initSwagger = initSwagger;
module.exports.swaggerMiddleware = swaggerMiddleware;