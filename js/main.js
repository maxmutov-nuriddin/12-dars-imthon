let titleButtons = document.querySelector('.title__buttons')

titleButtons.addEventListener('click', function (e) {
  e.preventDefault();
  window.open('https://lambent-semifreddo-2c1103.netlify.app/', '_blank')
})

const container = document.querySelector('.containers');

container.addEventListener('click', (event) => {
  const target = event.target;

  if (target.matches('.fa-instagram')) {
    window.open('https://instagram.com/mv.nuriddin?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D', '_blank')
  } else if (target.matches('.fa-github-square')) {
    window.open('https://github.com/maxmutov-nuriddin/12-dars-imthon', '_blank')
  } else if (target.matches('.fa-telegram')) {
    window.open('https://t.me/mv_nuriddin', '_blank')
  }
});


// (() => {
//   'use strict';

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll('.students-form');

//   // Loop over them and prevent submission
//   Array.from(forms).forEach((form) => {
//     form.addEventListener('submit', (event) => {
//       if (!form.checkValidity()) {
//         event.stopPropagation();
//       }
//       form.classList.add('was-validated');
//     }, false);
//   });
// })();