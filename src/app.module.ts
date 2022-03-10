import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@app/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import graphqlConfig from '@app/config/graphql.config';
import typeormConfig from '@app/config/typeorm.config';
import { UsersService } from './users/services/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    GraphQLModule.forRoot(graphqlConfig),
    UsersModule
  ]
})
export class AppModule {
}
