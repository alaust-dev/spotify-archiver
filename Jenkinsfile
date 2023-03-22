@Library('shared-libaries') _

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

            container('docker') {
                buildImage(tag: "stage")
            }
        }

        stage('build prod') {
            if (env.BRANCH_NAME != 'main') return

            container('docker') {
                buildImage(tag: "prod")
            }
        }
    }
}