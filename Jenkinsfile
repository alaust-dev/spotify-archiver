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
                buildImage(tag: "alaust/spotify-archiver", version: ["stage"])
            }
        }

        stage('build prod') {
            if (env.BRANCH_NAME != 'main') return

            String version = sh(returnStdout: true, script: 'git tag --points-at HEAD')
            if (version == "") {
                version = sh(returnStdout: true, script: 'git rev-parse HEAD').substring(0, 15)
            } else if (version.startsWith("v")) {
                version = version.substring(1)
            }

            container('docker') {
                buildImage(tag: "alaust/spotify-archiver", version: ["latest", version])
            }
            deployK8s(deployments: [
                "production/spotify-archiver/deployment.yml",
                "production/spotify-archiver/secret.yml",
                "production/spotify-archiver/service.yml",
            ])
        }
    }
}