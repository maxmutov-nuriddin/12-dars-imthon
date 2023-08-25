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


const time = document.getElementById("time");
const day = document.getElementById("day");
const midday = document.getElementById("midday");

let clock = setInterval(
	function calcTime() {
		let date_now = new Date();
		let hr = date_now.getHours();
		let min = date_now.getMinutes();
		let sec = date_now.getSeconds();
		let middayValue = "AM";

		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		day.textContent = days[date_now.getDay()];

		middayValue = hr >= 12 ? "PM" : "AM";

		if (hr == 0) {
			hr = 12;
		} else if (hr > 12) {
			hr -= 12;
		}

		hr = hr < 10 ? "0" + hr : hr;
		min = min < 10 ? "0" + min : min;
		sec = sec < 10 ? "0" + sec : sec;

		time.textContent = hr + ":" + min + ":" + sec;
		midday.textContent = middayValue;
	},

	1000
);
