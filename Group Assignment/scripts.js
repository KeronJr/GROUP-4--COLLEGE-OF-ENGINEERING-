// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const messageDiv = document.getElementById('message');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);
        
      fetch('http://localhost:5500/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
          messageDiv.textContent = response.message;
          contactForm.reset();
        });
    });
  });
  