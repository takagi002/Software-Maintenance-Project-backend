pipeline {
  agent any
  stages {
    stage('Test') {
        steps{
            script {
                bat 'npm -- --forceExit'
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
