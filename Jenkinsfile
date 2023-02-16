pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build Frontend') { 
            steps {
                dir('frontend') {
                    sh 'ls'
                    sh 'npm install' 
                }
            }
        }
        stage('Test  Frontend') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver  Frontend') { 
            steps {
                sh './jenkins/scripts/deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}