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




```mermaid
C4Context

title Distribution system learn (C1 Level)

Person(Admin, "Admin")
Person_Ext(User, "User")

BiRel(User, web_client_app, "work in app")
BiRel(User, mobile_client_app, "work in app")

BiRel(Admin, admin_client_app, "work in app")

System_Ext(notification_service, "Notification")
Rel(notification_service, User, "Send notification <br/> and push")

Boundary(system, "System") {
    System(admin_client_app, "ADMIN APP")
    System(web_client_app, "CLIENT APP")
    System(mobile_client_app, "CLIENT APP")
    

    SystemDb(database, "Database")

    System(backend, "Backend")
    
    BiRel(admin_client_app, backend, "work in app")
    BiRel(web_client_app, backend, "work in app")
    BiRel(mobile_client_app, backend, "work in app")
    
    Rel(backend, notification_service, "Send notification <br/> and push")
    BiRel(backend, database, "CRUD")

 UpdateLayoutConfig($systemShapeInRow="3", $systemBoundaryInRow="1")
 
     UpdateRelStyle(backend, notification_service, $textColor="red", $offsetY="-00")
}
```
