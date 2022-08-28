# How to start the project
## Docker

`docker build -t ${IMAGE_NAME} .`

`docker run -p 8080:8080 -e PORT=3000 -e GMAIL_APP_PASS=qrhzatcqmkbztmea ${IMAGE_NAME}`

P.S. I'm using a new created gmail so I'm good with exposing gmail application (not account) password here

## Locally

### Dev

`pnpm install`

`pnpm run dev`

### Prod

`pnpm install`

`pnpm run docker-build`


# Notes for the reviewers

The route `GET '/rate'` cannot return Number as Express res.send() cannot return Number type.

I'm not adding **`.env`** to .gitignore but I've created a .env_sample file as it should be done


# API Documentation

[Swagger](https://github.com/AndriiPopovych/gses/blob/main/gses2swagger.yaml)



**P.S.** Didn't write any test because was doing task on Saturday evening :(
