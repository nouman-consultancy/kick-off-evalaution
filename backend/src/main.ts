import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("AI Consultancy API")
    .setDescription("API documentation for the AI Consultancy Backend")
    .setVersion("1.0.0")
    .addTag("Leads", "Lead management endpoints")
    .addTag("Pricing", "Pricing plans endpoints")
    .addTag("Services", "Services endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(3001);
}

void bootstrap();
