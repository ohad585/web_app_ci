pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }
    stages {
        dir('backend'){
            stage('Build Backend') { 
                steps {
                    sh 'ls'
                    sh 'npm install' 
                }
            }
            stage('Test  Backend') {
                steps {
                    sh './jenkins/scripts/test.sh'
                }
            }
            stage('Deliver  Backend') { 
                steps {
                    sh './jenkins/scripts/deliver.sh' 
                    input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                    sh './jenkins/scripts/kill.sh' 
                }
            }
        }
    }
}