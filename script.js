const dogImage = document.getElementsByClassName('dogImage')[0];
const message = document.getElementById('message');
const bubble = document.getElementById('bubble');
const volumeIcon = document.getElementById('volume-icon');
const petSound = document.getElementById('petSound');
const angrySound = document.getElementById('angrySound');
const body = document.getElementById('body');
const overlay = document.getElementById('overlay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

let petCount = 0;
let isMuted = false;
let isUserInteracted = false;
const petLimit = Math.floor(Math.random() * 10) + 5; // Random number between 5 and 15

startButton.addEventListener('click', () => {
    // Remove the overlay
    overlay.style.display = 'none';

    // Set the user interaction flag to true
    isUserInteracted = true;
});
resetButton.addEventListener('click', resetEverything);

dogImage.addEventListener('mouseover', handleMouseover);
dogImage.addEventListener('mouseout', handleMouseout);

volumeIcon.addEventListener('click', function() {
    isMuted = !isMuted;
    petSound.muted = isMuted;
    angrySound.muted = isMuted;
    volumeIcon.classList.toggle('fa-volume-up', !isMuted);
    volumeIcon.classList.toggle('fa-volume-mute', isMuted);
});

function handleMouseover() {
    if (!isUserInteracted) return;

    dogImage.classList.add('petting');
    playSound(petSound);
    bubble.style.display = 'block';
    bubble.style.opacity = '1';
}

function handleMouseout() {
    if (!isUserInteracted) return;

    dogImage.classList.remove('petting');
    bubble.style.opacity = '0';
    setTimeout(() => {
        bubble.style.display = 'none';
    }, 300);

    petCount++;
    console.log("You are petting the dog "+petCount+" times! Be careful, not wake it up!!");
    if (petCount >= petLimit) {
        wakeUpDog();
        // Remove event listeners after reaching the pet limit
        dogImage.removeEventListener('mouseover', handleMouseover);
        dogImage.removeEventListener('mouseout', handleMouseout);
    }
}

function playSound(sound) {
    if (!isMuted) {
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Audio playback failed:', error);
            });
        }
    }
}

function wakeUpDog() {
    playSound(angrySound);
    dogImage.classList.add('awake');
    body.classList.add('awake-background');
    dogImage.src = 'imgs/angry_dog2.jpeg';
    resetButton.classList.remove('hidden');

    // Optional: Add logic to reset after a certain time
    // setTimeout(() => {
    //     dogImage.classList.remove('awake');
    //     petCount = 0; // Reset pet count
    //     body.classList.remove('awake-background');
    //     dogImage.src = 'sleeping_dog.png';
    // }, 5000); // Reset after 5 seconds
}

function resetEverything() {
    // Reset the pet count
    petCount = 0;
    
    // Reset the dog image
    dogImage.src = 'imgs/cute_sleep_dog.jpeg';
    dogImage.classList.remove('awake');

    // Reset the body background
    body.classList.remove('awake-background');

    // Hide the reset button
    resetButton.classList.add('hidden');

    // Stop and reset the sounds
    petSound.pause();
    petSound.currentTime = 0;
    angrySound.pause();
    angrySound.currentTime = 0;

    // Re-add the event listeners
    dogImage.addEventListener('mouseover', handleMouseover);
    dogImage.addEventListener('mouseout', handleMouseout);
}
