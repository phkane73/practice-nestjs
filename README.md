# NESTJS APPLICATION

### FEATURES

- Insert User
- Update User
- Delete User
- Search User

### Insert User - Method POST

```
localhost:3000/user/insert

body: {
    username: "anle",
    fullname: "Le Dang Hoang An",
    role: "Developer",
    projects: ["D&D", "Tiger"],
    activeYn: "Y",
}

```

### Update User - Method PATCH

```
localhost:3000/user/update/:username

param: username

body: {
    username: "anle",
    fullname: "Le Dang Hoang An",
    role 'Teacher',
    projects: ['D&D', 'Tiger'],
    activeYn: 'Y',
}

```

### Delete User - Method DELETE

```
localhost:3000/user/delete/:username
```

### Search Users - Method GET

```
localhost:3000/user/search

query: {
    username,
    fullname,
    role,
    projects,
    activeYn
}

```
