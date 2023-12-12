pipeline {
  agent any
  stages {
    stage('Test') {
        script {
            bat 'npm test'
        }
    }
    Stage ('Cleanup'){
      steps{
        script{
            bat '--forceExit'
        }
      }
    }
  }
}
