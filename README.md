# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/users/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).



## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token## `/captains/register` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters)
  - `lastname` (string, optional): Captain's last name
- `email` (string, required): Captain's email address (must be a valid email)
- `password` (string, required): Captain's password (minimum 6 characters)
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters)
  - `plate` (string, required): Vehicle plate number (minimum 3 characters)
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1)
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto')

### Example Response


## `/captains/register` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters).
  - `lastname` (string, optional): Captain's last name (minimum 3 characters).
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters).
  - `plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1).
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto').

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/login` Endpoint

### Description

Authenticates a captain using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/captains/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.

## `/captains/logout` Endpoint

### Description

Logout the current captain and blacklist the token provided in cookie or headers.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie.

### Example Response

- `message` (string): Logout successfully.


## `/maps/get-coordinates` Endpoint

### Description

Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method

`GET`

### Request Parameters

- `address` (string, required): The address for which to retrieve coordinates.

### Example Request

GET `/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`

### Example Response

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error Response

- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.

```json
{
  "message": "Coordinates not found"
}
```

## `/maps/get-distance-time` Endpoint

### Description

Retrieves the distance and estimated travel time between two locations.

### HTTP Method

`GET`

### Request Parameters

- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

### Example Request

```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

### Example Response

```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

### Error Response

- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.

```json
{
  "message": "No routes found"
}
```

## `/maps/get-suggestions` Endpoint

### Description

Retrieves autocomplete suggestions for a given input string.

### HTTP Method

`GET`

### Request Parameters

- `input` (string, required): The input string for which to retrieve suggestions.

### Example Request

```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Example Response

```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

### Error Response

- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.

```json
{
  "message": "Unable to fetch suggestions"
}
```

## `/rides/create` Endpoint

### Description

Creates a new ride with the provided information.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

### Example Response

- `ride` (object):
  - `user` (string): User ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Fare amount.
  - `status` (string): Ride status.
  - `duration` (number): Duration in seconds.
  - `distance` (number): Distance in meters.
  - `otp` (string): OTP for the ride.

### Error Response

- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.

```json
{
  "message": "Error message"
}
```


## `/rides/get-fare` Endpoint

### Description

Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization:

 Bear

er <token>`

### Request Parameters

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Example Request

```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Example Response

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

### Error Response

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```
# 🛠️ Admin Backend API Documentation

## `/admin/login` Endpoint

### Description

Authenticates an admin using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): Admin’s email address (must be a valid email).
- `password` (string, required): Admin’s password (minimum 6 characters).

### Example Response

```json
{
  "admin": {
    "_id": "admin12345",
    "email": "admin@nammaride.com",
    "role": "superadmin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
}
Error Response
json
Copy code
{
  "message": "Invalid email or password"
}
/admin/profile Endpoint
Description
Retrieves the profile information of the currently authenticated admin.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header:
Authorization: Bearer <token>

Example Response
json
Copy code
{
  "admin": {
    "_id": "admin12345",
    "email": "admin@nammaride.com",
    "role": "superadmin",
    "createdAt": "2025-03-10T12:00:00.000Z"
  }
}
Error Response
json
Copy code
{
  "message": "Unauthorized - Invalid or missing token"
}
/admin/logout Endpoint
Description
Logs out the currently authenticated admin and blacklists the provided JWT token.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header or cookie.

Example Response
json
Copy code
{
  "message": "Admin logged out successfully"
}
/admin/get-users Endpoint
Description
Fetches all registered users in the system.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header.

Example Response
json
Copy code
[
  {
    "_id": "user123",
    "fullname": { "firstname": "Ravi", "lastname": "Kumar" },
    "email": "ravi@example.com",
    "status": "active",
    "createdAt": "2025-04-10T10:00:00Z"
  },
  {
    "_id": "user124",
    "fullname": { "firstname": "Sneha", "lastname": "Patil" },
    "email": "sneha@example.com",
    "status": "active",
    "createdAt": "2025-04-15T09:30:00Z"
  }
]
Error Response
json
Copy code
{
  "message": "Failed to fetch users"
}
/admin/get-captains Endpoint
Description
Retrieves all registered captains from the system.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header.

Example Response
json
Copy code
[
  {
    "_id": "captain001",
    "fullname": { "firstname": "Rajesh", "lastname": "Naik" },
    "email": "rajesh@example.com",
    "vehicle": {
      "color": "White",
      "plate": "KA05AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "verified": true
  },
  {
    "_id": "captain002",
    "fullname": { "firstname": "Anita", "lastname": "Sharma" },
    "email": "anita@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "KA03CD5678",
      "capacity": 2,
      "vehicleType": "auto"
    },
    "verified": false
  }
]
Error Response
json
Copy code
{
  "message": "Failed to retrieve captains"
}
/admin/verify-captain/:id Endpoint
Description
Verifies or rejects a captain's registration request.

HTTP Method
PUT

Authentication
Requires a valid JWT token in the Authorization header.

Request Parameters
id (string, required): The ID of the captain to verify.

Request Body
json
Copy code
{
  "verified": true
}
Example Response
json
Copy code
{
  "message": "Captain verified successfully",
  "captain": {
    "_id": "captain001",
    "fullname": { "firstname": "Rajesh", "lastname": "Naik" },
    "verified": true
  }
}
Error Response
json
Copy code
{
  "message": "Captain not found"
}
/admin/delete-user/:id Endpoint
Description
Deletes a user account from the system by ID.

HTTP Method
DELETE

Authentication
Requires a valid JWT token in the Authorization header.

Request Parameters
id (string, required): The ID of the user to delete.

Example Response
json
Copy code
{
  "message": "User deleted successfully"
}
Error Response
json
Copy code
{
  "message": "User not found"
}
/admin/delete-captain/:id Endpoint
Description
Deletes a captain account from the system by ID.

HTTP Method
DELETE

Authentication
Requires a valid JWT token in the Authorization header.

Request Parameters
id (string, required): The ID of the captain to delete.

Example Response
json
Copy code
{
  "message": "Captain deleted successfully"
}
Error Response
json
Copy code
{
  "message": "Captain not found"
}
/admin/get-all-rides Endpoint
Description
Retrieves all rides (completed, active, and cancelled) for admin monitoring.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header.

Example Response
json
Copy code
[
  {
    "_id": "ride123",
    "user": "user123",
    "captain": "captain001",
    "pickup": "Majestic, Bangalore",
    "destination": "Indiranagar, Bangalore",
    "fare": 180,
    "status": "completed",
    "date": "2025-05-12T10:30:00Z"
  },
  {
    "_id": "ride124",
    "user": "user124",
    "captain": "captain002",
    "pickup": "BTM Layout",
    "destination": "Electronic City",
    "fare": 120,
    "status": "ongoing",
    "date": "2025-05-13T11:45:00Z"
  }
]
Error Response
json
Copy code
{
  "message": "Unable to fetch ride data"
}
/admin/get-dashboard-stats Endpoint
Description
Provides overall system statistics for the admin dashboard.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header.

Example Response
json
Copy code
{
  "totalUsers": 240,
  "totalCaptains": 85,
  "verifiedCaptains": 70,
  "totalRides": 350,
  "completedRides": 280,
  "cancelledRides": 20,
  "activeRides": 50
}
Error Response
json
Copy code
{
  "message": "Failed to load dashboard statistics"
}
/admin/get-feedback Endpoint
Description
Retrieves all feedback and complaints submitted by users or captains.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header.

Example Response
json
Copy code
[
  {
    "_id": "feedback001",
    "user": "user123",
    "message": "Captain was late by 10 minutes",
    "createdAt": "2025-05-11T09:00:00Z"
  },
  {
    "_id": "feedback002",
    "captain": "captain001",
    "message": "User cancelled the ride midway",
    "createdAt": "2025-05-12T14:30:00Z"
  }
]
Error Response
json
Copy code
{
  "message": "No feedback found"
}
/admin/respond-feedback/:id Endpoint
Description
Allows the admin to respond to a specific feedback message.

HTTP Method
POST

Authentication
Requires a valid JWT token in the Authorization header.

Request Parameters
id (string, required): ID of the feedback entry.

Request Body
json
Copy code
{
  "response": "We have noted your concern and will take appropriate action."
}
Example Response
json
Copy code
{
  "message": "Response sent successfully",
  "feedback": {
    "_id": "feedback001",
    "response": "We have noted your concern and will take appropriate action."
  }
}
Error Response
json
Copy code
{
  "message": "Failed to send response"
}
