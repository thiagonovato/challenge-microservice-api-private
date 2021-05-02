## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
```
$ yarn
```

## Running the app
 ```
$ docker-compose up
```

## How use
To use, access the url "http://localhost:3001/swagger", make a request for the endpoint "generateKey" to obtain an access token. He will identificate you in all requests. You must pass it in all requests in "Bearer Authenticate". And to send emails, use the endpoint "sendEmail", passing an object containing the subject, an array of recipients and a content as content of the email. See the object schema.
## Created by

- Author - [Thiago Novato](https://github.com/thiagonovato)
- Website - [https://thiagonovato.com.br](https://thiagonovato.com.br/)