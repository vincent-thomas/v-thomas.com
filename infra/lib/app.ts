#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TitanWebsite } from "./stack";

import "dotenv/config";

const app = new cdk.App();
const env = {
	account: process.env.CDK_DEFAULT_ACCOUNT,
	region: process.env.CDK_DEFAULT_REGION,
};
const prefix = "v-thomas-com";

new TitanWebsite(app, "v-thomas-com", {
	env,
	stackName: `${prefix}-stack`,
	prefix,
});
