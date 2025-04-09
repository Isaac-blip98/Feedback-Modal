// JavaScript code for the modal and rating system
// This code handles the opening and closing of a modal, rating selection, and storing ratings in localStorage
const openModalBtn = document.getElementById("openModalBtn");
const Modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");
const closeBtn = document.getElementById("closeBtn");
const ratingButtons = document.querySelectorAll(".rating-btn");
const thankYouMessage = document.getElementById("thankYouMessage");

let selectedRating = null;

// Check for previous rating and show message if exists
const lastRating = localStorage.getItem('lastRating');
if (lastRating) {
  const ratingData = JSON.parse(lastRating);
  showThankYouMessage(ratingData.message);
}

console.log("Open Modal Button:", openModalBtn);
console.log("Modal Element:", Modal);

//open modal
openModalBtn.addEventListener("click", () => {
  console.log("Open Modal Button Clicked");
  Modal.classList.remove("hidden");
  console.log("Modal Classes:", Modal.classList);
  // Reset button states
  ratingButtons.forEach(btn => btn.classList.remove("selected"));
  selectedRating = null;
});

//close modal (close button)
closeBtn.addEventListener("click", () => {
  Modal.classList.add("hidden");
});

//close modal (cancel button)
cancelBtn.addEventListener("click", () => {
  Modal.classList.add("hidden");
});

//close modal (outside click)
window.addEventListener("click", (e) => {
  if (e.target === Modal) {
    Modal.classList.add("hidden");
  }
});

//handle rating selection
ratingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    ratingButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedRating = button.textContent;
  });
});

// Function to show thank you message
function showThankYouMessage(message) {
  thankYouMessage.textContent = message;
  thankYouMessage.classList.add('show');
}

//submit feedback
submitBtn.addEventListener("click", () => {
  if (selectedRating) {
    // Store the rating with timestamp
    const ratingData = {
      rating: selectedRating,
      message: `Thank you for rating us ${selectedRating}/10!`,
      timestamp: new Date().toISOString()
    };
    
    // Store only the latest rating
    localStorage.setItem('lastRating', JSON.stringify(ratingData));
    
    // Show thank you message
    showThankYouMessage(ratingData.message);
    
    Modal.classList.add("hidden");
    selectedRating = null;
    ratingButtons.forEach((btn) => btn.classList.remove("selected"));
  } else {
    alert("Please select a rating before submitting.");
  }
});

// Function to get all stored ratings
function getStoredRatings() {
  return JSON.parse(localStorage.getItem('userRatings'));
}

