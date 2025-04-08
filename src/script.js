// JavaScript code for the modal and rating system
// This code handles the opening and closing of a modal, rating selection, and storing ratings in localStorage
const openModalBtn = document.getElementById("openModalBtn");
const Modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");
const closeBtn = document.getElementById("closeBtn");
const ratingButtons = document.querySelectorAll(".rating-btn");

let selectedRating = null;

// Check for previous rating in localStorage
const storedRatings = JSON.parse(localStorage.getItem('userRatings')) || [];

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

//submit feedback
submitBtn.addEventListener("click", () => {
  if (selectedRating) {
    // Store the rating with timestamp
    const ratingData = {
      rating: selectedRating,
      timestamp: new Date().toISOString()
    };
    
    storedRatings.push(ratingData);
    localStorage.setItem('userRatings', JSON.stringify(storedRatings));
    
    alert(`Thank you for rating us ${selectedRating}/10!`);
    Modal.classList.add("hidden");
    selectedRating = null;
    ratingButtons.forEach((btn) => btn.classList.remove("selected"));
    
    console.log('Stored Ratings:', storedRatings);
  } else {
    alert("Please select a rating before submitting.");
  }
});

// Function to get all stored ratings
function getStoredRatings() {
  return JSON.parse(localStorage.getItem('userRatings')) || [];
}

