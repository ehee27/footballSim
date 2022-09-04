import { afcWest } from "./teams.js"

const form = document.getElementById('form-id')
const numOfSims = document.getElementById('sim-input')
const button = document.getElementById('button-id')
const results = document.getElementById('results-div')

button.addEventListener('click', (e) =>  {
   e.preventDefault()
   let result = simulate(numOfSims.value, championshipMatchUp)
   results.innerText = result
})


// FILTER THE TEAMS BY WINS ABOVE 10 - plus a bonus for GREAT COACHING
function playoffs(array) {
   let teams =  array.filter(item => item.wins >= 10).filter(item => item.greatCoaching === true);
   return teams
}

// THIS RETURNED JUST TWO TEAMS - SO WE HAVE A CHAMPIONSHIP MATCHUP - the variable array is defiend by spreading the 'playoffs' function
const championshipMatchUp = [...playoffs(afcWest)]

// SIMULATION
// choose the num, and input the teams
// playGame chooses the winner based off coin flip and set percentage
function simulate(num, array) {
   let chiefsWin = 0;
   let broncosWin = 0;
   for(let i = 0; i < num; i ++) {
      let flip = Math.floor(Math.random() * 10) +1;
      // chiefs have a 70 % chance 
      if(flip > 0 && flip <=7) {
         chiefsWin += 1;
      } else {
         broncosWin +=1;
      }
   }
   // returns the total number of wins by each
   return `${num} games simulated...
   \nRESULTS\nThe ${array[0].name} won ${chiefsWin} times. The ${array[1].name} won ${broncosWin} times.
   \nThe ${array[0].name} win ${chiefsWin / num} percent of the time.`
}

//console.log(simulate(1000, championshipMatchUp))

/////// MATCHUPS

let matchup1 = [afcWest[1], afcWest[2]]

function gradeQBs(matchup) {
   // rank, age and leadership?
   // create an iterable array
   const qbArray = [];
   let QB1 = qbArray[0] = matchup[0].quarterBack;
   let QB2 = qbArray[1] = matchup[1].quarterBack;
   
   // iterate to grade age - under 25, 25-32, 32-36
   let ageGrade = qbArray.map(item => {
      if(item.age < 25) {
         item.qbPoints += 1;
      } else if(item.age >= 25 && item.age <= 32) {
         item.qbPoints += 3;
      } else if(item.age > 32 && item.age < 36){
         item.qbPoints += 2;
      }
   })
   // iterate to grade posRank - top 5, 5-10, 10-15
   let rankGrade = qbArray.map(item => {
      if(item.posRank <= 5) {
         item.qbPoints += 3;
      } else if(item.posRank > 5 && item.posRank <= 10) {
         item.qbPoints += 2;
      } else if(item.posRank > 10 && item.posRank <= 15) {
         item.qbPoints += 1;
      }
   })

   // How to return who's the best?
   let final = [];
   const result = qbArray.forEach(item => {
      let highQB = qbArray[0]
      if(item.qbPoints >= highQB) {
         final.push(item)
      } else {
         return
      }
   })
   return final
}
// console.log(matchup1)
// console.log(championshipMatchUp)
console.log(gradeQBs(championshipMatchUp))

//console.log(championshipMatchUp[0].quarterBack)

