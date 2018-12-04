
window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    
    let hoursField = document.getElementById('hours'),
        minutesField = document.getElementById('minutes'),
        secondsField = document.getElementById('seconds');


    
    function timer(){
        function addZero(num){
            if(num <= 9){
                return '0' + num;
            } else return num;
        };

        let date = new Date(),

            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        hoursField.textContent = addZero(hours) + ' :';  
        minutesField.textContent = addZero(minutes) + ' :'; 
        secondsField.textContent = addZero(seconds);  
    };
        
    let timerId = setInterval(timer, 1000);    
});

