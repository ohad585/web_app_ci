pipeline {
    agent {
        docker {
            image 'nikolaik/python-nodejs' 
            args '-p 3000:3000' 
        }
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