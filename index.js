
import {UI_ELEMENTS} from './view.js';

let timer;
let remainingTime ;
let targetDate;

startTimerAfterRebootPage();



UI_ELEMENTS.inputForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  targetDate = UI_ELEMENTS.input.value;
  startTimer(targetDate);

})

function startTimer(targetDate){

  localStorage.setItem('targetDate', targetDate);
  let countdownTime = new Date(targetDate).getTime();

  if(countdownTime > new Date().getTime()) {

    timer = setInterval(countDown, 1000, countdownTime);

    UI_ELEMENTS.input.value = '';

  }else alert('Дата в прошлом!');
}

function resetTimer(){
  clearInterval(timer);
  localStorage.removeItem('targetDate');
  UI_ELEMENTS.days.innerHTML = '';
  UI_ELEMENTS.hours.innerHTML ='';
  UI_ELEMENTS.minutes.innerHTML ='';
  UI_ELEMENTS.seconds.innerHTML ='';
  UI_ELEMENTS.years.innerHTML ='';
  UI_ELEMENTS.month.innerHTML ='';
}

UI_ELEMENTS.resetButton.addEventListener('click', resetTimer);

function countDown(countdownTime){
  const currentTime = new Date().getTime();
   remainingTime = countdownTime - currentTime;
  let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  let year = Math.floor(days/365);
  let month = Math.floor((days - Math.floor(days/365)*365)/30.5) ;
  let day = Math.floor(days - Math.floor(year*365) - Math.floor(month * 30.5));
  (day < 10) ? (UI_ELEMENTS.days.innerHTML = "0"  + day) : (UI_ELEMENTS.days.innerHTML =  day);

  (hours < 10) ? (UI_ELEMENTS.hours.innerHTML = "0" + hours) : (UI_ELEMENTS.hours.innerHTML =  hours);

  (minutes < 10) ? (UI_ELEMENTS.minutes.innerHTML = "0" + minutes) : (UI_ELEMENTS.minutes.innerHTML = minutes);

  (seconds < 10) ? (UI_ELEMENTS.seconds.innerHTML = "0" + seconds) : (UI_ELEMENTS.seconds.innerHTML = seconds);

  (year < 10) ? (UI_ELEMENTS.years.innerHTML = "0" + year) : (UI_ELEMENTS.years.innerHTML = year);

  (month < 10) ? (UI_ELEMENTS.month.innerHTML = "0" + month) : (UI_ELEMENTS.month.innerHTML = month);

  if(remainingTime === 0) {
    clearInterval(timer);
  }

}
function startTimerAfterRebootPage(){
 let date = localStorage.getItem('targetDate')??new Date();
 startTimer(date);

}