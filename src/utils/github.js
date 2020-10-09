export const githubOauth = () => {
    var oauth2Endpoint = 'https://github.com/login/oauth/authorize';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
    console.log("process.env", process.env);
    // Parameters to pass to OAuth 2.0 endpoint.
    // var params = {'client_id': credentials.web.client_id,
    var params = {'client_id': process.env.REACT_APP_GITHUB_ID,
                    // 'redirect_uri': `${process.env.NODE_ENV === 'development' ? 'https://127.0.0.1:3000/callback' : 'https://mwriter.herokuapp.com'}`,
                    // 'redirect_uri': 'https://mwriter.herokuapp.com/callback',
                    'redirect_uri': 'http://127.0.0.1:3000/client',
                    'response_type': 'code',
                    'scope': 'gist',
                    'state': process.env.REACT_APP_GITHUB_STATE,
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