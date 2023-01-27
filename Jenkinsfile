pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS=credentials('70e941c6-4e5b-4097-a401-5142eedb17c5')
    }

    stages {
        stage('Test') {
            steps {
                sh 'curl -fsSL https://bun.sh/install | bash'
                sh 'export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && bun wiptest'
            }
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
        stage('Build productive') {
            when {
                branch 'main'
            }
            steps {
                script {
                    env.VERSION_TAG = sh(returnStdout: true, script: 'git tag --points-at HEAD')
                    env.VERSION_TAG = env.VERSION_TAG == ""
                        ? sh(returnStdout: true, script: 'git rev-parse HEAD').substring(0, 15)
                        : env.VERSION_TAG
                }
                sh 'docker build -t alaust/spotify-archiver:latest -t alaust/spotify-archiver:$VERSION_TAG .'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push alaust/spotify-archiver:latest alaust/spotify-archiver:$VERSION_TAG'
            }
        }
    }
}