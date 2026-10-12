$(document).ready(() => {

    let poopLevel = 0;
    let score = 0;
    let playing = false;
    let username = 'Guest' + Math.floor(Math.random() * 100);
    let difficulty = 0.1;

    const gameModal = new bootstrap.Modal('#gameModal');

    // Show guest name
    $('#greeting').text('Welcome, ' + username + '!');

    // Player name
    $('#login').on('click', () => {

        username = $('#username').val();

        if (username === '') {
            username = 'Guest' + Math.floor(Math.random() * 100);
        }

        $('#greeting').text('Welcome, ' + username + '!');
    });

    // Leaderboard
    function showLeaderboard() {

        let scores = JSON.parse(sessionStorage.getItem('scores')) || [];

        $('#leaderboard').empty();

        scores.sort((a, b) => b.score - a.score);

        scores.slice(0, 5).forEach(player => {
            $('#leaderboard').append(
                $('<li>').text(player.name + ' - ' + player.score)
            );
        });
    }

    // Save score
    function saveScore() {

        let scores = JSON.parse(sessionStorage.getItem('scores')) || [];

        scores.push({
            name: username,
            score: score
        });

        sessionStorage.setItem('scores', JSON.stringify(scores));

        showLeaderboard();
    }

    // START
    $('#start').on('click', () => {

        poopLevel = 0;
        score = 0;
        playing = true;

        difficulty = Number($('#difficulty').val());

        $('#poopLevel').text(0);
        $('#poopMeter').stop().css('width', '0%');
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
            $('#score').text(score);

            // jQuery animation
            $('#poopMeter').stop().animate({
                width: poopLevel + '%'
            }, 200);

            // Lose
            if (Math.random() < difficulty) {

                $('#message').text('YOU POOPED YOUR PANTS! 💩');
                $('#finalScore').text('Your Score: ' + score);
                $('#modalMessage').text('YOU POOPED YOUR PANTS! 💩 Your Score: ' + score);

                playing = false;
                saveScore();
                gameModal.show();

            }

            // Win
            else if (poopLevel >= 90) {

                $('#message').text('YOU WIN! 🚽');
                $('#finalScore').text('Your Score: ' + score);
                $('#modalMessage').text('YOU WIN! 🚽 Your Score: ' + score);

                playing = false;
                saveScore();
                gameModal.show();

            }
        }
    });

    // RESET
    $('#reset').on('click', () => {

        poopLevel = 0;
        score = 0;
        playing = false;

        $('#poopLevel').text(0);
        $('#poopMeter').stop().css('width', '0%');
        $('#score').text(0);
        $('#finalScore').text('No game played yet.');
        $('#message').text('Press START to play!');

    });

    showLeaderboard();

});