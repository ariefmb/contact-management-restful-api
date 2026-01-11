# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
    "fist_name": "Arief",
    "last_name": "Budiman",
    "email": "arief@test.com",
    "phone": "931381321"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "fist_name": "Arief",
        "last_name": "Budiman",
        "email": "arief@test.com",
        "phone": "931381321"
    }
}
```

Response Body Error :

```json
{
    "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : **PUT** `/api/contacts/:contactId`

Headers :

- Authorization : token

Request Body :

```json
{
    "fist_name": "Arief",
    "last_name": "Budiman",
    "email": "arief@test.com",
    "phone": "931381321"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "fist_name": "Arief",
        "last_name": "Budiman",
        "email": "arief@test.com",
        "phone": "931381321"
    }
}
```

Response Body Error :

```json
{
    "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : **GET** `/api/contacts/:contactId`

Headers :

- Authorization : token

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "fist_name": "Arief",
        "last_name": "Budiman",
        "email": "arief@test.com",
        "phone": "931381321"
    }
}
```

Response Body Error :

```json
{
    "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : **POST** `/api/contacts`

Headers :

- Authorization : token

Query params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email, using like, optional
- phone : Search by phone, using like, optional
- page : Number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data": [
        {
            "id": 1,
            "fist_name": "Arief",
            "last_name": "Budiman",
            "email": "arief@test.com",
            "phone": "931381321"
        },
        {
            "id": 2,
            "fist_name": "Dubi",
            "last_name": "Dubido",
            "email": "dubi@test.com",
            "phone": "931321121"
        }
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_item": 30
    }
}
```

Response Body Error :

```json
{
    "errors": "Contact is not found"
}
```

## Remove Contact API

Endpoint : **DELETE** `/api/contacts/:contactId`

Headers :

- Authorization : token

Response Body Success :

```json
{
    "data": "OK"
}
```

Response Body Error :

```json
{
    "errors": "Contact is not found"
}
```
