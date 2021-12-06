import { request, FullConfig } from '@playwright/test';
import * as fs from 'fs';

async function globalSetup(config: FullConfig) {
  /*const requestContext = await request.newContext();
  const response = await requestContext.post('https://api.demoblaze.com/login', {
	data: {
	  "username": "vlad-vlasiuk", 
	  "password": "YWFhYWE=" 		//Base64 encoded password
	}
  });
  
  const responseBody = (await response.body()).toString();
  const token = JSON.parse(responseBody).replace("Auth_token: ", "");
  
  // Save signed-in state to 'storageState.json'.
  const storageStateJson = JSON.stringify(
	{
	  "cookies": [
		{
		  "sameSite": "Lax",
		  "name": "tokenp_",
		  "value": token,
		  "domain": "www.demoblaze.com",
		  "path": "/",
		  "expires": -1,
		  "httpOnly": false,
		  "secure": false
		}
	  ],
	  "origins": []
	}
  );
  fs.writeFileSync('storageState.json', storageStateJson);
  
  await requestContext.dispose();*/
}

export default globalSetup;