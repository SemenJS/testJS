window.addEventListener('DOMContentLoaded', () => {

    'use strict';


    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }


    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // timer

    let deadline = '2018-12-16';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function addZero(num) {
            if (num <= 9) {
                return '0' + num;
            } else return num;
        };

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('timer', deadline);


    // modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // tabs

    let descriptionBtn = document.querySelectorAll('.description-btn'); // получаю кнопки

    descriptionBtn.forEach((descriptionBtn) => { // перебираю
        descriptionBtn.addEventListener('click', () => { // вешаю событие
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });


    // form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        formTwo = document.querySelector('#form'),
        inputTwo = formTwo.getElementsByTagName('input');

    input[0].addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && !/\+/.test(e.key)) {
            e.preventDefault();
        }
    });
    inputTwo[1].addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && !/\+/.test(e.key)) {
            e.preventDefault();
        }
    });

    statusMessage.classList.add('status');

    function sendForm(a) {
        
        let promise = new Promise(function(resolve, reject){

            a.addEventListener('submit', function (event) {
                event.preventDefault();
                a.appendChild(statusMessage);
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                let formData = new FormData(a);

                let obj = {};
                formData.forEach(function (value, key) {
                    obj[key] = value;
                });
                let json = JSON.stringify(obj);

                request.send(json);

                request.addEventListener('readystatechange', function () {
                    if (request.readyState < 4) {
                        resolve();
                        statusMessage.innerHTML = message.loading;
                    } else if (request.readyState === 4 && request.status == 200) {
                        statusMessage.innerHTML = message.success;
                    } else {
                        statusMessage.innerHTML = message.failure;
                    }
                });
    
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
        })
            return promise;

            

            

        });
    }
    sendForm(form);
    sendForm(formTwo);

});