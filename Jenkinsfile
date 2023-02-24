pipeline {
    agent {
        docker {
            image 'nikolaik/python-nodejs' 
            args '-p 3000:3000' 
        }
    }
    environment {
        PORT = 3001
        DATABASE_URL = "mongodb://mongo:27017/web_class"
        ACCESS_TOKEN_SECRET = "7389389fy23hfh238hf9hf"
        REFRESH_TOKEN_SECRET = "234kjh23b4kb324kjbn42"
        TOKEN_EXPIRATION = "24h"
    }
    stages {
        stage('Build Backend') { 
            steps {
                dir('backend') {
                    sh 'ls'
                    sh 'npm install' 
                }
            }
        }
        stage('Test  Backend') {
            steps {
                dir('backend'){
                    sh "chmod +x -R ./jenkins/scripts/*.sh"
                    sh './jenkins/scripts/test.sh'
                }
            }
        }
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