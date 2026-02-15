import * as cdk from 'aws-cdk-lib';
import {Construct} from "constructs";
import {MyLambdaStack} from "./lambda";

export class MyPipelineAppStage extends cdk.Stage{
    constructor(scope: Construct, stageName: string, props?: cdk.StackProps) {
        super(scope, stageName, props);

        const lambdaStack = new MyLambdaStack(this, 'LambdaStack', stageName);
    }
}