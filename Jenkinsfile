pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '754895435040'
        APP_SERVER_IP = '3.238.247.39'
    }

    stages {

        stage('Build Backend') {
            steps {
                sh 'docker build -t backend-repo:v1 ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t frontend-repo:v1 ./frontend'
            }
        }

        stage('Login ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS \
                --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                '''
            }
        }

        stage('Push Backend') {
            steps {
                sh '''
                docker tag backend-repo:v1 \
                ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/backend-repo:v1

                docker push \
                ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/backend-repo:v1
                '''
            }
        }

        stage('Push Frontend') {
            steps {
                sh '''
                docker tag frontend-repo:v1 \
                ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/frontend-repo:v1

                docker push \
                ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/frontend-repo:v1
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@${APP_SERVER_IP} "

                aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 754895435040.dkr.ecr.us-east-1.amazonaws.com

                docker pull 754895435040.dkr.ecr.us-east-1.amazonaws.com/backend-repo:v1

                docker pull 754895435040.dkr.ecr.us-east-1.amazonaws.com/frontend-repo:v1

                docker stop backend || true
                docker rm backend || true

                docker stop frontend || true
                docker rm frontend || true

                docker run -d \
                --name backend \
                -p 5000:5000 \
                -v /home/ubuntu/.aws:/root/.aws:ro \
                754895435040.dkr.ecr.us-east-1.amazonaws.com/backend-repo:v1

                docker run -d \
                --name frontend \
                -p 3000:3000 \
                754895435040.dkr.ecr.us-east-1.amazonaws.com/frontend-repo:v1

                "
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully'
        }

        failure {
            echo 'Deployment failed'
        }
    }
}
