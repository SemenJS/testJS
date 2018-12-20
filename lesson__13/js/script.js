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

    let deadline = '2018-12-20';

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
    statusMessage.classList.add('status');

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

    function sendForm(elem) {

        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(form);

            function postData(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urrlencoded');

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            //
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            // 
                            resolve();
                        } else {
                            // 
                            reject();
                        }
                    };
                    request.send(formData);
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }


            postData(formData)
                .then(() => statusMessage.innerHTML = message.loadding)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });
    }
    sendForm(form);
    sendForm(formTwo);

    // slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });
    next.addEventListener('click', function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    // calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('keyup', function () {
        this.value = this.value.replace(/[^\d]*/g)
            .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
        daysSum = +this.value;
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
            total = 0;
        } else if (restDays.value == 0 || persons.value == 0) {
            totalValue.innerHTML = 0;
            total = 0;
        } else {
            total = (daysSum + personsSum) * 4000;
        }
    });

    restDays.addEventListener('change', function () {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        this.value = this.value.replace(/[^\d]*/g)
            .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
        if (!/\d/.test && !/\a+/.test) {
            e.preventDefault();
        }

        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});