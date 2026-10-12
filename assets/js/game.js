$(document).ready(() => {

    let poopLevel = 0;
    let playing = false;
    let score = 0;

    // Bootstrap Modal
    const gameModal = new bootstrap.Modal('#gameModal');

    // Player name
    $('#login').on('click', () => {

        let username = $('#username').val();

        if (username === '') {
            username = 'Guest' + Math.floor(Math.random() * 100);
        }

        $('#greeting').text('Welcome, ' + username + '!');

    });

    // START
    $('#start').on('click', () => {

        poopLevel = 0;
        score = 0;
        playing = true;

        $('#poopLevel').text(0);
        $('#poopMeter').css('width', '0%');
        $('#score').text(0);
        $('#finalScore').text('No game played yet.');
        $('#message').text('Hold your poop! 💩');

    });

    // HOLD
    $('#hold').on('click', () => {

        if (playing === true) {

            poopLevel += 10;
            score += 10;

            $('#poopLevel').text(poopLevel);
            $('#poopMeter').css('width', poopLevel + '%');
            $('#score').text(score);

            // 20% chance of losing
            if (Math.random() < 0.2) {

                $('#message').text('YOU POOPED YOUR PANTS! 💩');
                $('#finalScore').text('Your Score: ' + score);

                $('#modalMessage').text('YOU POOPED YOUR PANTS! 💩 Your Score: ' + score);
                gameModal.show();

                playing = false;

            } else if (poopLevel >= 90) {

                $('#message').text('YOU WIN! 🚽');
                $('#finalScore').text('Your Score: ' + score);

                $('#modalMessage').text('YOU WIN! 🚽 Your Score: ' + score);
                gameModal.show();

                playing = false;

            }
        }

    });

    // RESET
    $('#reset').on('click', () => {

        poopLevel = 0;
        score = 0;
        playing = false;

        $('#poopLevel').text(0);
        $('#poopMeter').css('width', '0%');
        $('#score').text(0);
        $('#finalScore').text('No game played yet.');
        $('#message').text('Press START to play!');

    });

});