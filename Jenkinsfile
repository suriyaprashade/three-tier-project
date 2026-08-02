pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '754895435040'
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
    }
}
