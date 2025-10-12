
// script.js — attach handlers for the demo page (non-module)
document.addEventListener('DOMContentLoaded', function () {
	var el = {
		iceCost: document.querySelector('#iceCost'),
		slots: document.querySelector('#slots'),
		fee: document.querySelector('#fee'),
		coach: document.querySelector('#coachCost'),
		jersey: document.querySelector('#jerseyCost'),
		players: document.querySelector('#numplayers'),
		total: document.querySelector('#totalCost'),
		perPlayer: document.querySelector('#costPerPlayer'),
		team: document.querySelector('#teamName'),
		logo: document.querySelector('#teamLogo'),
	};

	const teamLogos = {
		beavers: 'https://www.shutterstock.com/image-vector/badger-logo-on-isolated-background-600w-2466779549.jpg',
		bears: 'https://t4.ftcdn.net/jpg/05/12/00/91/360_F_512009117_3LDLJIpHLKQyo05cHo9SkibkLxBZ080K.jpg',
		penguins: 'https://media.istockphoto.com/id/931877984/vector/penguin-icon.jpg?s=612x612&w=0&k=20&c=n50abm_m8cViki2PFE7aEAh_jtRjT5O_Vg_dUkorH9Y=',
	};

	function calculate() {
		var iceTotal = Number(el.iceCost.value) * Number(el.slots.value);
		var subtotal = iceTotal + Number(el.coach.value) + Number(el.jersey.value);
		var total = subtotal * (1 + Number(el.fee.value) / 100);
		var players = Math.max(1, Number(el.players.value));
		var perPlayer = total / players;

		if (el.total) el.total.textContent = '$' + total.toFixed(2);
		if (el.perPlayer) el.perPlayer.textContent = '$' + perPlayer.toFixed(2);
	}

	function updateLogo() {
		var selected = (el.team.value || '').toLowerCase();
		el.logo.src = teamLogos[selected] || '';
		el.logo.alt = selected + ' logo';
	}

	// Setup + / − buttons
	var groups = document.querySelectorAll('.number-input');
	for (var i = 0; i < groups.length; i++) {
		(function (group) {
			var input = group.querySelector('input');
			var plus = group.querySelector('.plus');
			var minus = group.querySelector('.minus');

			if (plus) {
				plus.addEventListener('click', function () {
					input.value = Number(input.value) + 1;
					calculate();
				});
			}

			if (minus) {
				minus.addEventListener('click', function () {
					if (input.id === 'numplayers' && Number(input.value) <= 1) return;
					input.value = Math.max(0, Number(input.value) - 1);
					calculate();
				});
			}

			if (input) input.addEventListener('input', calculate);
		})(groups[i]);
	}

	if (el.team) el.team.addEventListener('change', function () {
		updateLogo();
		calculate();
	});

	// Initialize
	updateLogo();
	calculate();
});

