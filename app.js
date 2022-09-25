const userslist = document.querySelector('.userslist');

async function generate() {
	let usercount = document.querySelector("#usercount").value;
	let country = document.querySelector("#nationality").value;
	let countryname = document.querySelector("#nationality");
	let text = countryname.options[countryname.selectedIndex].text;

	function displaybackground() {
		if (country != null) {
			document.querySelector(".userbackground").style.backgroundImage = "url('img/" + country + ".webp')";
			document.querySelector(".countryname").innerHTML = text;
		}
	}
	try{
		await fetch(`https://randomuser.me/api/?results=${usercount}&nat=${country}`)
		.then(response => response.json())
		.then(response => response.results)
		.then(displayUsers)
		.then(displaybackground)
	} catch{
		console.log('error api fetching');
	}
	
}

function displayUsers(userData) {
	users = userData;

	let userHTML = ``;
	users.forEach((user, i) => {
		userHTML += `
		<div class="card-user">
		<span id="${i}" class="more-btn material-symbols-outlined">more_horiz</span>
		<div class="important-information">
		  <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}" class="card-image" />
		  <p class="card-name">${user.name.first} ${user.name.last}</p>
		  <br>
		  <p class="card-address">${user.location.city},${user.location.country}</p>
		</div>
		<div id="${i}" class="more-information">
		  <br>
		  <address>
			<p>
			  <span class="infoicon material-symbols-outlined"> home </span> ${user.location.street.name}, ${user.location.street.number},
			</p>
			<p>${user.location.postcode} ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
			<p>
			  <span class="infoicon material-symbols-outlined"> mail </span> ${user.email}
			</p>
			<p>
			  <span class="infoicon material-symbols-outlined"> call </span> ${user.phone}
			</p>
		  </address>
		</div>
	  </div>
     `;
	});
	userslist.innerHTML = userHTML;

}

addEventListener('click', (event) => {});

onclick = (event) => {
	if ($(event.target).hasClass('material-symbols-outlined')) {
		show(event.target.id);
	}
};

function show(e) {
	if ($('#' + e + ".more-information").is(':visible')) {
		$('#' + e + ".more-information").css('display', 'none')
	} else {
		$('#' + e + ".more-information").css('display', 'block')
	}
}