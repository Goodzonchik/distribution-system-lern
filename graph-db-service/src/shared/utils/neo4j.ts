export function match(
  entity: string,
  props: string,
  value: string,
  uid: string,
): string {
  return `MATCH (${uid}:${entity} {${props}: '${value}'})`;
}

export function returnOp(uid: string): string {
  return `RETURN ${uid}`;
}

export function creatRel(type: string, uidFrom: string, uidTo: string): string {
  return `CREATE (${uidFrom})-[:${type}]->(${uidTo})`;
}

export function cypherPipe(...operators): string {
  return operators.reduce((acc, operator) => acc + operator, '');
}

/* 
// Create node
CREATE (charlie:Person {name: 'Charlie'})

// Изменение параметров записи
MATCH (charlie:Person {name: 'Charlie'})
SET charlie.name = 'Peaty'

// Add label
MATCH (peaty:Person {name: 'Peaty'})
SET peaty:Male

// remove label
MATCH (peaty:Person {name: 'Peaty'})
REMOVE peaty:Male

// DELETE NODE WITH RELATIONSHIP
MATCH (node:<TYPE> {name: '<Name>'})
DETACH DELETE node
*/
