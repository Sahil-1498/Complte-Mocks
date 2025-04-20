
let mockWindow = document.querySelector('.mock-window');
let mockLeft = document.querySelector('.mock-left');
let mockRight = document.querySelector('.mock-right');
let clickBtn = document.querySelector('.fs-btn');

let chevronRight = document.querySelector('#chevron-right');
let chevronLeft = document.querySelector('#chevron-left');

clickBtn.addEventListener('click',()=>
{
  if (mockRight.style.display==="") {
    mockRight.style.display="flex";
    chevronRight.style.display="flex";
    chevronLeft.style.display="none";

  }

  if (mockRight.style.display==="flex") {
    mockRight.style.display="none";
    mockLeft.style.width="100%";
    chevronRight.style.display="none";
    chevronLeft.style.display="flex";
  }

  else{
    mockRight.style.display="flex";
    mockLeft.style.width=78+"vw";
    chevronLeft.style.display="none";
    chevronRight.style.display="flex";
  }

}
)

// .........................................................




// function stopTimer() {
//   clearInterval(timerInterval);
// }

// function stopTimer() {
//   clearInterval(timerInterval);
// }



// ...............................................................


  const selectedLanguage = document.getElementById("language-select").value;
  const textDiv = document.getElementById("text-div");


  translateText()
    {

      
  
    }
