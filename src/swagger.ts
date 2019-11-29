import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger'

export function initSwagger(app: INestApplication): OpenAPIObject {
  const options = new DocumentBuilder()
  .setTitle("NestJS-Jumpstart API")
  .setDescription("API for NestJS-Jumpstart API application.")
  .setVersion('1.0')
  .addBearerAuth({
    "type": "http",
    "scheme": "bearer",
    "bearerFormat": "JWT",
  })
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  return document;
}
