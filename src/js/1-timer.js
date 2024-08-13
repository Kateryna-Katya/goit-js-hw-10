import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl = document.querySelector("#datetime-picker");
const btnEl = document.querySelector(`button[data-start]`);
btnEl.disabled = true;
let userSelectedDate = null;
let countdownInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate <= new Date()) {
            iziToast.warning({
                message: "Please choose a date in the future",
            });
            btnEl.disabled = true;
        } else {
            btnEl.disabled = false;
        }
    },
};

flatpickr(inputEl, options);

btnEl.addEventListener(`click`, () => {
    btnEl.disabled = true;
    inputEl.disabled = true;


    countdownInterval = setInterval(() => {
        const date = new Date();
        const timeRemaining = userSelectedDate - date;


        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            updateTimer(0, 0, 0, 0);
            inputEl.disabled = false;

            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        updateTimer(days, hours, minutes, seconds);
    }, 1000);
});


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

