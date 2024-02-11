const colours = ["#97C4AA", "#CAAFF5", "#73C9EB", "#F0ABAB"];

const candies = document.getElementById("candies");

const rotateSound = new Audio("./rotateSound.mp3")
let level;

const containerWidth = candies.clientWidth;
const candyWidth = document.getElementById("candy").clientWidth;
const containerHeight = Math.floor(candies.clientHeight / candyWidth) * candyWidth;

const btn = document.getElementById("btn");

let isGenerating = false; // To prevent multiple generation of candies at the same time 

generateCandies();

btn.addEventListener("click", () => {
  if (level <= -100)
  {
    alert("FILL IN YOUR CANDIES!!!")
  }
  else {
    animateBtn()
  }
})

function animateBtn()
{
  // Check if the candies are being generate currently 
  if (isGenerating) {
    return;
  }

  // Indicate function is already running
  isGenerating = true;

  // Disable the div to prevent click
  btn.style.pointerEvents = 'none';

  // Play sound
  rotateSound.play();

  // Rotate btn
  i = 0
  const rotationInterval = setInterval(() => {
    btn.style.transform = `translateX(-50%) rotate(${i}deg`;
    i += 10;

    if (i > 180)
    {
      clearInterval(rotationInterval);
      reduceCandies()
    }
  }, 100);
  
  // Allowing the btn to be clicked again 
  setTimeout(() => {
    isGenerating = false;
    btn.style.pointerEvents = 'auto';
    rotateSound.pause();
    rotateSound.currentTime = 0;
  },2000)
}

function reduceCandies()
{
  level -= 10;
  candies.style.bottom = `${level}%`;
  // console.log(level)
}


function generateCandies()
{
  level = 0;

  for (i = 0; i < containerHeight; i += candyWidth)
  {
    for (j = 0; j < containerWidth; j+= candyWidth)
    {
      const candy = document.createElement("div");
      candy.classList.add("candy");
      randColour = colours[Math.floor(Math.random() * colours.length)]
      candy.style.backgroundColor = randColour
      candy.style.left = `${j}px`;
      candy.style.bottom = `${i}px`;
      candies.append(candy);
    }
  }
  for (j = 0; j < containerHeight;)
  {
    for (i = 0; i < containerWidth;)
    {
      i += Math.random() * candyWidth;
      const candy = document.createElement("div");
      candy.classList.add("candy");
      randColour = colours[Math.floor(Math.random() * colours.length)]
      candy.style.backgroundColor = randColour
      candy.style.left = `${i < (containerWidth - candyWidth) ? i : (containerWidth - candyWidth)}px`;
      candy.style.bottom = `${j - (Math.random() * 150) < (containerHeight - candyWidth) ? j - (Math.random() * 150) : (containerHeight - candyWidth)}px`;
      // console.log(containerHeight - candyWidth, candy.style.bottom)
      candy.style.transform = `rotate(${Math.random() * 180}deg)`
      candies.append(candy);
    }
    j += Math.random() * candyWidth;
  }
}

