window.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const timerElement = document.getElementById('timer');
    const messageElement = document.getElementById('message');
    const setElement = document.getElementById('currentSet');
    const intervalElement = document.getElementById('currentInterval');
    const exerciseElement = document.getElementById('currentExercise');

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
        var currentInterval = 'Workout';

        timerElement.textContent = "";
        setElement.textContent = `Set ${currentSet}`;
        intervalElement.textContent = currentInterval;
        exerciseElement.textContent = workoutList[currentExercise];
        messageElement.textContent = `Exercise ${currentExercise + 1} of ${workoutList.length}`;

        function performExercise() {
            if (currentExercise >= workoutList.length) {
                currentExercise = 0;
                currentSet++;
                if (currentSet > numSets) {
                    messageElement.textContent = "Workout complete!";
                    return;
                }
                setElement.textContent = `Set ${currentSet}`;
            }

            var exercise = workoutList[currentExercise];
            var timeLeft = workoutTime;
            timerElement.textContent = formatTime(timeLeft);
            intervalElement.textContent = 'Workout';
            exerciseElement.textContent = exercise;

            var countdown = setInterval(function() {
                timeLeft--;
                timerElement.textContent = formatTime(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    timerElement.textContent = "";
                    messageElement.textContent = "Rest";
                    intervalElement.textContent = 'Rest';
                    performRest(restTime);
                }
            }, 1000);
        }

        function performRest(restTime) {
            var timeLeft = restTime;
            timerElement.textContent = formatTime(timeLeft);
            exerciseElement.textContent = "Rest";

            var countdown = setInterval(function() {
                timeLeft--;
                timerElement.textContent = formatTime(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    timerElement.textContent = "";
                    currentExercise++;
                    messageElement.textContent = `Exercise ${currentExercise + 1} of ${workoutList.length}`;
                    performExercise();
                }
            }, 1000);
        }

        function formatTime(seconds) {
            var minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;
            return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
        }

        function padZero(value) {
            return value < 10 ? `0${value}` : value;
        }

        performExercise();
    }
});
