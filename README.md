![Build Status](https://travis-ci.org/neilb14/flask_microservices-main.svg?branch=master)

The main project will house the Docker Compose files, Nginx config, and any admin scripts. Essentially, you'll manage all services from this project.

# Env Cheatsheet
Remember that the Docker build context is set to the master branch on Github remotes. So in order for containers to work the client and user work must be pushed to remotes prior to building continers.

*Gotcha: For some weird reason Node services running on port 9000 (default) can't be exposed on my macbook so they've been reconfigured to run on 3000*

## Environment Variables
You'll need the following environment variables defined prior to building a container:
```
export REACT_APP_USERS_SERVICE_URL=http://192.168.99.100:5001
```

## Docker Compose
Use docker compose to create the multi-container applications. Setting are in docker-compose.yml and services individual Dockerfile.

Build or rebuild containers: ```docker-compose up -d --build```

Run commands (like test): ```docker-compose run users-service python manage.py test```

## Docker Machine
Assuming my machine's name is 'dev'

Get the env: ```docker-machine env dev```

Get the ip address: ```docker-machine ip dev```
