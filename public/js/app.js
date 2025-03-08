console.log('Auth0 client initialized');

let auth0Client = null;

async function initAuth0() {
  const fetchAuthConfig = () => fetch('./auth_config.json');
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
  });
}

async function authenticateAndRedirect(formNumber) {
  try {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
      await auth0Client.loginWithPopup();
    }

    const token = await auth0Client.getTokenSilently();
    console.log('Auth Token:', token);

    showForm(formNumber);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}

function showForm(formNumber) {
  document
    .querySelectorAll('.form')
    .forEach((form) => form.classList.add('hidden'));
  document.getElementById(`form${formNumber}`).classList.remove('hidden');
}

window.onload = async function () {
  await initAuth0();

  // Add event listeners to buttons
  document
    .getElementById('btn1')
    .addEventListener('click', () => authenticateAndRedirect(1));
  document
    .getElementById('btn2')
    .addEventListener('click', () => authenticateAndRedirect(2));
  document
    .getElementById('btn3')
    .addEventListener('click', () => authenticateAndRedirect(3));
};
