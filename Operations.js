/* Mobile Navigation Toggle */
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

/* Animated Counters (Stats Section) */
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  // Start all counters at 0
  counter.innerText = '0';
  const updateCount = () => {
    const target = Number(counter.getAttribute('data-target'));
    const current = Number(counter.innerText);
    // Determine increment step (smaller for larger targets for smoothness)
    const step = Math.ceil(target / 200); // adjust 200 for speed of animation
    if(current < target) {
      counter.innerText = current + step;
      setTimeout(updateCount, 20); // update every 20ms
    } else {
      counter.innerText = target; // ensure exact target value
    }
  };
  // Optionally, use IntersectionObserver to trigger when visible
  updateCount();
});

/* Testimonials Slider */
const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentTestimonial = 0;
function showTestimonial(index) {
  // Loop within bounds
  if(index < 0) index = testimonials.length - 1;
  if(index >= testimonials.length) index = 0;
  currentTestimonial = index;
  // Hide all and show the targeted one
  testimonials.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}
if(prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
  nextBtn.addEventListener('click', () => showTestimonial(currentTestimonial + 1));
}
// (Optional) Auto-rotate testimonials every 5 seconds:
// setInterval(() => showTestimonial(currentTestimonial + 1), 5000);

/* Countdown Timer for Special Offer */
const countdownEl = document.getElementById('countdown');
if(countdownEl) {
  // Set offer deadline (e.g., 7 days from now)
  const now = new Date();
  const deadline = new Date(now.getTime() + 7*24*60*60*1000); // 7 days later
  const countdownInterval = setInterval(() => {
    const nowTime = new Date().getTime();
    const distance = deadline.getTime() - nowTime;
    if(distance < 0) {
      clearInterval(countdownInterval);
      countdownEl.textContent = "EXPIRED";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display in format "Xd Yh Zm Ws"
      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}

/* Pricing Calculator Interactivity */
const tourSelect = document.getElementById('tourSelect');
const numPeople = document.getElementById('numPeople');
const addGuide = document.getElementById('addGuide');
const totalPriceEl = document.getElementById('totalPrice');
function updatePrice() {
  if(!totalPriceEl) return;
  const basePrice = Number(tourSelect.value) || 0;
  const peopleCount = Number(numPeople.value) || 1;
  const guideCost = addGuide.checked ? Number(addGuide.value) : 0;
  const total = basePrice * peopleCount + guideCost;
  totalPriceEl.textContent = total;
}
if(tourSelect && numPeople && addGuide) {
  tourSelect.addEventListener('change', updatePrice);
  numPeople.addEventListener('input', updatePrice);
  addGuide.addEventListener('change', updatePrice);
  updatePrice(); // initial calculation
}

/* Form Real-time Validation (example for Email field) */
const emailField = document.querySelector('input[name="email"]');
if(emailField) {
  const emailMsg = document.createElement('small');
  emailMsg.style.color = 'red';
  emailMsg.style.fontStyle = 'italic';
  emailField.parentNode.appendChild(emailMsg);  // add message element after the input
  emailField.addEventListener('input', () => {
    if(emailField.validity.typeMismatch || emailField.validity.patternMismatch) {
      emailMsg.textContent = "Please enter a valid email address.";
    } else {
      emailMsg.textContent = "";
    }
  });
}

/* Dark Mode Toggle with LocalStorage */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
// Load theme preference on page load
if(localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  if(themeToggle) themeToggle.textContent = '☀️'; // show sun icon if dark mode
}
if(themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Save preference
    if(body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️'; // switch to sun to indicate light mode available
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
    }
  });
}

/* Reveal on Scroll (IntersectionObserver) */
const revealElems = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElems.forEach(el => observer.observe(el));
} else {
  // Fallback: if IntersectionObserver not supported, just show all
  revealElems.forEach(el => el.classList.add('revealed'));
}

/* Page load event to trigger fade-in */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

/* Emoji Picker Toggle */
document.addEventListener('DOMContentLoaded', () => {
  const emojiToggle = document.getElementById('emojiToggle');
  const emojiPicker = document.getElementById('emojiPicker');
  const chatInput = document.getElementById('chatInput');

  if (emojiToggle && emojiPicker && chatInput) {
    emojiToggle.addEventListener('click', () => {
      emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'flex' : 'none';
    });

    emojiPicker.querySelectorAll('.emoji').forEach(emoji => {
      emoji.addEventListener('click', () => {
        chatInput.value += emoji.textContent;
        emojiPicker.style.display = 'none';
        chatInput.focus();
      });
    });
  }
});