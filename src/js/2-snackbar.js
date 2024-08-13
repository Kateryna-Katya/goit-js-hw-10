import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const FormEl = document.querySelector(`.form`);
const createFormNotification = event => {
    event.preventDefault();
    const delay = parseInt(event.target.delay.value);
    const state = event.target.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {

            if (state === 'fulfilled') {
                resolve(delay);

            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then((delay) => {
            iziToast.success({
                message: `Fulfilled promise in ${delay}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
                message: `Rejected promise in ${delay}ms`,
            });
        });
    event.target.reset();
}

FormEl.addEventListener(`submit`, createFormNotification);


iziToast.settings({
    position: "topRight",
    timeout: 10000,
    progressBar: false,
});