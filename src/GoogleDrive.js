import React, { useEffect } from 'react';
// import { authorize, listFiles } from './utils/googleDrive';
import credentials from './credentials/credentials.json';
import axios from 'axios';

function GoogleDrive(props) {
    useEffect(() => {
        console.log(credentials);
        console.log(credentials.web.client_id);
        // axios.get(`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive&include_granted_scopes=true&response_type=token&state=oauth&redirect_uri=http://localhost:3000/auth&client_id=${credentials.web.client_id}`)
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {'client_id': credentials.web.client_id,
                        'redirect_uri': 'http://localhost:3000/auth',
                        'response_type': 'token',
                        'scope': 'https://www.googleapis.com/auth/drive',
                        'include_granted_scopes': 'true',
                        'state': 'oauth'};

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
    }, []);

    return <div>
    </div>
}

export default GoogleDrive;