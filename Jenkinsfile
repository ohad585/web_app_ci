pipeline {
    agent any
    environment {
        PORT = 3001
        DATABASE_URL = "mongodb://mongo:27017/web_class"
        ACCESS_TOKEN_SECRET = "7389389fy23hfh238hf9hf"
        REFRESH_TOKEN_SECRET = "234kjh23b4kb324kjbn42"
        TOKEN_EXPIRATION = "24h"
        REDIS_HOST = "redis_db"
    }
    stages {
        stage('Build And Test Backend') { 
            steps {
                sh 'docker compose -f docker-compose-dev.yml up --build --abort-on-container-exit --exit-code-from backend'
            }
        }
        stage('Build And Run App') { 
            steps {
                sh 'docker compose up --build -d'
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh 'docker compose down'
            }
        }
    }
}