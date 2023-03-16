podTemplate(label: 'build', containers: [
    containerTemplate(name: 'bun', image: 'oven/bun', command: 'sh', ttyEnabled: true),
    containerTemplate(name: 'docker', image: 'docker:dind', privileged: true, command: 'sh', ttyEnabled: true)
],
    volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
) {
    node('build') {
        stage('prepare') {
            checkout scm
        }

        stage('test') {
            container('bun') {
                sh('bun wiptest')
            }
        }

        stage('build stage') {
            if (env.BRANCH_NAME != 'develop') return
            withCredentials([usernamePassword(credentialsId: '70e941c6-4e5b-4097-a401-5142eedb17c5', passwordVariable: 'dockerKey', usernameVariable: 'dockerUser')]) {
                container('docker') {
                    sh('echo $dockerKey | docker login -u $dockerUser --password-stdin')
                    sh('docker build . -t alaust/spotify-archiver:stage')
                    sh('docker push alaust/spotify-archiver:stage')
                }
            }

        }

        stage('build prod') {
            if (env.BRANCH_NAME != 'main') return

            env.VERSION_TAG = sh(returnStdout: true, script: 'git tag --points-at HEAD')
            if (env.VERSION_TAG == "") {
                env.VERSION_TAG = sh(returnStdout: true, script: 'git rev-parse HEAD').substring(0, 15)
            } else if (env.VERSION_TAG.startsWith("v")) {
                env.VERSION_TAG = env.VERSION_TAG.substring(1)
            }

            withCredentials([usernamePassword(credentialsId: '70e941c6-4e5b-4097-a401-5142eedb17c5', passwordVariable: 'dockerKey', usernameVariable: 'dockerUser')]) {
                container('docker') {
                    sh('echo $dockerKey | docker login -u $dockerUser --password-stdin')
                    sh('docker build -t alaust/spotify-archiver:latest -t alaust/spotify-archiver:$VERSION_TAG .')
                    sh('docker push alaust/spotify-archiver:latest')
                    sh('docker push alaust/spotify-archiver:$VERSION_TAG')
                }
            }
        }
    }
}