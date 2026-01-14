# Address API Spec

## Create Address API

Endpoint : **POST** `/api/contacts/:contactId/addresses`

Headers :

- Authorization : token

Request Body :

```json
{
    "title": "Home Address",
    "street": "Jalan ABC",
    "city": "Kota DEF",
    "province": "Provisi GHI",
    "country": "Negara JKL",
    "postal_code": "12345"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "title": "Home Address",
        "street": "Jalan ABC",
        "city": "Kota DEF",
        "province": "Provisi GHI",
        "country": "Negara JKL",
        "postal_code": "12345"
    }
}
```

Response Body Error :

```json
{
    "errors": "Country is required"
}
```

## Update Address API

Endpoint : **PUT** `/api/contacts/:contactId/addresses/:addressId`

Headers :

- Authorization : token

Request Body :

```json
{
    "title": "Home Address",
    "street": "Jalan ABC",
    "city": "Kota DEF",
    "province": "Provisi GHI",
    "country": "Negara JKL",
    "postal_code": "12345"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "title": "Home Address",
        "street": "Jalan ABC",
        "city": "Kota DEF",
        "province": "Provisi GHI",
        "country": "Negara JKL",
        "postal_code": "12345"
    }
}
```

Response Body Error :

```json
{
    "errors": "Country is required"
}
```

## Get Address API

Endpoint : **GET** `/api/contacts/:contactId/addresses/:addressId`

Headers :

- Authorization : token

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "title": "Home Address",
        "street": "Jalan ABC",
        "city": "Kota DEF",
        "province": "Provisi GHI",
        "country": "Negara JKL",
        "postal_code": "12345"
    }
}
```

Response Body Error :

```json
{
    "errors": "Country is required"
}
```

## List Addresses API

Endpoint : **GET** `/api/contacts/:contactId/addresses`

Headers :

- Authorization : token

Response Body Success :

```json
{
    "data": [
        {
            "id": 1,
            "title": "Home Address",
            "street": "Jalan ABC",
            "city": "Kota DEF",
            "province": "Provisi GHI",
            "country": "Negara JKL",
            "postal_code": "12345"
        },
        {
            "id": 2,
            "title": "Work Address",
            "street": "Jalan ZYX",
            "city": "Kota WVU",
            "province": "Provisi TSR",
            "country": "Negara QPO",
            "postal_code": "98765"
        }
    ]
}
```

Response Body Error :

```json
{
    "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : **DELETE** `/api/contacts/:contactId/addresses/:addressId`

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
    "errors": "Address is not found"
}
```
