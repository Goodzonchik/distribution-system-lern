import { Injectable } from '@nestjs/common';
import { Neo4jConnectorService } from '../shared/neo4j-connector.service';

@Injectable()
export class UsersService {
  driver = this.neo4jConnectorService.getDriver();

  constructor(private readonly neo4jConnectorService: Neo4jConnectorService) {}

  getData() {
    return this.driver
      .rxSession()
      .run('MATCH p=()-[r:PARENT]->() RETURN p LIMIT 25')
      .records();
  }
}
