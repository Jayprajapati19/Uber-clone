# User Registration API Documentation

## Overview
The `/users/register` endpoint allows new users to register by providing their personal details. This endpoint validates the input data, stores the user information securely, and returns appropriate responses.



## Endpoints

### Register User
```
POST /users/register
```

#### Request Body
The request body must be in JSON format and include the following fields:

| Field        | Type     | Required | Description                                    |
|--------------|----------|----------|------------------------------------------------|
| fullname     | object   | Yes      | An object containing `firstname` and `lastname`|
| firstname    | string   | Yes      | User's first name (min 3 characters)           |
| lastname     | string   | No       | User's last name (min 3 characters)            |
| email        | string   | Yes      | User's email address (valid email format)      |
| password     | string   | Yes      | User's password (min 6 characters)             |

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "Welcome123"
}
```

#### Response

##### Success Response (201)
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

##### Error Responses

###### Validation Error (400)
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

###### Email Already Exists (409)
```json
{
  "status": "error",
  "message": "Email already exists"
}
```

###### Internal Server Error (500)
```json
{
  "status": "error",
  "message": "Internal server error occurred"
}
```

### Login User

The `/users/login` endpoint allows existing users to log in by providing their email and password. This endpoint validates the input data, checks the credentials, and returns appropriate responses.

```
POST /users/login
```

#### Request Body
The request body must be in JSON format and include the following fields:

| Field    | Type   | Required | Description                       |
|----------|--------|----------|-----------------------------------|
| email    | string | Yes      | User's email address              |
| password | string | Yes      | User's password                   |

#### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "Welcome123"
}
```

#### Response

##### Success Response (200)
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    
    "email": "john.doe@example.com"
  }
}
```

##### Error Responses

###### Validation Error (400)
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

###### Invalid Credentials (401)
```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

###### Internal Server Error (500)
```json
{
  "status": "error",
  "message": "Internal server error occurred"
}
```

## Example Usage

### cURL
```bash
curl -X POST https://api.example.com/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "Welcome123"
  }'
```

```bash
curl -X POST https://api.example.com/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "Welcome123"
  }'
```

### JavaScript (Fetch API)
```javascript
fetch('https://api.example.com/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: {
      firstname: 'John',
      lastname: 'Doe'
    },
    email: 'john.doe@example.com',
    password: 'Welcome123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```javascript
fetch('https://api.example.com/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'Welcome123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Notes
- Ensure the email address is unique.
- Passwords are hashed before storage for security.
- Use HTTPS for all API calls to ensure data security.