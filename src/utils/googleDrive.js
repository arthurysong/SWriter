import credentials from '../credentials/credentials.json';

export const oauth = () => {
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': credentials.web.client_id,
                  // 'client_secret': credentials.web.client_secret,
                  // 'grant_type': 'authorization_code',
                  'redirect_uri': 'http://localhost:3000/client',
                  // 'response_type': 'code',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/drive',
                  'include_granted_scopes': 'true',
                  'state': 'oauth',
                  // 'access_type': 'offline',
                  // 'approval_prompt': 'force',
                  // 'prompt': 'consent',
                };

  // Add form parameters as hidden input values.
  for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
