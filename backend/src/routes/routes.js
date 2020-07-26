const { Router } = require('express');
const fs = require('fs');
const https = require('https');
const axios = require('axios');
const path = require('path');
const qs = require('qs');
const { uuid } = require('uuidv4');

const routes = Router();

const certificate = path.join(
  __dirname,
  '..',
  'certificates',
  'bank1',
  'client_certificate.crt',
);

const key = path.join(
  __dirname,
  '..',
  'certificates',
  'bank1',
  'client_private_key.key',
);

const httpsAgent = new https.Agent({
  cert: fs.readFileSync(certificate),
  key: fs.readFileSync(key),
  rejectUnauthorized: false,
});

const basicToken = 'NjJmZDVlNTMtNTkzMC00NjJlLTg5M2ItOTU4ZWEwZTQzMzZjOjcyMTY0MzJmLTQxZTYtNGQ2OS04Y2QwLTVmNzIxZWFmMTUwYw==';

const userData = {
  bearerToken: '',
  consentId: '',
  bankURL: ''
};

const dbPath = path.join(__dirname, '..', 'database', 'db.json');

let token = '';
let consentId = '';
let bankURL = '';

const getToken = async () => {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization:
        `Basic ${basicToken}`,
    };

    const body = {
      grant_type: 'client_credentials',
      scope: 'accounts openid',
    };

    const result = await axios.post(
      'https://as1.tecban-sandbox.o3bank.co.uk/token',
      qs.stringify(body),
      { headers, httpsAgent },
    );

    token = result.data.access_token;

    userData.bearerToken = token;

    const stringData = JSON.stringify(userData);

    fs.writeFile(dbPath, stringData, 'utf8', err => {
      if (err) {
        console.log(err);
      } else {
        console.log('File saved!');
      }
    });

    return token;
  } catch (err) {
    return { message: err.data };
  }
};

const getConsentId = async () => {
  const rawData = fs.readFileSync(dbPath);

  const user = JSON.parse(rawData);

  const storedToken = user.bearerToken;

  const storedConsentId = user.consentId;

  if (!storedToken) {
    return { message: 'You must have a token.' };
  }

  if (storedConsentId) {
    return storedConsentId;
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
    'x-fapi-interaction-id': uuid(),
    Authorization: `Bearer ${storedToken}`,
  };

  const body = {
    Data: {
      Permissions: [
        'ReadAccountsBasic',
        'ReadAccountsDetail',
        'ReadBalances',
        'ReadBeneficiariesBasic',
        'ReadBeneficiariesDetail',
        'ReadDirectDebits',
        'ReadTransactionsBasic',
        'ReadTransactionsCredits',
        'ReadTransactionsDebits',
        'ReadTransactionsDetail',
        'ReadProducts',
        'ReadStandingOrdersDetail',
        'ReadProducts',
        'ReadStandingOrdersDetail',
        'ReadStatementsDetail',
        'ReadParty',
        'ReadOffers',
        'ReadScheduledPaymentsBasic',
        'ReadScheduledPaymentsDetail',
        'ReadPartyPSU',
      ],
    },
    Risk: {},
  };

  try {
    const result = await axios.post(
      'https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/account-access-consents',
      body,
      { headers, httpsAgent },
    );

    consentId = result.data.Data.ConsentId;

    user.consentId = consentId;

    const stringData = JSON.stringify(user);

    fs.writeFile(dbPath, stringData, 'utf8', err => {
      if (err) {
        console.log(err);
      } else {
        console.log('File saved.');
      }
    });

    return user.consentId;
  } catch (err) {
    console.log(err);
    return { message: err.data };
  }
};

const getBankUrl = async () => {
  try {
    const rawData = fs.readFileSync(dbPath);

    const user = JSON.parse(rawData);

    const storedConsentId = user.consentId;

    const storedBankURL = user.bankURL;

    if (!storedConsentId) {
      return { message: 'The consent request has not been created yet.' };
    }

    if (storedBankURL) {
      return storedBankURL;
    }

    const headers = {
      Authorization:
        'Basic NjJmZDVlNTMtNTkzMC00NjJlLTg5M2ItOTU4ZWEwZTQzMzZjOjcyMTY0MzJmLTQxZTYtNGQ2OS04Y2QwLTVmNzIxZWFmMTUwYw==',
    };

    const result = await axios.get(
      `https://rs1.tecban-sandbox.o3bank.co.uk/ozone/v1.0/auth-code-url/${storedConsentId}?scope=accounts&alg=none`,
      { headers, httpsAgent },
    );

    bankURL = result.data;

    user.bankURL = bankURL;

    const stringData = JSON.stringify(user);

    fs.writeFile(dbPath, stringData, 'utf8', err => {
      if (err) {
        console.log(err);
      } else {
        console.log('File saved!');
      }
    });

    return user.bankURL;
  } catch (err) {
    return { message: err.data };
  }
};

const setDeepLinking = async () => {

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${basicToken}`
  }

  const body = qs.stringify({
    'redirectURL': 'mobile://' 
   });
  
  const result = await axios.put(
    'https://rs1.tecban-sandbox.o3bank.co.uk/ozone/v1.0/redirect-url-update',
    body,
    { headers, httpsAgent }
  )

  return result.data;
}

routes.get('/', (request, response) =>
  response.json({ message: 'Hello team 11!' }),
);

routes.get('/bank1/get-token', async (request, response) => {
  try {
    const theToken = await getToken();

    response.json(theToken);
  } catch (err) {
    response.json({
      message: err.data,
    });
  }
});

routes.get('/bank1/create-consent-request', async (request, response) => {
  try {
    const theConsentId = await getConsentId();

    response.json(theConsentId);
  } catch (err) {
    response.json({
      message: err.data,
    });
  }
});

routes.get('/bank1/get-bank-url', async (request, response) => {
  try {
    const theURL = await getBankUrl();

    response.json(theURL);
  } catch (err) {
    response.json({ message: err });
  }
});

routes.get('/bank1/set-redirect-url', async (request, response) => {
  try {
    const theDeepLink = await setDeepLinking();

    console.log(theDeepLink.redirect_uris);

    response.json(theDeepLink.redirect_uris);
  } catch (err) {
    response.json({ message: err.data });
  }
})

routes.post('test', (request, response) => {
  const { code } = request.body;

  console.log(code);
})

module.exports = routes;