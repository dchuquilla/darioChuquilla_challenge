import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Challenge de Dario Chuquilla')
    .setDescription('Code challenge to show to BP by Dario Chuquilla')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // Perform automatic validations
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
