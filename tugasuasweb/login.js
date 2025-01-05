window.onload = function() {
    const userResponse = confirm("Mohon Maaf! Untuk saat ini form login belum bisa digunakan.");
    if (userResponse) {
        window.location.href = "index.html";
    }
};

const signUpLink = document.getElementById('sign-up-link');
const loginLink = document.getElementById('login-link');
const loginBox = document.querySelector('.login-box');
const signUpBox = document.querySelector('.sign-up-box');

signUpLink.addEventListener('click', () => {
    loginBox.style.display = 'none';
    signUpBox.style.display = 'block';
});

loginLink.addEventListener('click', () => {
    signUpBox.style.display = 'none';
    loginBox.style.display = 'block';
});
