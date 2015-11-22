var config = {};

config.host = process.env.HOST || "https://pretest.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "RcOQD+Q4MbfeKUIqij8aQ2S1EvCauIVS5yRSvCSkksRUuWcwhZ297VAMiwM6VMSjyx+fIBEQHhnfToLGsNPcmQ==";
config.databaseId = "PreTest";
config.collectionId = "Answers";

module.exports = config;
