(function () {
  "use strict";

  AOS.init({
    duration: 800,
    easing: "slide",
    once: true,
  });

  var preloader = function () {
    var loader = document.querySelector(".loader");
    var overlay = document.getElementById("overlayer");

    function fadeOut(el) {
      el.style.opacity = 1;
      (function fade() {
        if ((el.style.opacity -= 0.1) < 0) {
          el.style.display = "none";
        } else {
          requestAnimationFrame(fade);
        }
      })();
    }

    setTimeout(function () {
      fadeOut(loader);
      fadeOut(overlay);
    }, 200);
  };
  preloader();

  var tinySdlier = function () {
    var heroSlider = document.querySelectorAll(".hero-slide");
    var propertySlider = document.querySelectorAll(".property-slider");
    var imgPropertySlider = document.querySelectorAll(".img-property-slide");
    var testimonialSlider = document.querySelectorAll(".testimonial-slider");

    if (heroSlider.length > 0) {
      var tnsHeroSlider = tns({
        container: ".hero-slide",
        mode: "carousel",
        speed: 700,
        autoplay: true,
        controls: false,
        nav: false,
        autoplayButtonOutput: false,
        controlsContainer: "#hero-nav",
      });
    }

    if (imgPropertySlider.length > 0) {
      var tnsPropertyImageSlider = tns({
        container: ".img-property-slide",
        mode: "carousel",
        speed: 700,
        items: 1,
        gutter: 30,
        autoplay: true,
        controls: false,
        nav: true,
        autoplayButtonOutput: false,
      });
    }

    if (propertySlider.length > 0) {
      var tnsSlider = tns({
        container: ".property-slider",
        mode: "carousel",
        speed: 700,
        gutter: 30,
        items: 3,
        autoplay: true,
        autoplayButtonOutput: false,
        controlsContainer: "#property-nav",
        responsive: {
          0: {
            items: 1,
          },
          700: {
            items: 2,
          },
          900: {
            items: 3,
          },
        },
      });
    }

    if (testimonialSlider.length > 0) {
      var tnsSlider = tns({
        container: ".testimonial-slider",
        mode: "carousel",
        speed: 700,
        items: 3,
        gutter: 50,
        autoplay: true,
        autoplayButtonOutput: false,
        controlsContainer: "#testimonial-nav",
        responsive: {
          0: {
            items: 1,
          },
          700: {
            items: 2,
          },
          900: {
            items: 3,
          },
        },
      });
    }
  };
  tinySdlier();

  //New Arrangments
  fetchAndInsertHTML("module/menu.html", "siteNav").then(() => {
    siteMenuClone();
    /*****  Mark the Link/Menu Active *****/
    // Get the current URL path
    const currentPath = window.location.pathname.split("/").pop();

    // Select all menu links
    const menuLinks = document.querySelectorAll(".site-menu a");

    // Loop through the links and add 'active' class to the matched link
    menuLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.parentElement.classList.add("active");
      }
    });
  });
  fetchAndInsertHTML("module/siteFooter.html", "siteFooter");

  
  // Add event listener to links
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      if (!href || href === '#') {
        event.preventDefault(); // Prevent the default action
        showContactUsModal(); // Show the contact us modal
      }
    });
  });
})();

function fetchAndInsertHTML(fileName, domId) {
  return fetch(fileName)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((htmlContent) => {
      const element = document.getElementById(domId);
      if (element) {
        element.innerHTML = htmlContent;
      } else {
        console.error(`Element with ID ${domId} not found.`);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}


function sendEmail(name, email, mobile, message) {
  const subject = 'Query for HIVE';
  const body = `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`;
  const email1 = 'vickysharpanch@gmail.com';
  const email2 = 'estatehivereal@gmail.com';

  console.log("Sending email",name, email, mobile, message)
  // Show modal with email details
  showEmailModal(name, email, mobile, message);

  // Uncomment the line below to enable email sending
  // window.location.href = `mailto:${email1},${email2}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// New function to show the email modal
function showEmailModal(name, email, mobile, message) {
  const modalContent = `
    <div class='modal fade' tabindex='-1' aria-labelledby='emailModalLabel' aria-hidden='true'>
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='emailModalLabel'>Email Preview</h5>
            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div class='modal-body'>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Create modal element
  const modal = document.createElement('div');
  modal.innerHTML = modalContent;
  document.body.appendChild(modal);

  var myModal = new bootstrap.Modal(modal.querySelector('.modal'));
  myModal.show();

  // Remove modal from DOM after it's hidden
  modal.querySelector('.modal').addEventListener('hidden.bs.modal', function () {
    modal.remove();
  });
}

function showContactUsModal() {
  const modalContent = `
    <div class='modal fade' tabindex='-1' aria-labelledby='inputModalLabel' aria-hidden='true'>
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='inputModalLabel'>Contact Us</h5>
            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div class='modal-body' style='padding: 10px;'>
            <form id='inputForm' novalidate>
              <div class='form-floating mb-2'>
                <input type='text' class='form-control' id='name' placeholder='Name' required minlength="5">
                <label for='name'>Name</label>
                <div class='invalid-feedback'>Name must be at least 5 characters long.</div>
              </div>
              <div class='form-floating mb-2'>
                <input type='email' class='form-control' id='email' placeholder='Email' required pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}">
                <label for='email'>Email</label>
                <div class='invalid-feedback'>Please enter a valid email address.</div>
              </div>
              <div class='form-floating mb-2'>
                <input type='text' class='form-control' id='mobile' placeholder='Mobile' required pattern="^[0-9]{10}$">
                <label for='mobile'>Mobile</label>
                <div class='invalid-feedback'>Mobile number must be a 10-digit numeric value.</div>
              </div>
              <div class='form-floating mb-2'>
                <textarea class='form-control' id='message' placeholder='Message' rows='2' required minlength="30"></textarea>
                <label for='message'>Message</label>
                <div class='invalid-feedback'>Message must be at least 30 characters long.</div>
              </div>
            </form>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
            <button type='button' class='btn btn-primary' id='submitInput'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Create modal element
  const modal = document.createElement('div');
  modal.innerHTML = modalContent;
  document.body.appendChild(modal);

  var myModal = new bootstrap.Modal(modal.querySelector('.modal'));
  myModal.show();

  // Handle form submission
  modal.querySelector('#submitInput').addEventListener('click', function() {
    const form = modal.querySelector('#inputForm');
    
    // Check if the form is valid
    if (form.checkValidity()) {
      const name = modal.querySelector('#name').value;
      const email = modal.querySelector('#email').value;
      const mobile = modal.querySelector('#mobile').value;
      const message = modal.querySelector('#message').value;

      // Call sendEmail with the input values
      sendEmail(name, email, mobile, message);
      // Close the modal
      myModal.hide();
    } else {
      // Trigger validation messages
      form.classList.add('was-validated');
    }
  });

  // Remove modal from DOM after it's hidden
  modal.querySelector('.modal').addEventListener('hidden.bs.modal', function () {
    modal.remove();
  });
}

