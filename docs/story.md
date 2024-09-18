# User story

## Создание пользователя

Создание пользователя
Сперва сохраняем все данные в PostgreSQL включая relationship
Создаем запись в бд + добавляем версию = 1 + генерируем сквозной uuid

Далее синхронизируем данные через очередь в графовую бд

```mermaid
sequenceDiagram
    actor User;

    participant ClientApp;
    participant ReverseProxy;

    participant SqlDbService;
    participant BusQueue;
    participant GraphDbService;


    User->>ClientApp: send form data;
    ClientApp->>ReverseProxy: send form form;

    ReverseProxy->>SqlDbService: create new user, create uuid;

    SqlDbService->>ReverseProxy: return uuid and data;

    SqlDbService-->>BusQueue: set data to sync with graph db;
    BusQueue-->>GraphDbService: set data to sync with graph db;

    ReverseProxy->>ClientApp: new user with uuid;
```

## Поиск пользователей [WIP]

```mermaid
sequenceDiagram
    actor User;

    participant ClientApp;
    participant ReverseProxy;
    participant Bus;

    participant SqlDbService;
    participant GraphDbService;
    participant FileStorageService;

    User->>ClientApp: send form data;
    ClientApp->>ReverseProxy: send form form;
    ReverseProxy->>Bus: proxy form data;

    Bus->>Bus: create uuid for new user;

    Bus->>SqlDbService: create new user;
    SqlDbService->>Bus: success create user;

    Bus->>GraphDbService: create user relationship;
    GraphDbService->>Bus: success create user relationship;

    Bus->>FileStorageService: add user avatar;
    FileStorageService->>Bus: success user avatar;

    Bus->>ClientApp: user page;
    ClientApp->>User: user page;
```
