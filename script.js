document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('appointment-form');
  
  
  const requiredFields = form.querySelectorAll('[required]:not([type="radio"])');
  
  
  const radioFields = form.querySelectorAll('input[type="radio"][name="gender"]');
  
  
  const phoneField = document.getElementById('phone');
  const emailField = document.getElementById('email');
  
  
  const phonePattern = /^\+61\d{9}$/;
  const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
  
  form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    let isValid = true;
    
    
    requiredFields.forEach(function (field) {
      const errorMessage = field.nextElementSibling;
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'red';
        if (errorMessage) {
          errorMessage.textContent = 'This field is required.';
          errorMessage.style.color = 'red';
        }
      } else {
        field.style.borderColor = '#ccc';
        if (errorMessage) {
          errorMessage.textContent = '';
        }
      }
    });
    
    
    if (phoneField.value.trim() && !phonePattern.test(phoneField.value.trim())) {
      isValid = false;
      phoneField.style.borderColor = 'red';
      const errorMessage = phoneField.nextElementSibling;
      if (errorMessage) {
        errorMessage.textContent = 'Please enter a valid phone number (+61XXXXXXXXXX).';
        errorMessage.style.color = 'red';
      }
    }
    
    
    if (emailField.value.trim() && !emailPattern.test(emailField.value.trim())) {
      isValid = false;
      emailField.style.borderColor = 'red';
      const errorMessage = emailField.nextElementSibling;
      if (errorMessage) {
        errorMessage.textContent = 'Please enter a valid Gmail address (example@gmail.com).';
        errorMessage.style.color = 'red';
      }
    }
    
    
    const genderFieldset = form.querySelector('fieldset');
    const genderError = genderFieldset.querySelector('.error-message');
    const isGenderSelected = Array.from(radioFields).some(radio => radio.checked);
    if (!isGenderSelected) {
      isValid = false;
      if (genderError) {
        genderError.textContent = 'Please select a gender.';
        genderError.style.color = 'red';
      }
      
      radioFields.forEach(radio => {
        radio.style.outline = '1px solid red';
      });
    } else {
      if (genderError) {
        genderError.textContent = '';
      }
      radioFields.forEach(radio => {
        radio.style.outline = '';
      });
    }
    
    if (!isValid) {
      
      return;
    } else {
      
      form.style.display = 'none';
      let thankYouMessage = document.getElementById('thank-you');
      if (!thankYouMessage) {
        thankYouMessage = document.createElement('div');
        thankYouMessage.id = 'thank-you';
        thankYouMessage.style.fontSize = '1.5em';
        thankYouMessage.style.textAlign = 'center';
        thankYouMessage.style.marginTop = '20px';
        thankYouMessage.textContent = 'Thank you for your submission!';
        form.parentNode.insertBefore(thankYouMessage, form.nextSibling);
      } else {
        thankYouMessage.style.display = 'block';
      }
      
      setTimeout(function () {
        location.reload();
      }, 2000);
    }
  });
});
