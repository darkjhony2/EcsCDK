import * as cdk from 'aws-cdk-lib';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_ecs_patterns as ecs_patterns } from 'aws-cdk-lib';
import { Construct } from 'constructs';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EcsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 3
    });

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster,
      cpu: 512,
      desiredCount: 6,
      taskImageOptions: {image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")},
      memoryLimitMiB: 2048,
      publicLoadBalancer: true
    });
  }
}
