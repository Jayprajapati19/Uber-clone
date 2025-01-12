# API Documentation

## Overview
This documentation provides details about the API endpoints for user and captain registration, login, profile retrieval, and logout.

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

### Register Captain
```
POST /captains/register
```

#### Request Body
The request body must be in JSON format and include the following fields:

```json
{
  "fullname": {
    "firstname": "Jane", // Required, min 3 characters
    "lastname": "Doe" // Optional, min 3 characters
  },
  "email": "jane.doe@example.com", // Required, valid email format
  "password": "SecurePass123", // Required, min 6 characters
  "vehicle": {
    "color": "Red", // Required, min 3 characters
    "plate": "XYZ123", // Required, min 3 characters
    "capacity": 4, // Required, min 1
    "vehicleType": "car" // Required, one of ["car", "motorcycle", "auto"]
  }
}
```

#### Response

##### Success Response (201)
```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
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

### Login Captain
```
POST /captains/login
```

#### Request Body
The request body must be in JSON format and include the following fields:

```json
{
  "email": "jane.doe@example.com", // Required, valid email format
  "password": "SecurePass123" // Required, min 6 characters
}
```

#### Response

##### Success Response (200)
```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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

### Get User Profile
```
GET /users/profile
```

#### Headers
The request must include the following headers:

| Header        | Type   | Required | Description                       |
|---------------|--------|----------|-----------------------------------|
| Authorization | string | Yes      | Bearer token for authentication   |

#### Response

##### Success Response (200)
```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

##### Error Responses

###### Unauthorized (401)
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

###### Internal Server Error (500)
```json
{
  "status": "error",
  "message": "Internal server error occurred"
}
```

### Get Captain Profile
```
GET /captains/profile
```

#### Headers
The request must include the following headers:

| Header        | Type   | Required | Description                       |
|---------------|--------|----------|-----------------------------------|
| Authorization | string | Yes      | Bearer token for authentication   |

#### Response

##### Success Response (200)
```json
{
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

##### Error Responses

###### Unauthorized (401)
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

###### Internal Server Error (500)
```json
{
  "status": "error",
  "message": "Internal server error occurred"
}
```

### Logout User
```
GET /users/logout
```

#### Headers
The request must include the following headers:

| Header        | Type   | Required | Description                       |
|---------------|--------|----------|-----------------------------------|
| Authorization | string | Yes      | Bearer token for authentication   |

#### Response

##### Success Response (200)
```json
{
  "message": "Logged out successfully"
}
```

##### Error Responses

###### Bad Request (400)
```json
{
  "status": "error",
  "message": "Token not provided"
}
```

###### Internal Server Error (500)
```json
{
  "status": "error",
  "message": "Internal server error occurred"
}
```

### Logout Captain
```
GET logout
```

#### Headers
The request must include the following headers:

| Header        | Type   | Required | Description                       |
|---------------|--------|----------|-----------------------------------|
| Authorization | string | Yes      | Bearer token for authentication   |

#### Response

##### Success Response (200)
```json
{
  "message": "Logged out successfully"
}
```

##### Error Responses

###### Bad Request (400)
```json
{
  "status": "error",
  "message": "Token not provided"
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

```bash
curl -X GET https://api.example.com/users/profile \
  -H "Authorization: Bearer jwt_token_here"
```

```bash
curl -X GET https://api.example.com/users/logout \
  -H "Authorization: Bearer jwt_token_here"
```

```bash
curl -X POST https://api.example.comregister \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "SecurePass123",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

```bash
curl -X POST https://api.example.com/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "SecurePass123"
  }'
```

```bash
curl -X GET https://api.example.com/captains/profile \
  -H "Authorization: Bearer jwt_token_here"
```

```bash
curl -X GET https://api.example.com/captains/logout \
  -H "Authorization: Bearer jwt_token_here"
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

```javascript
fetch('https://api.example.com/users/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer jwt_token_here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```javascript
fetch('https://api.example.com/users/logout', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer jwt_token_here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```javascript
fetch('https://api.example.com/captains/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: {
      firstname: 'Jane',
      lastname: 'Doe'
    },
    email: 'jane.doe@example.com',
    password: 'SecurePass123',
    vehicle: {
      color: 'Red',
      plate: 'XYZ123',
      capacity: 4,
      vehicleType: 'car'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```javascript
fetch('https://api.example.com/captains/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'jane.doe@example.com',
    password: 'SecurePass123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```javascript
fetch('https://api.example.com/captains/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer jwt_token_here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```javascript
fetch('https://api.example.com/captains/logout', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer jwt_token_here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Notes
- Ensure the email address is unique.
- Passwords are hashed before storage for security.
- Use HTTPS for all API calls to ensure data security.