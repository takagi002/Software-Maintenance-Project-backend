pipeline {
  agent any
  stages {
  stage('Init') {
          steps{
              script {
                  bat 'npm install'
              }
          }
      }
    stage('Test') {
        steps{
            script {
                bat 'npm test -- -- forceExit'
            }
        }
    }
    stage ('Cleanup'){
      steps{
        script{
            bat 'rm package-lock.json'
        }
      }
    }
  }
}
