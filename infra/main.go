package main

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	apigatewayv2 "github.com/aws/aws-cdk-go/awscdk/v2/awsapigatewayv2"
	apigatewayv2integrations "github.com/aws/aws-cdk-go/awscdk/v2/awsapigatewayv2integrations"
	certificatemanager "github.com/aws/aws-cdk-go/awscdk/v2/awscertificatemanager"
	lambda "github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/aws-cdk-go/awscdk/v2/awss3assets"

  "os"

	"path/filepath"

	logs "github.com/aws/aws-cdk-go/awscdk/v2/awslogs"
	constructs "github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type TitanWebsiteProps struct {
	Prefix string `json:"prefix"`
	awscdk.StackProps
}

type TitanWebsite struct {
	awscdk.Stack
}

func NewTitanWebsite(scope constructs.Construct, id string, props *TitanWebsiteProps) TitanWebsite {
	stack := awscdk.NewStack(scope, &id, &props.StackProps)

	// Create log group for Lambda function
	fnLogGroup := logs.NewLogGroup(stack, jsii.String(props.Prefix+"-loggroup"), &logs.LogGroupProps{
		Retention: logs.RetentionDays_ONE_WEEK,
	})

	// Create Lambda function
	handler := lambda.NewFunction(stack, jsii.String(props.Prefix+"-fn"), &lambda.FunctionProps{
		Runtime: lambda.Runtime_PROVIDED_AL2023(),
		Handler: jsii.String("bootstrap"),
		Code:    lambda.Code_FromAsset(jsii.String(filepath.Join("..", "target", "lambda", "v-thomas-com")), &awss3assets.AssetOptions {}),
		LogGroup: fnLogGroup,
	})

	// Get certificate ARN from environment variables
	cert := certificatemanager.Certificate_FromCertificateArn(stack, jsii.String(props.Prefix+"-cert"), jsii.String(os.Getenv("CERT_ARN")))

	// Create a custom domain name
	domainName := apigatewayv2.NewDomainName(stack, jsii.String(props.Prefix+"-domain"), &apigatewayv2.DomainNameProps{
		DomainName: jsii.String("v-thomas.com"),
		Certificate: cert,
	})

	// Create the HTTP API
	api := apigatewayv2.NewHttpApi(stack, jsii.String(props.Prefix+"-http-api"), &apigatewayv2.HttpApiProps{
		ApiName:            jsii.String("v-thomas.com"),
		DefaultDomainMapping: &apigatewayv2.DomainMappingOptions{DomainName: domainName},
		DisableExecuteApiEndpoint: jsii.Bool(true),
	})

	// Create Lambda integration for API
	lambdaIntegration := apigatewayv2integrations.NewHttpLambdaIntegration(jsii.String(props.Prefix+"-lambda-integration"), handler, &apigatewayv2integrations.HttpLambdaIntegrationProps{
		Timeout: awscdk.Duration_Millis(jsii.Number(500.0)),
	})

	// Add the route to the API
	api.AddRoutes(&apigatewayv2.AddRoutesOptions{
		Path:        jsii.String("/{proxy+}"),
		Integration: lambdaIntegration,
	})

	return TitanWebsite{stack}
}

func main() {
	app := awscdk.NewApp(nil)

	NewTitanWebsite(app, "v-thomas-com", &TitanWebsiteProps{
		Prefix: "v-thomas-com", 
	})

	app.Synth(nil)
}
