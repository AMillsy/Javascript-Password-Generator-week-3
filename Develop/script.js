// Assignment Code
var generateBtn = document.querySelector("#generate");

//All the characters that can be used in a password
const characters = [
  `1`,`2`,`3`,`4`,`5`,`6`,`7`, `8`,`9`,`0`,`q`,`w`,`e`,`r`,`t`,`y`,`u`,`i`,`o`,`p`,`a`,`s`,`d`,`f`,
  `g`,`h`,`j`,`k`,`l`,`z`,`x`,`c`,`v`,`b`,`n`,`m`,` `,`!`,`"`,`#`,`$`,`%`,`&`,`'`,`(`,`)`,`*`,`+`,
  `,`,`-`,`.`,`/`,`:`,`;`,`<`,`=`,`>`,`?`,`@`,`[`,`]`,'\\',`^`,`_`,"`",`{`,`|`,`}`,`~`,
];

function isResponseCorrect(response ,min =7 , max = 129){
  return !isNaN(response) && Number(response) > min && Number(response) < max;
}
function getPassSize(){
let response = prompt(`What size do you want the password to be?
Between 8 to 128 character `);
//Checks if its a number, if not enter the statement

 const retryPass = function(){
    response = prompt(`isNAN: ${ !isNaN(response)} or more than 8: ${Number(response) > 7} or less than 129: ${Number(response) < 129}  Password size incorrect!
What size do you want the password to be? correctR: `);

    if(isResponseCorrect(response)) return;
    else retryPass();
 }

 if(!isResponseCorrect(response)){
    retryPass();
 }
  return response;
}

const passSize = parseInt(getPassSize());

console.log(passSize);


// Write password to the #password input
function randomNumInRange(min, max){
  //Gets the difference, that will include the max number 
  const difference = (max - min) + 1;
  //does a math.random which gives another between 0-1
  //Multiply by the difference so 100 - 50 = 50; rand(0.5) * 50 = 25;  <--- Test Numbers
  let rand = Math.floor(Math.random() * difference);
  //25 + 50 = 75; Gives you a number in the range you specify <-- Test Numbers
  rand += min;
  return rand;
}

function generatePassword(){
  let rndPass = "";
    for(let i = 0; i < passSize; i++) rndPass += characters[randomNumInRange(0,characters.length - 1)];

    return rndPass;
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
