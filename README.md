# distribution-system-lern


docker images

1. auth keycloak
2. balanser
3. s3 (minio)
- backet for files
- backet for frontend static
4. neo4j
5. pstgreSQL|noSQL


backends:

1. files storage
2. db graph adapter
3. postgress adapter


USE merminds as build-in C4-documentation




The following code-block will be rendered as a Mermaid diagram:

```mermaid
C4Context

title Distribution system lern

Person_Ext(UnauthPerson, "UnAuthPerson", "Person without auth")
Person(AuthPerson, "AuthPerson", "Person with auth")

System_Ext(CDN, "CDN for apps static <br> (s3 backet wih static)")

Rel(UnauthPerson, CDN, "Get app static")
Rel(AuthPerson, CDN, "Get app static")
Rel(UnauthPerson, api_gateway, "open app")
Rel(AuthPerson, api_gateway, "auth")

Boundary(system, "SystemBoundary") {
    System(api_gateway, "API GATEWAY + Balancer")
    System(auth_service, "KEYCLOACK or etc")

    Boundary("graph db", "Seaching user relationship service"){
        System(graph_db_service, "Service for work with neo4j")
        SystemDb(graph_db, "Neo4j instance for write")

        BiRel(graph_db_service, graph_db, "crud data")
    }
    


    BiRel(api_gateway, auth_service, "Cheeck auth <br> return token")
}
```
