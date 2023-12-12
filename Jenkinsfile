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
            bat 'rmdir .\node_modules\'
        }
      }
    }
  }
}
