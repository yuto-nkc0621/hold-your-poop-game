$(document).ready(() => {

    // Get current user
    let currentUser;

    try {
        currentUser = JSON.parse(
            sessionStorage.getItem('currentUser')
        );
    } catch (error) {
        console.error('[AUTH] Invalid session:', error);
        currentUser = null;
    }

    // Authorization
    if (!currentUser ||
        currentUser.authenticated !== true ||
        currentUser.role !== 'admin') {

        $('#accessDenied').show();
        $('#adminDashboard').hide();

        return;
    }

    $('#accessDenied').hide();
    $('#adminDashboard').show();

    // Display admin information
    $('#adminUsername').text(currentUser.username);
    $('#adminRole').text(currentUser.role);
    $('#adminAuthenticated').text(currentUser.authenticated);

    // Get saved scores
    let scores;

    try {
        scores = JSON.parse(
            sessionStorage.getItem('scores')
        ) || [];

        if (!Array.isArray(scores)) {
            throw Error('Scores must be an array');
        }
    } catch (error) {
        console.error('[DATA] Failed to read scores:', error);
        scores = [];
        $('#adminMessage').text('Could not read saved scores.');
    }

    // Save scores
    function saveScores() {

    sessionStorage.setItem(
        'scores',
        JSON.stringify(scores)
    );

    updateAppState();
    showAdminLeaderboard();

    // NEW: Refresh information after EDIT or DELETE
    showDashboardInfo();
}

    // Update application state
    function updateAppState() {

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

        $('#app-state-output').text(
            JSON.stringify(appState, null, 2)
        );

        console.log('[APP STATE]', appState);
    }

    // Display leaderboard
    function showAdminLeaderboard() {

        $('#adminLeaderboard').empty();

        const sortedScores = [...scores].sort(
            (a, b) => b.score - a.score
        );

        sortedScores.forEach(player => {

            const listItem = $('<li>');

            const playerText = $('<span>').text(
                player.name + ' - ' + player.score + ' '
            );

            const editButton = $('<button>')
                .text('EDIT')
                .addClass('btn btn-warning btn-sm m-1');

            const deleteButton = $('<button>')
                .text('DELETE')
                .addClass('btn btn-danger btn-sm m-1');

            // UPDATE
            editButton.on('click', () => {

                showEditForm(player, listItem);
            });

            // DELETE
            deleteButton.on('click', () => {

                deleteScore(player.id);
            });

            listItem.append(
                playerText,
                editButton,
                deleteButton
            );

            $('#adminLeaderboard').append(listItem);
        });
    }

    // Show edit form
    function showEditForm(player, listItem) {

        const editForm = $('<form>')
            .addClass('my-2');

        const scoreInput = $('<input>')
            .attr({
                type: 'number',
                min: 0,
                max: 100,
                required: true
            })
            .addClass('form-control mb-2')
            .val(player.score);

        const saveButton = $('<button>')
            .attr('type', 'submit')
            .text('SAVE')
            .addClass('btn btn-success btn-sm');

        editForm.append(scoreInput, saveButton);

        listItem.append(editForm);

        editForm.on('submit', event => {

            event.preventDefault();

            const newScore = Number(scoreInput.val());

            if (!Number.isFinite(newScore) ||
                newScore < 0 ||
                newScore > 100) {

                $('#adminMessage').text(
                    'Score must be between 0 and 100.'
                );

                return;
            }

            // Find the original record
            const target = scores.find(
                item => item.id === player.id
            );

            if (!target) {
                $('#adminMessage').text('Score not found.');
                return;
            }

            target.score = newScore;

            saveScores();

            $('#adminMessage').text(
                'Score updated successfully.'
            );

            console.log('[UPDATE] Score updated:', target.id);
        });
    }

    // Delete score
    function deleteScore(id) {

        const originalLength = scores.length;

        scores = scores.filter(
            player => player.id !== id
        );

        if (scores.length === originalLength) {
            $('#adminMessage').text('Score not found.');
            return;
        }

        saveScores();

        $('#adminMessage').text(
            'Score deleted successfully.'
        );

        console.log('[DELETE] Score deleted:', id);
    }


    // NEW: Display dashboard information
function showDashboardInfo() {

    // App Statistics
    $('#totalScores').text(scores.length);

    const highestScore = scores.length > 0
        ? Math.max(...scores.map(player => Number(player.score)))
        : 0;

    $('#highestScore').text(highestScore);

    // Session Information
    $('#sessionUsername').text(currentUser.username);
    $('#sessionRole').text(currentUser.role);
    $('#sessionAuthenticated').text(currentUser.authenticated);

    // System Information
    $('#currentTime').text(new Date().toLocaleString());
    $('#currentPage').text(window.location.pathname);
    $('#browserInfo').text(navigator.userAgent);

    // Session Storage
    const storageData = {};

    for (let i = 0; i < sessionStorage.length; i++) {

        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);

        try {
            storageData[key] = JSON.parse(value);
        } catch (error) {
            storageData[key] = value;
        }
    }

    $('#sessionStorageOutput').text(
        JSON.stringify(storageData, null, 2)
    );
}

    // Initialize
    showAdminLeaderboard();
    updateAppState();

    // Display dashboard information
    showDashboardInfo();

    console.log('[ADMIN] Dashboard loaded');

});