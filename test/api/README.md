# API tests

## Planned API interface

### register

Input: `needed user data`

Output: `generated token`

### authorize

Input: `email, hash(password)`

Output: `new generated token`

### getUser

TODO: rename the function, because you get the
info only about you.

Input: `token`

Returns: `user data`

### getApplications

Input: `token, speciality uid`

Returns: `array of applications for the uid`

### editApplication

Input: `data to edit the application`

Returns: `operation result`

### removeApplication

Input: `application id`

Returns: `operation result`
