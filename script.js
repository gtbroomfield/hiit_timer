window.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const timerElement = document.getElementById('timer');
    const messageElement = document.getElementById('message');
    const setElement = document.getElementById('currentSet');
    const exerciseElement = document.getElementById('currentExercise');
    const workoutCountElement = document.getElementById('workoutCount');
    const overallDurationElement = document.getElementById('overallDuration');
    const remainingDurationElement = document.getElementById('remainingDuration');

    let startTime; // Variable to store the start time of the workout
    let totalTime = 0; // Variable to store the total duration of the workout
    let remainingTime = 0; // Variable to store the remaining duration of the workout

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

        var totalSets = numSets;
        var totalExercises = workoutList.length;

        timerElement.textContent = "";
        setElement.textContent = `Set ${currentSet} of ${totalSets}`;
        updateExerciseText(currentExercise);
        workoutCountElement.textContent = `Exercise ${currentExercise + 1} of ${totalExercises}`;

        function performExercise() {
            if (currentExercise >= workoutList.length) {
                currentExercise = 0;
                currentSet++;
                if (currentSet > numSets) {
                    messageElement.textContent = "Workout complete!";
                    return;
                }
                setElement.textContent = `Set ${currentSet} of ${totalSets}`;
            }

            var exercise = workoutList[currentExercise];
            var timeLeft = workoutTime;
            timerElement.textContent = formatTime(timeLeft);
            updateExerciseText(currentExercise);

            var countdown = setInterval(function() {
                timeLeft--;
                timerElement.textContent = formatTime(timeLeft);
                remainingTime--;
                remainingDurationElement.textContent = formatTime(remainingTime);
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    timerElement.textContent = "";
                    messageElement.textContent = "Rest";
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
                remainingTime--;
                remainingDurationElement.textContent = formatTime(remainingTime);
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    timerElement.textContent = "";
                    currentExercise++;
                    workoutCountElement.textContent = `Exercise ${currentExercise + 1} of ${totalExercises}`;
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

        function updateExerciseText(index) {
            exerciseElement.textContent = workoutList[index];
        }

        function startTimer() {
            startTime = Date.now();
            totalTime = workoutTime * totalSets * totalExercises + restTime * (totalExercises - 1);
            remainingTime = totalTime;
            overallDurationElement.textContent = formatTime(totalTime);
            remainingDurationElement.textContent = formatTime(remainingTime);
        }

        startTimer();
        performExercise();
    }
});
