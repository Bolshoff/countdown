
import {UI_ELEMENTS} from './view.js';
import intervalToDuration from 'date-fns/intervalToDuration'

let timer;

let targetDate;

startTimerAfterRebootPage();



UI_ELEMENTS.inputForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  resetTimer();
  targetDate = UI_ELEMENTS.input.value;
  startTimer(targetDate);

})

function startTimer(targetDate){

  localStorage.setItem('targetDate', targetDate);


    timer = setInterval(countDown, 1000,targetDate);

    UI_ELEMENTS.input.value = '';


}

function resetTimer(){
  clearInterval(timer);
  localStorage.removeItem('targetDate');
  UI_ELEMENTS.days.innerHTML = '00';
  UI_ELEMENTS.hours.innerHTML ='00';
  UI_ELEMENTS.minutes.innerHTML ='00';
  UI_ELEMENTS.seconds.innerHTML ='00';
  UI_ELEMENTS.years.innerHTML ='00';
  UI_ELEMENTS.month.innerHTML ='00';
}

UI_ELEMENTS.resetButton.addEventListener('click', resetTimer);

function countDown(targetDate){


  let time  = intervalToDuration({
    start: new Date(),
    end: new Date(targetDate)
  });

  (time.days < 10) ? (UI_ELEMENTS.days.innerHTML = "0"  + time.days) : (UI_ELEMENTS.days.innerHTML =  time.days);

  (time.hours < 10) ? (UI_ELEMENTS.hours.innerHTML = "0" + time.hours) : (UI_ELEMENTS.hours.innerHTML =  time.hours);

  (time.minutes < 10) ? (UI_ELEMENTS.minutes.innerHTML = "0" + time.minutes) : (UI_ELEMENTS.minutes.innerHTML = time.minutes);

  (time.seconds < 10) ? (UI_ELEMENTS.seconds.innerHTML = "0" + time.seconds) : (UI_ELEMENTS.seconds.innerHTML = time.seconds);

  (time.years < 10) ? (UI_ELEMENTS.years.innerHTML = "0" + time.years) : (UI_ELEMENTS.years.innerHTML = time.years);

  (time.months < 10) ? (UI_ELEMENTS.month.innerHTML = "0" + time.months) : (UI_ELEMENTS.month.innerHTML = time.months);



}
function startTimerAfterRebootPage(){
 let date = localStorage.getItem('targetDate')??new Date();
 startTimer(date);

}

