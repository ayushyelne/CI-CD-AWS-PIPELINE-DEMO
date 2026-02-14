#!/usr/bin/env node
import 'source-map-support';
import * as cdk from 'aws-cdk-lib/core';
import { CiCdAwsPipelineDemoStack } from '../lib/ci-cd-aws-pipeline-demo-stack';

const app = new cdk.App();
new CiCdAwsPipelineDemoStack(app, 'CiCdAwsPipelineDemoStack', {
    env:{
        account: '871700844415',
        region: 'us-east-1'
    }
});

app.synth();