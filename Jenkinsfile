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
        stage('Build&Test Backend') { 
            steps {
                // dir('backend') {
                //     sh 'ls'
                //     sh 'npm install' 
                // }
                sh 'docker ps'
                sh 'echo --------------'
                sh 'docker compose version'
                // sh 'echo --------------'
                // sh 'docker-compose up --build'
            }
        }
        // stage('Test  Backend') {
        //     steps {
        //         dir('backend'){
        //             sh "chmod +x -R ./jenkins/scripts/*.sh"
        //             sh './jenkins/scripts/test.sh'
        //         }
        //     }
        // }
        stage('Deliver  Backend') { 
            steps {
                dir('backend'){
                    sh './jenkins/scripts/deliver.sh' 
                    input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                    sh './jenkins/scripts/kill.sh' 
                }
            }
        }
    }
}