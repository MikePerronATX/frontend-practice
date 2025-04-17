// Select elements from the page
const button = document.getElementById('changeBtn');
const message = document.getElementById('message');

// Track whether we're showing the original message
let showingOriginal = true;

// Create a function to toggle the message
function toggleText() {
  if (showingOriginal) {
    message.textContent = '🎉 You clicked the button!';
  } else {
    message.textContent = 'Click the button to change this message.';
  }
  showingOriginal = !showingOriginal;
}

// Tell the button to run the toggle function when clicked
button.addEventListener('click', toggleText);

// Select elements
const addHobbyBtn = document.getElementById('addHobbyBtn');
const newHobbyInput = document.getElementById('newHobby');
const hobbyList = document.getElementById('hobbyList');

// Function to add a new hobby
function addHobby() {
  const hobbyText = newHobbyInput.value.trim();

  if (hobbyText !== '') {
    const newItem = document.createElement('li');
    newItem.textContent = hobbyText;

    // Optional: add a little style or class
    newItem.style.fontWeight = 'bold';

    // Bonus: remove on click
    newItem.addEventListener('click', function () {
      newItem.remove();
    });

    hobbyList.appendChild(newItem);
    newHobbyInput.value = ''; // Clear input
  }
}

// Attach event listener
addHobbyBtn.addEventListener('click', addHobby);
