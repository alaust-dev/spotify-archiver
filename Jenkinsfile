pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS=credentials('70e941c6-4e5b-4097-a401-5142eedb17c5')
    }

    stages {
        stage('Test') {
            sh 'curl -fsSL https://bun.sh/install | bash'
            sh 'source ~/.bashrc'
            sh 'bun wiptest'
        }
        stage('Build stage') {
            when {
                branch 'develop'
            }
            steps {
                sh 'docker build -t alaust/spotify-archiver:stage .'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push alaust/spotify-archiver:stage'
            }
        }
    }
}