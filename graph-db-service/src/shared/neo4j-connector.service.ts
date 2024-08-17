import { Injectable } from '@nestjs/common';
import * as neo4j from 'neo4j-driver';

const connectionConfig = {
  uri: 'neo4j://localhost',
};

@Injectable()
export class Neo4jConnectorService {
  private driver = neo4j.driver(connectionConfig.uri);

  getDriver() {
    return this.driver;
  }

  closeConnection() {
    this.driver.close();
  }
}
