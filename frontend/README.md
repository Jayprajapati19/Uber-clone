# Uber Clone Frontend

This is the frontend for the Uber Clone application built with React and Vite. It provides a user interface for both users and captains to interact with the Uber Clone backend API.

## Features

### User Features

1. **User Registration**
   - Endpoint: `/users/register`
   - Method: `POST`
   - Request Body:
     - `fullname.firstname` (string, required): Min 3 characters.
     - `fullname.lastname` (string, optional): Min 3 characters.
     - `email` (string, required): Must be a valid email.
     - `password` (string, required): Min 6 characters.
   - Response:
     - `201 Created`: Returns a token and user details.
     - `400 Bad Request`: Validation errors.

2. **User Login**
   - Endpoint: `/users/login`
   - Method: `POST`
   - Request Body:
     - `email` (string, required): Must be valid.
     - `password` (string, required): Must not be empty.
   - Response:
     - `200 OK`: Returns a token and user details.
     - `400/401`: Invalid credentials.

3. **User Profile**
   - Endpoint: `/users/profile`
   - Method: `GET`
   - Headers:
     - `Authorization` (string, required): Bearer token.
   - Response:
     - `200 OK`: Returns user details.
     - `401 Unauthorized`: Invalid or expired token.

4. **User Logout**
   - Endpoint: `/users/logout`
   - Method: `GET`
   - Headers:
     - `Authorization` (string, required): Bearer token.
   - Response:
     - `200 OK`: Successfully logged out.
     - `401 Unauthorized`: Invalid or expired token.

### Captain Features

1. **Captain Registration**
   - Endpoint: `/captains/register`
   - Method: `POST`
   - Request Body:
     - `fullname.firstname` (string, required): Min 3 characters.
     - `fullname.lastname` (string, optional): Min 3 characters.
     - `email` (string, required): Must be a valid email.
     - `password` (string, required): Min 6 characters.
     - `vehicle.color` (string, required): Min 3 characters.
     - `vehicle.plate` (string, required): Min 3 characters.
     - `vehicle.capacity` (number, required): Min value 1.
     - `vehicle.vehicleType` (string, required): Must be one of `car`, `motorcycle`, or `auto`.
   - Response:
     - `201 Created`: Returns a token and captain details.
     - `400 Bad Request`: Validation errors or captain already exists.

2. **Captain Login**
   - Endpoint: `/captains/login`
   - Method: `POST`
   - Request Body:
     - `email` (string, required): Must be valid.
     - `password` (string, required): Must not be empty.
   - Response:
     - `200 OK`: Returns a token and captain details.
     - `400/401`: Invalid credentials.

3. **Captain Profile**
   - Endpoint: `/captains/profile`
   - Method: `GET`
   - Headers:
     - `Authorization` (string, required): Bearer token or valid cookie.
   - Response:
     - `200 OK`: Returns captain profile details.
     - `401 Unauthorized`: Invalid or expired token.

4. **Captain Logout**
   - Endpoint: `/captains/logout`
   - Method: `GET`
   - Headers:
     - `Authorization` (string, required): Bearer token or valid cookie.
   - Response:
     - `200 OK`: Successfully logged out.
     - `401 Unauthorized`: Invalid or expired token.
     - `401 Unauthorized`: Token is blacklisted.

### Ride Features

1. **Create Ride**
   - Endpoint: `/rides/create`
   - Method: `POST`
   - Request Body:
     - `pickup` (string, required): Min 3 characters.
     - `destination` (string, required): Min 3 characters.
     - `vehicleType` (string, required): Must be one of `auto`, `car`, `moto`.
   - Response:
     - `201 Created`: Returns ride details.
     - `400 Bad Request`: Validation errors.

2. **Get Fare**
   - Endpoint: `/rides/get-fare`
   - Method: `GET`
   - Query Parameters:
     - `pickup` (string, required): Min 3 characters.
     - `destination` (string, required): Min 3 characters.
   - Response:
     - `200 OK`: Returns fare details.
     - `400 Bad Request`: Validation errors.

3. **Confirm Ride**
   - Endpoint: `/rides/confirm`
   - Method: `POST`
   - Request Body:
     - `rideId` (string, required): Must be a valid MongoDB ObjectId.
     - `captainId` (string, required): Must be a valid MongoDB ObjectId.
   - Response:
     - `200 OK`: Returns ride details.
     - `400 Bad Request`: Validation errors.

4. **Start Ride**
   - Endpoint: `/rides/start-ride`
   - Method: `POST`
   - Request Body:
     - `rideId` (string, required): Must be a valid MongoDB ObjectId.
     - `otp` (string, required): Must be 6 characters.
   - Response:
     - `200 OK`: Returns ride details.
     - `400 Bad Request`: Validation errors.

5. **End Ride**
   - Endpoint: `/rides/end-ride`
   - Method: `POST`
   - Request Body:
     - `rideId` (string, required): Must be a valid MongoDB ObjectId.
   - Response:
     - `200 OK`: Returns ride details.
     - `400 Bad Request`: Validation errors.

### Map Features

1. **Get Coordinates**
   - Endpoint: `/maps/get-coordinates`
   - Method: `GET`
   - Query Parameters:
     - `address` (string, required): Min 3 characters.
   - Response:
     - `200 OK`: Returns coordinates.
     - `400 Bad Request`: Validation errors.
     - `404 Not Found`: Coordinates not found.

2. **Get Distance and Time**
   - Endpoint: `/maps/get-distance-time`
   - Method: `GET`
   - Query Parameters:
     - `origin` (string, required): Min 3 characters.
     - `destination` (string, required): Min 3 characters.
   - Response:
     - `200 OK`: Returns distance and time.
     - `400 Bad Request`: Validation errors.
     - `500 Internal Server Error`: Internal server error.

3. **Get AutoComplete Suggestions**
   - Endpoint: `/maps/get-suggestions`
   - Method: `GET`
   - Query Parameters:
     - `input` (string, required): Min 3 characters.
   - Response:
     - `200 OK`: Returns suggestions.
     - `400 Bad Request`: Validation errors.
     - `500 Internal Server Error`: Internal server error.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
