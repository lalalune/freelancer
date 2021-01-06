# [FREELANCER]

A collectible card game.

GETTING STARTED:

You will need to run Redis. By default, localhost, default port, no credentials.
Easiest pay is to install Docker.
Run ```sudo docker pull redis``` to pull the redis Docker image
Then ```sudo docker run -it -p 6379:6379 redis``` to start Redis

CLIENT AND SERVER
To start client and server:
``` yarn start:server ```
``` yarn start:client ```