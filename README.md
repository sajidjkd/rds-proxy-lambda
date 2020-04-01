### Create lamda function and upload code
zip -r function.zip .


aws lambda create-function --function-name rds-proxy-test --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --environment "Variables={endpoint=${proxy_end-point},my_db=test}" 

aws lambda create-function --function-name rds-proxy-test --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --environment "Variables={endpoint=rdsproxytest-endpoint,my_db=test}" --role arn:aws:iam::669558139762:role/lambda-ex

### Update code
aws lambda update-function-code --function-name rdsproxytest --zip-file fileb://function.zip



### secretmanager-access-policy-test (Policy Document)

{
	"Version": "2012-10-17",
	"Statement": [{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": [
				"secretsmanager:GetResourcePolicy",
				"secretsmanager:GetSecretValue",
				"secretsmanager:DescribeSecret",
				"secretsmanager:ListSecretVersionIds"
			],
			"Resource": [
				"arn:aws:secretsmanager:us-east-1:{account}:secret:mysql5-7freetier-Gf737N"
			]
		},
		{
			"Sid": "VisualEditor1",
			"Effect": "Allow",
			"Action": [
				"secretsmanager:GetRandomPassword",
				"secretsmanager:ListSecrets"
			],
			"Resource": "*"
		}
	]
}

### Trust Relationship (Policy Document)

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "rds.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
