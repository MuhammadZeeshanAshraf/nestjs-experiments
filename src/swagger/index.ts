import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JWT, PROJECT_NAME } from '../common/constants';

export async function getSwaggerConfiguration(
    app: NestFastifyApplication,
) {
    const title = `${PROJECT_NAME} Microservice`;
    const description = `The ${PROJECT_NAME} Microservice API description`;
    const version = '1.0';

    const config = new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            JWT
        )
        .addTag(PROJECT_NAME)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
