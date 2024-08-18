import { Injectable } from '@nestjs/common';
import { Neo4jConnectorService } from '../shared/neo4j-connector.service';

@Injectable()
export class UsersService {
  driver = this.neo4jConnectorService.getDriver();

  constructor(private readonly neo4jConnectorService: Neo4jConnectorService) {}

  async getData() {
    const { records, summary, keys } = await this.driver.executeQuery(
      'MATCH (n:Person) RETURN n LIMIT 25',
    );

    return { records, summary, keys };
  }
}
