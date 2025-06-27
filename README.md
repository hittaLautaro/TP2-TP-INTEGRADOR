## Como probar el proyecto

---

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/hittaLautaro/TP2-TP-INTEGRADOR.git
   cd TP2-TP-INTEGRADOR
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Crear el .env en el root del proyecto**  
     ```bash
     PORT={COMPLETAR}
     MONGO_URL={COMPLETAR}
     PERSISTENCE=mongo <- DEJAR ASI
     JWT_SECRET={COMPLETAR}
     ```
     
4. **Correr la aplicación**  
   ```bash
   npm run watch
   ```
   
5. **Importar colección Postman para probar la API**  
   - Abrir Postman y seleccionar `Import`.  
   - Elige el archivo JSON de la colección que se encuentra en el root llamado [`postman.json`](./postman.json).  
   - Listo para usar los endpoints, recorda registrarte primero y despues loguearte para que se setee el accessToken.

---

---

## Entidades

---

# `User:`

- `_id`
- `name`
- `email`
- `password`
- `isActive`

# `Post:`

- `_id`
- `title`
- `content`
- `userId`

---

## Requests

---

#### Auth / Autenticación `(/auth)`

1. `(/signup) Signup request`

    Crea el nuevo usuario con `name`, `email`, `password` y `isActive = false`.

2. `(/login) Login request`

    Verifica `email` y `password`. Si están correctas, devuelve un `accessToken`.

3. `(/logout) Logout request`

    Invalida el token actual. No modifica datos del usuario.

---

#### Posts / Publicaciones `(/posts)`

Todos estos endpoints requieren autenticación con `accessToken`.

1. `(/) Find all posts`

    Devuelve una lista de posts.

2. `(/me) Find by logged user`

    Devuelve todos los posts creados por el usuario autenticado.

3. `(/:id) Find post by id`

    Devuelve un post por su `_id`.

4. `(/) Submit a post`

    Crea un nuevo post asociado al usuario autenticado.

5. `(/:id) Update (PUT) a post (Only yours)`

    Reemplaza completamente un post existente. Solo permitido si pertenece al usuario autenticado.

6. `(/:id) Update (PATCH) a post (Only yours)`

    Actualiza parcialmente un post existente. Solo permitido si pertenece al usuario autenticado.

7. `(/:id) Delete a post (Only yours)`

    Elimina un post existente. Solo permitido si pertenece al usuario autenticado.

---

#### Account / Cuenta `(/account)`

1. `(/delete) Delete your account`

    Elimina al usuario autenticado y todos sus datos. Requiere `password` en el body. Esto elimina todos sus posts.

---
