const mysql = require("mysql2");
const {
  SecretsManagerClient,
  GetSecretValueCommand
} = require("@aws-sdk/client-secrets-manager");

async function getConnection() {

  const client = new SecretsManagerClient({
    region: "us-east-1"
  });

  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: "prod/database"
    })
  );

  const secret = JSON.parse(response.SecretString);

  return mysql.createConnection({
    host: secret.host,
    user: secret.username,
    password: secret.password,
    database: secret.database
  });
}

module.exports = getConnection;
