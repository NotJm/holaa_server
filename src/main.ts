import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
  console.log('Main.ts is running!');  // Verifica que este mensaje aparece en los logs
  console.log(`Application is running on: http://localhost:3000`);

  
}
export default bootstrap;
bootstrap();
