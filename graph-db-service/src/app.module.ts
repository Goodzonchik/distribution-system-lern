import { Module } from '@nestjs/common';
import { Neo4jConnectorService } from './shared/neo4j-connector.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [UsersModule, FilesModule],
  providers: [Neo4jConnectorService],
})
export class AppModule {}
