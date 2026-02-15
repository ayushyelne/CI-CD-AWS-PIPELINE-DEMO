import * as cdk from 'aws-cdk-lib/core';
import { CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep} from "aws-cdk-lib/pipelines";
// import { MyPipelineAddStage} from './stages';
import { Construct } from 'constructs';
import {Code} from "aws-cdk-lib/aws-lambda";
import {MyPipelineAppStage} from "./stage";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('ayushyelne/ci-cd-aws-pipeline-demo', 'main'),
        commands: ['npm ci',
        'npm run build',
        'npm run cdk -- synth']
      }),
    });

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: {account: "871700844415", region: "us-east-1"}
    }))

    testingStage.addPost(new ManualApprovalStep('Manual Approval before production'));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
      env: {account: "871700844415", region: "us-east-1"}
    }))
  }
}
