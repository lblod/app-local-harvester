# app-local-harvester

## wip

### Authentication

By default this application requires authentication. You can generate a migration to add a user account by using [mu-cli](https://github.com/mu-semtech/mu-cli) and running the included project script.

```sh
 mu script project-scripts generate-account
```

This should generate a migration for you to add the user account.
Afterwards make sure to restart the migration service to execute the migration

```sh
docker compose restart migrations
```

If you wish to run this application without authentication, this is also possible. You'll need to make the following changes:

```diff
#config/authorization/config.ex
       %GroupSpec{
         name: "harvesting",
         useage: [:write, :read_for_write, :read],
-        access: logged_in_user(),
+        access: %AlwaysAccessible{},
```

```diff
#docker-compose.yml
  identifier:
    environment:
-      DEFAULT_MU_AUTH_ALLOWED_GROUPS_HEADER: '[{"variables":[],"name":"public"},{"variables":[],"name":"clean"}]'
+      DEFAULT_MU_AUTH_ALLOWED_GROUPS_HEADER: '[{"variables":[],"name":"public"},{"variables":[],"name":"harvesting"}, {"variables":[],"name":"clean"}]'
  frontend:
    environment
-     EMBER_AUTHENTICATION_ENABLED: "true"
+     EMBER_AUTHENTICATION_ENABLED: "false"
```
