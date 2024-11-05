// lib/transbank.js

import { Environment, WebpayPlus } from 'transbank-sdk';

const configureTransbank = () => {
  // Use this for production:
  WebpayPlus.configureForProduction('597052304264', '6bcd3ac7-c9d9-49a6-872e-5f1b69475b03');

  // For testing environment, you might want to use:
  // WebpayPlus.configureForTesting();
  
  // Alternatively, if you need to test specific scenarios with
  // certain credentials, you can use
  // WebpayPlus.configureForTestingWithSpecificCredentials('YOUR_COMMERCE_CODE', 'YOUR_API_KEY');
};

export default configureTransbank;
