 /* =========================================
   TRIPMATE – CLEAN & OPTIMIZED JAVASCRIPT
   ========================================= */

/* ===============================
   1. Sticky Navbar
   =============================== */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".new-navbar");
  if (window.scrollY > 50) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
});

/* ===============================
   2. Hero Section Animations
   =============================== */
// Hero Text Fade-in on Scroll
window.addEventListener("scroll", () => {
  const textElements = document.querySelectorAll(".animate");
  textElements.forEach((el) => {
    const position = el.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    if (position < screenPos) el.classList.add("visible");
  });
});

// Scroll Down Arrow
const arrow = document.querySelector(".left-text .arrow");
if (arrow) {
  arrow.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });
}



/* ===============================
   4. TripMate Booking Form
   =============================== */
const tripmateForm = document.getElementById("tripmateBookingForm");
if (tripmateForm) {
  const buttons = document.querySelectorAll(".budget-buttons button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  tripmateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your TripMate booking request has been sent successfully.");
    tripmateForm.reset();
    buttons.forEach((b) => b.classList.remove("active"));
  });
}
/* ===============================
   4.1 Auto-select Destination from URL
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDestination = urlParams.get("destination");

  if (selectedDestination) {
    const destinationSelect = document.getElementById("destination");
    if (destinationSelect) {
      for (let i = 0; i < destinationSelect.options.length; i++) {
        if (destinationSelect.options[i].value === selectedDestination) {
          destinationSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
});
// ===============================
// Auto-select Category from URL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category");
  if (selectedCategory) {
    const categorySelect = document.getElementById("category");
    if (categorySelect) {
      for (let i = 0; i < categorySelect.options.length; i++) {
        if (categorySelect.options[i].value === selectedCategory) {
          categorySelect.selectedIndex = i;
          break;
        }
      }
    }
  }
});

/* ===============================
   5. Loader
   =============================== */
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.remove("active"), 1500);
});
document.addEventListener("DOMContentLoaded", () => {
  loader.classList.add("active");
});

/* ===============================
   6. Fade-in Animations via IntersectionObserver
   =============================== */
const fadeTargets = document.querySelectorAll(".fade-in, .trip-card, .offer-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
fadeTargets.forEach((el) => observer.observe(el));

/* ===============================
   7. Smooth Scrolling for Anchor Links
   =============================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute("href");
    if (targetId !== "#") {
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  });
});

/* ===============================
   8. Trip Cards Carousel
   =============================== */
const tripCardsContainer = document.getElementById("tripCards");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const scrollAmount = 320;
const scrollDelay = 4000;
let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (
      tripCardsContainer.scrollLeft + tripCardsContainer.clientWidth >=
      tripCardsContainer.scrollWidth - 10
    ) {
      tripCardsContainer.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      tripCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, scrollDelay);
}

function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  startAutoScroll();
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    tripCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    resetAutoScroll();
  });

  prevBtn.addEventListener("click", () => {
    tripCardsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    resetAutoScroll();
  });

  tripCardsContainer.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
  tripCardsContainer.addEventListener("mouseleave", startAutoScroll);
  startAutoScroll();
}

/* ===============================
   9. Cookie Notice
   =============================== */
const cookieNotice = document.getElementById("cookieNotice");
const acceptCookies = document.getElementById("acceptCookies");

if (cookieNotice && acceptCookies) {
  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => cookieNotice.classList.add("active"), 2000);
  }

  acceptCookies.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieNotice.classList.remove("active");
  });
}

/* ===============================
   10. Newsletter Form
   =============================== */
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  const emailInput = newsletterForm.querySelector('input[type="email"]');

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    alert(`Thank you for subscribing with ${email}!`);
    newsletterForm.reset();
  });

  emailInput.addEventListener("blur", () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    emailInput.style.borderColor = valid ? "#ddd" : "red";
  });
}

/* ===============================
   11. Card Hover Effects
   =============================== */
document.querySelectorAll(".trip-card, .hotel, .offer-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "";
  });
});

/* ===============================
   12. Hero Video Fallback
   =============================== */
const heroVideo = document.querySelector(".hero video");
if (heroVideo) {
  heroVideo.addEventListener("error", () => {
    document.querySelector(".hero").style.background =
      "url('images/travel-fallback.jpg') center/cover no-repeat";
  });
}

/* ===============================
   13. Image Lightbox
   =============================== */
document.querySelectorAll(".hotel-img, .trip-card img, .offer-img").forEach((img) => {
  img.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    Object.assign(lightbox.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
      cursor: "zoom-out",
    });

    const lightboxImg = document.createElement("img");
    Object.assign(lightboxImg.style, {
      maxWidth: "90%",
      maxHeight: "90%",
      borderRadius: "8px",
      objectFit: "contain",
    });

    lightboxImg.src = img.src;
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    lightbox.addEventListener("click", () => lightbox.remove());
  });
});

/* ===============================
   14. Booking Confirmation Modal
   =============================== */
document.querySelectorAll(".book-offer-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.createElement("div");
    Object.assign(modal.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
    });

    const modalContent = document.createElement("div");
    modalContent.innerHTML = `
      <h3>Booking Confirmation</h3>
      <p>Thank you for booking with TripMate! Our team will contact you soon.</p>
      <button id="closeModal" 
        style="background:#111;color:white;border:none;padding:10px 20px;
        border-radius:6px;margin-top:20px;cursor:pointer;">Close</button>
    `;

    Object.assign(modalContent.style, {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "12px",
      maxWidth: "500px",
      width: "90%",
      textAlign: "center",
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.id === "closeModal") modal.remove();
    });
  });
});

/* ===============================
   15. Typing Effect in Hero Text
   =============================== */
const heroTitle = document.querySelector(".hero-text h1");
if (heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";
  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  setTimeout(typeWriter, 800);
}


/* ===============================
   16. Countdown Timer for Offers
   =============================== */
function createCountdownTimer() {
  const offers = document.querySelectorAll(".offer-card");
  offers.forEach((offer, i) => {
    const countdownEl = document.createElement("div");
    countdownEl.className = "countdown-timer";
    countdownEl.style.cssText = `
      background:#111;color:white;padding:8px 12px;border-radius:4px;
      font-size:14px;font-weight:600;margin-bottom:10px;display:inline-block;
    `;

    const endTimes = [
      Date.now() + 24 * 60 * 60 * 1000,
      Date.now() + 48 * 60 * 60 * 1000,
      Date.now() + 72 * 60 * 60 * 1000,
    ];
    const endTime = endTimes[i] || endTimes[0];

    const updateCountdown = () => {
      const now = Date.now();
      const diff = endTime - now;
      if (diff < 0) return (countdownEl.textContent = "Offer Expired");

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      countdownEl.textContent = `${h}h ${m}m ${s}s`;
    };

    const bookBtn = offer.querySelector(".book-offer-btn");
    bookBtn.parentNode.insertBefore(countdownEl, bookBtn);
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
}
createCountdownTimer();

/* ===============================
   17. Dream Section Image Fade
   =============================== */
const dreamImages = document.querySelectorAll(".dream-img");
if (dreamImages.length > 0) {
  let currentDream = 0;
  function cycleDreamImages() {
    dreamImages.forEach((img) => img.classList.remove("active"));
    dreamImages[currentDream].classList.add("active");
    currentDream = (currentDream + 1) % dreamImages.length;
  }
  setInterval(cycleDreamImages, 3000);
}



/* ===============================
   Booking Form Submission
=============================== */
async function submitBooking(event) {
  event.preventDefault();

  const token = localStorage.getItem('tripmate_token');
  if (!token) {
    alert('Please log in before making a booking.');
    window.location.href = '/login';
    return;
  }

  const bookingData = {
    fullName: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
    destination: document.getElementById('destination').value,
     category: document.getElementById('category').value,
    passengers: document.getElementById('passengers').value,
    phone: document.getElementById('phone').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Booking created successfully!');
      document.getElementById('tripmateBookingForm').reset();
    } else {
      alert(`❌ Error: ${data.error || 'Something went wrong.'}`);
    }
  } catch (error) {
    console.error('Booking submission failed:', error);
    alert('❌ Failed to send booking request. Please try again later.');
  }

  return false;
}

/* ===============================
   19. FETCH & DISPLAY USER BOOKINGS
=============================== */
async function fetchMyBookings() {
  const grid = document.getElementById('bookingsGrid');
  const empty = document.getElementById('bookingsEmpty');
  const notice = document.getElementById('loginNotice');

  if (!grid) return; // not on this page
notice.classList.add('hidden');
empty.classList.add('hidden');
grid.innerHTML = '';

  if (!isLoggedIn()) {
    notice.classList.remove('hidden');
    return;
  }

  try {
    const res = await fetch('/api/bookings/my', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to load bookings');

    const bookings = await res.json();

    if (!bookings.length) {
      empty.classList.remove('hidden');
      return;
    }

    grid.innerHTML = bookings.map(b => bookingCardHTML(b)).join('');
    attachCardHandlers();
  } catch (err) {
    console.error(err);
    empty.classList.remove('hidden');
  }
}

function bookingCardHTML(b) {
  return `
  <article class="booking-card" data-id="${b.id}">
    <div class="booking-header">
      <h3>${b.destination}</h3>
      <span class="badge">#${b.id}</span>
    </div>
    <div class="booking-body">
      <p><strong>Name:</strong> ${b.fullName}</p>
      <p><strong>Email:</strong> ${b.email}</p>
        <p><strong>Category:</strong> ${b.category || '-'}</p>
      <p><strong>Passengers:</strong> ${b.passengers}</p>
      <p><strong>Phone:</strong> ${b.phone}</p>
      <p><strong>Message:</strong> ${b.message || '-'}</p>
      <p class="muted">Created: ${new Date(b.createdAt).toLocaleString()}</p>
    </div>
    <div class="booking-actions">
      <button class="btn btn-outline edit-btn" data-id="${b.id}">Edit</button>
      <button class="btn btn-danger delete-btn" data-id="${b.id}">Cancel</button>
    </div>
  </article>`;
}

function attachCardHandlers() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.id));
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteBooking(btn.dataset.id));
  });
}

/* ===============================
   20. EDIT BOOKING MODAL
=============================== */
async function openEditModal(id) {
  try {
    const card = document.querySelector(`.booking-card[data-id="${id}"]`);
    const dest = card.querySelector('.booking-header h3').textContent.trim();
    const passengersText = card.querySelector('.booking-body').innerHTML.match(/<strong>Passengers:<\/strong>\s*(\d+)/);
    const passengers = passengersText ? Number(passengersText[1]) : 1;
    const phoneMatch = card.querySelector('.booking-body').innerHTML.match(/<strong>Phone:<\/strong>\s*([^<]+)/);
    const phone = phoneMatch ? phoneMatch[1].trim() : '';
    const msgMatch = card.querySelector('.booking-body').innerHTML.match(/<strong>Message:<\/strong>\s*([^<]+)/);
    const message = msgMatch ? msgMatch[1].trim() : '';

    document.getElementById('editId').value = id;
    document.getElementById('editDestination').value = dest;
    document.getElementById('editPassengers').value = passengers;
    document.getElementById('editPhone').value = phone;
    document.getElementById('editMessage').value = message;

    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editModal').setAttribute('aria-hidden', 'false');
  } catch (err) {
    console.error(err);
    alert('Could not open edit form.');
  }
}

document.getElementById('closeEditModal')?.addEventListener('click', () => {
  document.getElementById('editModal').classList.add('hidden');
  document.getElementById('editModal').setAttribute('aria-hidden', 'true');
});

document.getElementById('editBookingForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const payload = {
    destination: document.getElementById('editDestination').value.trim(),
    passengers: Number(document.getElementById('editPassengers').value),
    phone: document.getElementById('editPhone').value.trim(),
    message: document.getElementById('editMessage').value.trim()
  };

  try {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Update failed');
    document.getElementById('editModal').classList.add('hidden');
    await fetchMyBookings();
  } catch (err) {
    console.error(err);
    alert('Could not update booking.');
  }
});

/* ===============================
   21. DELETE BOOKING
=============================== */
async function deleteBooking(id) {
  if (!confirm('Are you sure you want to cancel this booking?')) return;
  try {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Delete failed');
    document.querySelector(`.booking-card[data-id="${id}"]`)?.remove();
    if (!document.querySelector('.booking-card')) {
      document.getElementById('bookingsEmpty')?.classList.remove('hidden');
    }
  } catch (err) {
    console.error(err);
    alert('Could not cancel booking.');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.toLowerCase().includes('bookings')) {
    document.querySelectorAll('.new-navbar a, .new-navbar .btn-nav')
      .forEach(el => (el.style.color = '#000'));
  }
});
  document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('tripmate_token');
        alert('You have been logged out.');
        window.location.href = '/';
      });
    }
  });
/* ===============================
   22. INIT ON PAGE LOAD (FIXED)
=============================== */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.toLowerCase();

  // Run on any page that contains "bookings"
  if (path.includes('bookings')) {
    console.log('🟤 My Bookings page detected');
    fetchMyBookings();
  } else {
    console.log('ℹ️ Not a bookings page:', path);
  }
});

/* ===============================
   AUTHENTICATION & USER MANAGEMENT
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  
  /* ===============================
     1. SIGNUP FORM HANDLER
     =============================== */
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirm = document.getElementById("confirm").value;
      const message = document.getElementById("signupMessage");

      console.log("📝 Signup form data:", { name, email, password: "***" });

      if (!name || !email || !password) {
        message.style.color = 'red';
        message.textContent = 'Please fill in all fields!';
        return;
      }

      if (password !== confirm) {
        message.style.color = 'red';
        message.textContent = 'Passwords do not match!';
        return;
      }

      try {
        console.log("🚀 Sending signup request...");
        const response = await fetch("/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        console.log("📡 Response status:", response.status);
        const data = await response.json();
        console.log("📦 Response data:", data);

        if (response.ok) {
          message.style.color = 'green';
          message.textContent = `Welcome to TripMate, ${name}! Redirecting to login...`;
          localStorage.setItem("tripmate_signed_up", "true");
          
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        } else {
          message.style.color = 'red';
          message.textContent = data.error || "Signup failed. Please try again.";
        }
      } catch (err) {
        console.error("❌ Signup error:", err);
        message.style.color = 'red';
        message.textContent = "Connection error. Please try again.";
      }
    });
  }

  /* ===============================
     2. LOGIN FORM HANDLER
     =============================== */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const message = document.getElementById('loginMessage');

      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('tripmate_token', data.token);
          message.style.color = 'green';
          message.textContent = 'Login successful! Redirecting...';

          setTimeout(() => {
            window.location.href = '/my-bookings';
          }, 1000);
        } else {
          message.style.color = 'red';
          message.textContent = data.error || 'Login failed. Please try again.';
        }
      } catch (err) {
        console.error('Login error:', err);
        message.style.color = 'red';
        message.textContent = 'Connection error. Please check your internet.';
      }
    });
  }

  /* ===============================
     3. LOGOUT HANDLER
     =============================== */
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("tripmate_token");
      localStorage.removeItem("tripmate_signed_up");
      alert("You have been logged out.");
      window.location.href = "/";
    });
  }

  /* ===============================
     4. DYNAMIC NAVBAR LINKS
     =============================== */
  const authLinks = document.getElementById("authLinks");
  if (authLinks) {
    const token = localStorage.getItem("tripmate_token");
    const hasSignedUp = localStorage.getItem("tripmate_signed_up");

    let html = '';

    if (token && token !== "null" && token !== "undefined") {
      // User is logged in
      html = `
        <a href="/my-bookings" class="btn-nav bookings">My Bookings</a>
        <a href="#" id="navbarLogout" class="btn-nav logout-text">Logout</a>
      `;
    } else if (hasSignedUp === "true") {
      // User signed up but not logged in
      html = `
        <a href="/login" class="btn-nav">Login</a>
        <a href="/my-bookings" class="btn-nav bookings">My Bookings</a>
      `;
    } else {
      // New visitor
      html = `
        <a href="/signup" class="btn-nav signup">Sign Up</a>
        <a href="/login" class="btn-nav">Login</a>
        <a href="/my-bookings" class="btn-nav bookings">My Bookings</a>
      `;
    }

    authLinks.innerHTML = html;

    // Add logout handler for navbar
    const navbarLogout = document.getElementById("navbarLogout");
    if (navbarLogout) {
      navbarLogout.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("tripmate_token");
        localStorage.removeItem("tripmate_signed_up");
        alert("You have been logged out.");
        window.location.href = "/";
      });
    }
  }
});

/* ===============================
   5. AUTH HELPER FUNCTIONS
   =============================== */
function getToken() {
  return localStorage.getItem('tripmate_token') || '';
}

function isLoggedIn() {
  return !!getToken();
}
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".search-toggle");
  const box = document.querySelector(".search-box");

  console.log("Toggle:", toggle);
  console.log("Box:", box);

  if (toggle && box) {
    toggle.addEventListener("click", () => {
      console.log("Search icon clicked!");
      box.classList.toggle("hidden");
    });
  }
});
