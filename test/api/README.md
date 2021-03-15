# API tests

## Planned API interface

### register

Input: `needed user data`

Output: `user id, generated token`

### authorize

Input: `user id, hash(last token + date)`

NOTE: if the last token isn't in memory, generate hash of
`hash of password + date`

Output: `new generated token`

### getUser

Input: `email of a user`

Returns: `user data`

### getApplications

Input: `user id`

Returns: `array of applications of given user`

### editApplication

Input: `data to edit the application`

Returns: `operation result`

### removeApplication

Input: `application id`

Returns: `operation result`
