(function () {
    let internalAccessToken = null;

    const loggedOutView = document.getElementById('logged-out-view');
    const loggedInView = document.getElementById('logged-in-view');
    const tokenDisplay = document.getElementById('token-display');
    const apiResponseBox = document.getElementById('api-response-box');
    const apiRawOutput = document.getElementById('api-raw-output');

    const urlParams = new URLSearchParams(window.location.search);
    const incomingToken = urlParams.get('token');

    if (incomingToken) {
        internalAccessToken = incomingToken;
        
        // Scrub the token instantly from the browser address history log for safety
        window.history.replaceState({}, document.title, window.location.pathname);

        tokenDisplay.value = internalAccessToken;
    }

    document.getElementById('login-btn').addEventListener('click', () => {
        window.location.href = 'http://localhost:8000/auth/saml/login';
    });

    document.getElementById('fetch-api-btn').addEventListener('click', async () => {
        apiRawOutput.innerText = 'Communicating with backend mesh...';

        try {
            const response = await fetch('http://localhost:8000/protectedA', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${internalAccessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.text();
            console.log(data)
            apiRawOutput.innerText = data;
        } catch (error) {
            apiRawOutput.innerText = 'Network error querying downstream microservices.';
        }
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        internalAccessToken = null;
        window.location.href = '/';
    });
})();