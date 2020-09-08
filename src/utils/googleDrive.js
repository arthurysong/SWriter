// import credentials from '../credentials/credentials.json';

export const oauth = () => {
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  // var params = {'client_id': credentials.web.client_id,
  var params = {'client_id': process.env.REACT_APP_GOOGLE_ID,
                  'redirect_uri': 'http://localhost:3000/client',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/drive',
                  'include_granted_scopes': 'true',
                  'state': 'oauth',
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