# Web Application CI

This project is set up to automate the build and test stages of an web app using Jenkins, Docker, and GitHub.

## Web app

- Frontend - expo app.
- Backend - Nodejs server.
- Databases - Redis, MongoDB.


## Prerequisites

- Running Jenkins container and blue ocean container 
with the expo app port open (Default 19000).
- Github Repository.
- Jenkins project pipeline.
- 
## Usage

To use this project, simply make changes to your app's code and push them to your GitHub repository. This will trigger the Jenkins job, which will build and deploy your app using Docker and Expo. You can view the status of your Jenkins job and the logs for your Docker container to see if the build and deployment were successful.
