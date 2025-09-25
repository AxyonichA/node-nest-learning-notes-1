import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appCreate } from './app.create'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	appCreate(app)

  await app.listen(process.env.PORT ?? 5173);
}
bootstrap();
