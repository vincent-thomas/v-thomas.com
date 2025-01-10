import * as cdk from "aws-cdk-lib";
import { HttpApi, DomainName } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { join } from "path";

export interface Properties extends cdk.StackProps {
	readonly prefix: string;
}

export class TitanWebsite extends cdk.Stack {
	constructor(scope: Construct, id: string, props: Properties) {
		super(scope, id, props);

		const fnLogGroup = new LogGroup(this, `${props.prefix}-loggroup`, {
			retention: RetentionDays.ONE_WEEK, // Customize the retention period as needed
		});

		const handler = new Function(this, `${props.prefix}-fn`, {
			runtime: Runtime.PROVIDED_AL2023,
			handler: "bootstrap",
			code: Code.fromAsset(join(__dirname, "../../target/lambda/v-thomas-com")),
			logGroup: fnLogGroup,
		});

		const cert = Certificate.fromCertificateArn(
			this,
			`${props.prefix}-cert`,
			process.env.CERT_ARN as string,
		);

		const domain = new DomainName(this, ` ${props.prefix}-domain`, {
			domainName: "v-thomas.com",
			certificate: cert,
		});
		const api = new HttpApi(this, `${props.prefix}-http-api`, {
			apiName: "v-thomas.com",
			defaultDomainMapping: { domainName: domain },
			disableExecuteApiEndpoint: false,
			//disableExecuteApiEndpoint: true,
		});

		const lambdaIntegration = new HttpLambdaIntegration(
			"${props.prefix}-lambda-integration",
			handler,
			{
				timeout: cdk.Duration.millis(100),
			},
		);

		api.addRoutes({
			path: "/{proxy+}",
			integration: lambdaIntegration,
		});
	}
}
