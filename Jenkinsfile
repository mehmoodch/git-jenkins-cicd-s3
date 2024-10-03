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
                git url: 'https://github.com/mehmoodch/git-jenkins-cicd-s3.git', branch: 'main'
            }
        }

        stage('Build (Optional)') {
            steps {
                // Optional: Run build tools like npm if your static site has a build step
                echo 'no build steps for static website'
            }
        }

        stage('Deploy to S3') {
            steps {
                withAWS(credentials: '13.60.227.148') {
                    bat '''
                    aws s3 sync . s3://%S3_BUCKET% --delete
                    '''
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                withAWS(credentials: '13.60.227.148') {
                    bat '''
                    aws cloudfront create-invalidation --distribution-id %CLOUDFRONT_DISTRIBUTION_ID% --paths "/*"
                    '''
                }
            }
        }
    }
}
