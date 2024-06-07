import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkTsStack extends cdk.Stack {
  public readonly cloudFrontDistribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'rs-task2-oai');

    // Create the S3 bucket
    const bucket = new s3.Bucket(this, 'rs-task2-website-bucket', {
      bucketName: 'rs-aws-module2-antonp-automated',
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // Create an IAM policy statement to allow GetObject action on the S3 bucket
    const bucketPolicyStatement = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      effect: iam.Effect.ALLOW,
      principals: [new iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
    });

    bucket.addToResourcePolicy(bucketPolicyStatement);

    // Create CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'rs-task2-website-distribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: cloudFrontOAI,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    // Deploy files to the S3 bucket
    new s3Deployment.BucketDeployment(this, 'rs-task2-website-deployment', {
      sources: [s3Deployment.Source.asset('../dist')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*']
    });

    // Export CloudFront distribution ID
    this.cloudFrontDistribution = distribution;

    // Output CloudFront distribution URL
    new cdk.CfnOutput(this, 'DistributionURL', {
      value: distribution.distributionDomainName,
      description: 'The domain name of the CloudFront distribution',
    });

    // Output S3 bucket URL
    new cdk.CfnOutput(this, 'BucketURL', {
      value: bucket.bucketWebsiteUrl,
      description: 'The URL of the S3 bucket website endpoint',
    });
  }
}
