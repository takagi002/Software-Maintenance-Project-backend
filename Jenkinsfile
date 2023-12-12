pipeline {
  agent any
  stages {
    stage('Test') {
        script {
            bat 'npm -- --forceExit'
        }
    }
    Stage ('Cleanup'){
      steps{
        script{
            bat 'rm package-lock.json'
        }
      }
    }
  }
}
