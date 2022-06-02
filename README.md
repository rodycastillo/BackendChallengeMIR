# FAVS API

Mission Favorites Challenge


## Install

    npm install

## Run the app

    npm start

# REST API

The REST API to the example app is described below.

## Register User

### Request

`POST /auth/local/register`

    curl -i -H 'Accept: application/json' http://localhost:8080/auth/local/register

    {
        "username": "xxxx xxxx",
        "email": "xxx@xxx.xx",
        "password": "xxxxxx"
    }

### Response

    POST /auth/local/register 201 261 - 153.782 ms
    {
    "success": true,
    "user": {
        "email": "xxxx@xxxx.xx",
        "password": "U2FsdGVkX181BTX7UQUrO9JssbKAKyBx76l+nFD5i2w=",
        "username": "xxxxxx",
        "favs": [],
        "_id": "62982a22a5136de7d720b84f",
        "createdAt": "2022-06-02T03:10:26.402Z",
        "updatedAt": "2022-06-02T03:10:26.402Z",
        "__v": 0
    }
    }

## Login User

### Request

`POST /auth/local/login`

    curl -i -H 'Accept: application/json' http://localhost:8080/auth/local/login

    {
        "email": "xxxx@xxx.xx",
        "password": "xxxxx"
    }

### Response

    POST /auth/local/login 200 361 - 310.618 ms
    
    {
        "_id": "62982a22a5136de7d720b84f",
        "email": "xxxx@xxx.xx",
        "username": "xxxxxx",
        "favs": [],
        "createdAt": "2022-06-02T03:10:26.402Z",
        "updatedAt": "2022-06-02T03:10:26.402Z",
        "__v": 0,
        "token": "xxx...xxx"
    }

## Create New Fav

### Request

`POST /api/favs`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/favs

    headers: {
        "token": "Bearer xxx...xxx"
    }

    {
        "userId": "62982a22a5136de7d720b84f",
        "title": "My next keyboard",
        "description": "I would like to buy",
        "link": "xxxxx"
    }

### Response

    POST /api/favs 201 583 - 421.138 ms

    {
        "success": true,
        "fav": {
            "title": "My next keyboard",
            "description": "I would like to buy",
            "link": "xxxxx",
            "date": "2022-06-02T03:22:13.975Z",
            "user": "62982a22a5136de7d720b84f",
            "_id": "62982ce5a5136de7d720b855",
            "createdAt": "2022-06-02T03:22:13.979Z",
            "updatedAt": "2022-06-02T03:22:13.979Z",
            "__v": 0
        }
    }

## Get Single Fav

### Request

`GET /api/favs/id`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/favs/62630cd7094502e4bc55e4a1

    headers: {
        "token": "Bearer xxx...xxx"
    }

### Response

    GET /api/favs/62982ce5a5136de7d720b855 201 583 - 114.572 ms
    {
        "success": true,
        "fav": {
            "title": "My next keyboard",
            "description": "I would like to buy",
            "link": "xxxxx",
            "date": "2022-06-02T03:22:13.975Z",
            "user": "62982a22a5136de7d720b84f",
            "_id": "62982ce5a5136de7d720b855",
            "createdAt": "2022-06-02T03:22:13.979Z",
            "updatedAt": "2022-06-02T03:22:13.979Z",
            "__v": 0
        }
    }

## Get All Favs

### Request

`GET /api/favs`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/favs

    headers: {
        "token": "Bearer xxx...xxx"
    }

### Response

    GET /api/favs 201 823 - 560.485 ms
    
    {
        "success": true,
        "favs": [
            {
                "_id": "62982ce5a5136de7d720b855",
                "title": "My next keyboard",
                "description": "I would like to buy",
                "link": "xxxxx",
                "date": "2022-06-02T03:22:13.975Z",
                "user": {
                    "_id": "62982a22a5136de7d720b84f",
                    "email": "carlo123@122.com",
                    "password": "U2FsdGVkX181BTX7UQUrO9JssbKAKyBx76l+nFD5i2w=",
                    "username": "CarloXos",
                    "favs": [
                        "62982ce5a5136de7d720b855"
                    ],
                    "createdAt": "2022-06-02T03:10:26.402Z",
                    "updatedAt": "2022-06-02T03:22:14.120Z",
                    "__v": 1
                },
                "createdAt": "2022-06-02T03:22:13.979Z",
                "updatedAt": "2022-06-02T03:22:13.979Z",
                "__v": 0
            }
        ]
    }

## Delete Fav

### Request

`DELETE /api/favs/id`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/favs/62982ce5a5136de7d720b855

### Response

    DELETE /api/favs/62982ce5a5136de7d720b855 204 - - 110.226 ms

    { 
        "success": true, 
        "message": "Fav deleted" 
    }

