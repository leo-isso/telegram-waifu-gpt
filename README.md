# Telegram WaifuGPT

An AI companion and assistant with a cute anime-girl personality!

## Environment Variables

Before building and running your project, create a `.env` file, and add the following variables:

*You need an [OpenAI](https://platform.openai.com) account to use the project*

```sh
OPENAI_API_KEY=<your_api_key>
OPENAI_API_ORG=<your_org_key>
OPENAI_API_MODEL=<gpt_model> # eg: gpt-3.5-turbo
TELEGRAM_BOT_KEY=<your_bot_key>
SERVER_HOST=http://localhost
SERVER_PORT=3000
REDIS_PASSWORD=<your_redis_password>
#DEBUG="grammy*" # To debug grammy bot
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can run the build with `npm run start`.

> You can also use the shortcut `npm run dev`

## Docker Compose

In order to make deployes easier, and also add other services, like Redis, you can run the project with `docker-compose`:

Build the docker-compose:

```bash
docker-compose build
```

Run docker-compose detached from your console:

```bash
docker-compose up -d
```



## Docker

To run the project using only Docker:

Build the docker image

```bash
docker build . -t telegram-waifu-gpt
```

Run the docker detached from your console with the flag `-d`

```bash
docker run -d -p 3000:3000 telegram-waifu-gpt 
```

> You can also add a name to the docker using `--name <my-container-name>`
