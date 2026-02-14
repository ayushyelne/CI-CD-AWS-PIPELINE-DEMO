import * as cdk from 'aws-cdk-lib/core';
import { CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep} from "aws-cdk-lib/pipelines";
// import { MyPipelineAddStage} from './stages';
import { Construct } from 'constructs';
import {Code} from "aws-cdk-lib/aws-lambda";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('ayushyelne/ci-cd-aws-pipeline-demo', 'main'),
        commands: ['npm ci',
        'npm run build',
        'npx cdk synth']
      }),
    });
  }
}
