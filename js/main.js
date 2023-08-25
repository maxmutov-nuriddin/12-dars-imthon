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