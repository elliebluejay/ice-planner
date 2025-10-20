document.addEventListener('DOMContentLoaded', function () {
    var el = {
        iceCost: document.querySelector('#iceCost'),
        slots: document.querySelector('#slots'),
        fee: document.querySelector('#fee'),
        coach: document.querySelector('#coachCost'),
        jersey: document.querySelector('#jerseyCost'),
        players: document.querySelector('#numplayers'),
        jerseyTotal: document.querySelector('#jerseytotal'),
        total: document.querySelector('#totalCost'),
        perPlayer: document.querySelector('#costPerPlayer'),
        team: document.querySelector('#teamName'),
        logo: document.querySelector('#teamLogo'),
    };

    const teamLogos = {
        beavers: 'https://thumbs.dreamstime.com/b/beaver-icon-simple-style-white-background-79538857.jpg?w=768',
        bears: 'https://t4.ftcdn.net/jpg/05/12/00/91/360_F_512009117_3LDLJIpHLKQyo05cHo9SkibkLxBZ080K.jpg',
        penguins: 'https://media.istockphoto.com/id/926934398/vector/penguin-icon.jpg?s=612x612&w=0&k=20&c=BrMOW72lM3Iuze0oD6dSobceTmCA5IX9NQCalyylL5E='
    };

    
    const toggleButton = document.getElementById('toggleDarkMode');

    function applyDarkMode(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark);
    }

    if (localStorage.getItem('darkMode') === 'true') {
        applyDarkMode(true);
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('dark-mode');
            applyDarkMode(isDark);
        });
    }

    function calculate() {
        var iceTotal = Number(el.iceCost.value) * Number(el.slots.value);
        var jerseyTotal = Number(el.jersey.value) * Number(el.players.value);
        var subtotal = iceTotal + Number(el.coach.value) + jerseyTotal;
        var total = subtotal * (1 + Number(el.fee.value) / 100);
        var players = Math.max(1, Number(el.players.value));
        var perPlayer = total / players;

        if (el.jerseyTotal) el.jerseyTotal.textContent = '$' + jerseyTotal.toFixed(2);
        if (el.total) el.total.textContent = '$' + total.toFixed(2);
        if (el.perPlayer) el.perPlayer.textContent = '$' + perPlayer.toFixed(2);
    }

    function updateLogo() {
        var selected = (el.team.value || '').toLowerCase();
        el.logo.src = teamLogos[selected] || '';
        el.logo.alt = selected + ' logo';
    }

    // Inputs that affect total
    if (el.jersey) el.jersey.addEventListener('input', calculate);
    if (el.players) el.players.addEventListener('input', calculate);
    if (el.iceCost) el.iceCost.addEventListener('input', calculate);
    if (el.slots) el.slots.addEventListener('input', calculate);
    if (el.coach) el.coach.addEventListener('input', calculate);
    if (el.fee) el.fee.addEventListener('input', calculate);

    // + / − buttons
    var groups = document.querySelectorAll('.number-input');
    groups.forEach(group => {
        var input = group.querySelector('input');
        var plus = group.querySelector('.plus');
        var minus = group.querySelector('.minus');

        if (plus) plus.addEventListener('click', () => {
            input.value = Number(input.value) + 1;
            calculate();
        });

        if (minus) minus.addEventListener('click', () => {
            if (input.id === 'numplayers' && Number(input.value) <= 1) return;
            input.value = Math.max(0, Number(input.value) - 1);
            calculate();
        });

        if (input) input.addEventListener('input', calculate);
    });

    if (el.team) el.team.addEventListener('change', function () {
        updateLogo();
        calculate();
    });

    // Initial calculation
    updateLogo();
    calculate();
});
 
 