$(document).ready(() => {

    let poopLevel = 0;
    let score = 0;
    let playing = false;
    let username = 'Guest';
    let difficulty = 0.1;

    // Test accounts (development only)
    const users = [
        {
            username: 'admin',
            password: 'admin123',
            role: 'admin'
        },
        {
            username: 'user',
            password: 'user123',
            role: 'user'
        }
    ];

    // Display test credentials in console
    console.log(`
DEV TEST ACCOUNTS

ADMIN
username: admin
password: admin123

USER
username: user
password: user123
    `);

    const gameModal = new bootstrap.Modal('#gameModal');

    // Restore login session
    let currentUser = null;

    try {
        currentUser = JSON.parse(
            sessionStorage.getItem('currentUser')
        );
    } catch (error) {
        console.error('[AUTH] Failed to restore session:', error);
        sessionStorage.removeItem('currentUser');
    }

    // Update login interface
    function updateLoginUI() {

        if (currentUser && currentUser.authenticated === true) {

            username = currentUser.username;

            $('#greeting').text(
                'Welcome, ' + username + '! Role: ' + currentUser.role
            );

            $('#login').hide();
            $('#username').hide();
            $('#password').hide();
            $('#logout').show();

            // Authorization
            if (currentUser.role === 'admin') {
                $('#adminLink').show();
            } else {
                $('#adminLink').hide();
            }

        } else {

            username = 'Guest';

            $('#greeting').text('Welcome, Guest!');

            $('#login').show();
            $('#username').show();
            $('#password').show();
            $('#logout').hide();

            $('#adminLink').hide();
        }
    }

    // LOGIN
    $('#login').on('click', () => {

        const enteredUsername = $('#username').val().trim();
        const enteredPassword = $('#password').val();

        const foundUser = users.find(user =>
            user.username === enteredUsername &&
            user.password === enteredPassword
        );

        if (foundUser) {

            currentUser = {
                username: foundUser.username,
                authenticated: true,
                role: foundUser.role
            };

            sessionStorage.setItem(
                'currentUser',
                JSON.stringify(currentUser)
            );

            $('#loginMessage').text('Login successful!');

            updateLoginUI();

            // NEW: Update state after login
            updateAppState();

            console.log('[AUTH] User logged in:', currentUser.username);
            console.log('[AUTHZ] Role:', currentUser.role);

        } else {

            $('#loginMessage').text('Invalid username or password.');
        }
    });

    // LOGOUT
    $('#logout').on('click', () => {

        currentUser = null;

        sessionStorage.removeItem('currentUser');

        $('#username').val('');
        $('#password').val('');

        $('#loginMessage').text('Signed out successfully.');

        updateLoginUI();

        // NEW: Update state after logout
        updateAppState();

        console.log('[AUTH] User signed out');
    });

    // NEW: Update App State
    function updateAppState() {

        let scores = [];

        try {
            scores = JSON.parse(
                sessionStorage.getItem('scores')
            ) || [];

            if (!Array.isArray(scores)) {
                scores = [];
            }

        } catch (error) {
            console.error('[APP STATE] Invalid scores:', error);
        }

        const appState = {
            app: {
                name: 'Hold Your Poop',
                version: '2.0'
            },

            user: currentUser,

            data: scores,

            session: {
                currentPage: window.location.pathname,
                lastUpdated: new Date().toISOString()
            }
        };

        sessionStorage.setItem(
            'appState',
            JSON.stringify(appState)
        );

        console.log('[APP STATE]', appState);
    }

    // Load initial scores from JSON
    async function loadScores() {

        try {

            const savedScores = sessionStorage.getItem('scores');

            // Use saved scores if available
            if (savedScores !== null) {

                // NEW: Update state when using saved data
                updateAppState();

                showLeaderboard();
                return;
            }

            // Fetch initial scores from JSON file
            const response = await fetch('../data/scores.json');

            if (!response.ok) {
                throw Error('Failed to load scores');
            }

            const scores = await response.json();

            if (!Array.isArray(scores)) {
                throw Error('Invalid scores data');
            }

            sessionStorage.setItem(
                'scores',
                JSON.stringify(scores)
            );

            console.log('[DATA] Initial scores loaded:', scores.length);

            // NEW: Update state after fetching JSON
            updateAppState();

            showLeaderboard();

        } catch (error) {

            console.error('[DATA] Error:', error);

            $('#leaderboard').empty();

            $('#leaderboard').append(
                $('<li>').text('Could not load leaderboard.')
            );
        }
    }

    // Leaderboard
    function showLeaderboard() {

        let scores = [];

        try {
            scores = JSON.parse(
                sessionStorage.getItem('scores')
            ) || [];

            if (!Array.isArray(scores)) {
                throw Error('Invalid scores data');
            }

        } catch (error) {

            console.error('[DATA] Cannot display leaderboard:', error);

            $('#leaderboard').empty();
            $('#leaderboard').append(
                $('<li>').text('Could not display leaderboard.')
            );

            return;
        }

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

        let scores = JSON.parse(
            sessionStorage.getItem('scores')
        ) || [];

        scores.push({
            id: Date.now(),
            name: username,
            score: score
        });

        sessionStorage.setItem(
            'scores',
            JSON.stringify(scores)
        );

        // NEW: Update state after saving a score
        updateAppState();

        console.log('[CREATE] New score saved:', score);

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

            $('#poopMeter').stop().animate({
                width: poopLevel + '%'
            }, 200);

            // Lose
            if (Math.random() < difficulty) {

                $('#message').text('YOU POOPED YOUR PANTS! 💩');
                $('#finalScore').text('Your Score: ' + score);
                $('#modalMessage').text(
                    'YOU POOPED YOUR PANTS! 💩 Your Score: ' + score
                );

                playing = false;
                saveScore();
                gameModal.show();

            }

            // Win
            else if (poopLevel >= 90) {

                $('#message').text('YOU WIN! 🚽');
                $('#finalScore').text('Your Score: ' + score);
                $('#modalMessage').text(
                    'YOU WIN! 🚽 Your Score: ' + score
                );

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

    // Initialize
    updateLoginUI();

    // NEW: Initialize app state
    updateAppState();

    loadScores();

});