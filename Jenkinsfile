pipeline {
    agent any

    environment {
        AWS_REGION = 'ca-central-1'
        S3_BUCKET = 'git-jenkins-aws-static-website'
        CLOUDFRONT_DISTRIBUTION_ID = 'E3BVLV8Q3TA99A' // CloudFront distribution ID created by Terraform
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/mehmoodch/Jenkins-CICD-AWS.git', branch: 'main'
            }
        }

        //stage('Build (Optional)') {
         //   steps {
                // Optional: Run build tools like npm if your static site has a build step
                //sh 'npm install'
                //sh 'npm run build'
         //   }
       // }

        stage('Deploy to S3') {
            steps {
                withAWS(credentials: 'AWS Credentials') {
                    sh '''
                    aws s3 sync ./build s3://${S3_BUCKET} --delete
                    '''
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                withAWS(credentials: 'AWS Credentials') {
                    sh '''
                    aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"
                    '''
                }
            }
        }
    }
}
