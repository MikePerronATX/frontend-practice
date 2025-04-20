// Toggle Message Button
const button = document.getElementById('changeBtn');
const message = document.getElementById('message');
let showingOriginal = true;

function toggleText() {
  if (showingOriginal) {
    message.textContent = '🎉 You clicked the button!';
  } else {
    message.textContent = 'Click the button to change this message.';
  }
  showingOriginal = !showingOriginal;
}

button.addEventListener('click', toggleText);

// Hobby List Logic
const addHobbyBtn = document.getElementById('addHobbyBtn');
const newHobbyInput = document.getElementById('newHobby');
const hobbyList = document.getElementById('hobbyList');

addHobbyBtn.addEventListener('click', addHobby);

function addHobby() {
  const hobbyText = newHobbyInput.value.trim();

  if (hobbyText !== '') {
    const newItem = document.createElement('li');
    newItem.textContent = hobbyText;
    newItem.style.fontWeight = 'bold';
    hobbyList.appendChild(newItem);
    newHobbyInput.value = '';
  }
}

hobbyList.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.remove();
  }
});

// Contact Form Submission (connects to backend)
const form = document.getElementById('contactForm');
const confirmation = document.getElementById('confirmationMessage');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const userMessage = document.getElementById('messageInput').value.trim();

  if (!name || !email || !userMessage) {
    confirmation.textContent = 'Please fill in all fields.';
    confirmation.style.color = 'red';
    return;
  }

  fetch('https://contact-backend-nq28.onrender.com/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message: userMessage }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        confirmation.textContent = data.message;
        confirmation.style.color = 'green';
        form.reset();
      } else {
        confirmation.textContent = data.error || 'Something went wrong.';
        confirmation.style.color = 'red';
      }
    })
    .catch((err) => {
      console.error('Error submitting contact form:', err);
      confirmation.textContent = 'Error submitting form.';
      confirmation.style.color = 'red';
    });
});

// Joke Fetcher
const jokeBtn = document.getElementById('jokeBtn');
const jokeText = document.getElementById('jokeText');

jokeBtn.addEventListener('click', function () {
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      jokeText.textContent = data.joke;
    })
    .catch((error) => {
      jokeText.textContent = 'Oops! Something went wrong.';
      console.error('Error fetching joke:', error);
    });
});

// Weather Fetcher
const weatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

weatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (city === '') {
    weatherResult.textContent = 'Please enter a city.';
    return;
  }

  const url = `https://wttr.in/${city}?format=j1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const area = data.nearest_area[0].areaName[0].value;
      const tempF = data.current_condition[0].temp_F;
      const condition = data.current_condition[0].weatherDesc[0].value;

      weatherResult.innerHTML = `🌎 <strong>${area}</strong><br>🌡️ ${tempF}°F<br>🌤️ ${condition}`;
    })
    .catch((error) => {
      console.error('Error:', error);
      weatherResult.textContent = 'Could not fetch weather data.';
    });
});
