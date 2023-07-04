window.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const timerElement = document.getElementById('timer');
    const messageElement = document.getElementById('message');

    startButton.addEventListener('click', function() {
        const numExercises = parseInt(document.getElementById('numExercises').value);
        const numSets = parseInt(document.getElementById('numSets').value);
        const workoutTime = parseInt(document.getElementById('workoutTime').value);
        const restTime = parseInt(document.getElementById('restTime').value);

        const workoutList = generateWorkouts(numExercises);
        startWorkout(workoutList, numSets, workoutTime, restTime);
    });

    function generateWorkouts(numExercises) {
        var workouts = [
            "Push-ups",
            "Sit-ups",
            "Jumping Jacks",
            "Squats",
            "Lunges",
            "Plank",
            "Mountain Climbers",
            // Add more exercises as needed
        ];

        var selectedWorkouts = [];
        for (var i = 0; i < numExercises; i++) {
            var randomIndex = Math.floor(Math.random() * workouts.length);
            var workout = workouts[randomIndex];
            selectedWorkouts.push(workout);
            workouts.splice(randomIndex, 1);
        }

        return selectedWorkouts;
    }

    function startWorkout(workoutList, numSets, workoutTime, restTime) {
        var currentSet = 1;
        var currentExercise = 0;

        timerElement.textContent = "";
        messageElement.textContent = `Set ${currentSet} - Exercise ${currentExercise + 1} of ${workoutList.length}`;

        function performExercise() {
            if (currentExercise >= workoutList.length) {
                currentExercise = 0;
                currentSet++;
                if (currentSet > numSets) {
                    messageElement.textContent = "Workout complete!";
                    return;
                }
                messageElement.textContent = `Set ${currentSet} - Exercise ${currentExercise + 1} of ${workoutList.length}`;
            }

            var exercise = workoutList[currentExercise];
            timerElement.textContent = exercise;

            setTimeout(function() {
                timerElement.textContent = "";
                messageElement.textContent = "Rest";
                setTimeout(function() {
                    currentExercise++;
                    performExercise();
                }, restTime * 1000);
            }, workoutTime * 1000);
        }

        performExercise();
    }
});
