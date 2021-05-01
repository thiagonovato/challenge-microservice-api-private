export const AUTH = {
  timeout: 480, // 8 hours
  appTimeout: 1440, // 24 hours
  resetPasswordTimeout: 1 * 60 * 24, //2 days
  secret: Buffer.from(
    'RSd7w8utAWSjmJ8QOGt2OayydAqoUmL3sBTY7PqCVqOqaNn3RH38lMlNdDv5zoTQZH8GrR80YNFpQ3jKnDRMPDuwqaODObyyX0LS',
    'base64'
  ).toString('utf8')
};
