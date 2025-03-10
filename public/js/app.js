let auth0Client = null;

async function initAuth0() {
  const fetchAuthConfig = () => fetch('./auth_config.json');
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      audience: config.audience
    }
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

async function submitForm(formId, endpoint) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const token = await auth0Client.getTokenSilently();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('Form submission result:', result);
    alert(result.msg);
  } catch (error) {
    console.error('Form submission failed:', error);
    alert('Form submission failed');
  }
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

  // Add event listeners to form submissions
  document
    .getElementById('form1Form')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm('form1Form', '/submit-form1');
    });
  document
    .getElementById('form2Form')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm('form2Form', '/submit-form2');
    });
  document
    .getElementById('form3Form')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm('form3Form', '/submit-form3');
    });
};