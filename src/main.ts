import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { getSwaggerConfiguration } from './swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService: ConfigService = app.get(ConfigService);
  await getSwaggerConfiguration(app);
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
