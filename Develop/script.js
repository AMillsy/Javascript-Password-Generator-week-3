// Assignment Code
var generateBtn = document.querySelector("#generate");

//All the characters that can be used in a password
const numbers = [ `1`,`2`,`3`,`4`,`5`,`6`,`7`, `8`,`9`,`0`]

const characters = [`q`,`w`,`e`,`r`,`t`,`y`,`u`,`i`,`o`,`p`,`a`,`s`,`d`,`f`,`g`,`h`,`j`,`k`,`l`,`z`,`x`,`c`,`v`,`b`,`n`,`m`]

const specialCharacters = [
 ,` `,`!`,`"`,`#`,`$`,`%`,`&`,`'`,`(`,`)`,`*`,`+`,
  `,`,`-`,`.`,`/`,`:`,`;`,`<`,`=`,`>`,`?`,`@`,`[`,`]`,'\\',`^`,`_`,"`",`{`,`|`,`}`,`~`,
];

//Gets the password size
function getPassSize(){

let response = prompt(`What size do you want the password to be?
Between 8 to 128 character `);
//Checks if its a number, if not enter the statement
function isPassSizeCorrect(response ,min =7 , max = 129){
  return !isNaN(response) && Number(response) > min && Number(response) < max;
}
 const retryPass = function(){
    response = prompt(`Password size incorrect!
What size do you want the password to be?: `);

    if(isPassSizeCorrect(response)) return;
    else retryPass();
 }

 if(!isPassSizeCorrect(response)){
    retryPass();
 }
  return response;
}


//Checks if the response is allowed, if not then retryResponse 
function allowedResponse(response, question){
//Function that will allow the response if the user puts in the correct thing.
const responses = [`n`,`y`];
function isResponseCorrect(response){
  if(responses.includes(response)) return true;
  return false;
}
//If they enter a incorrect response, enter this function
function retryResponse(question){
  const response = prompt(`Incorrect Response to ${question} question, please put in y/n`);
  if(!isResponseCorrect(response)){
    retryResponse();
  }
  else return response
}

//Checks if the response is a y or an n
  const isAllowed = response === `y` || response == `n`;
  //if not ask them to put in a correct response
  if(!isAllowed){
      response = retryResponse(question);
  }
  //if they have given me a correct response then return true or false based on the response
  if(response === `y`) return true;
  else return false;
}

function inclusions(){
    const numberPrompt = prompt(`Do you want numbers in your password? Put y/n`);
    const wantsNumbers = allowedResponse(numberPrompt.toLowerCase(), `Numbers`);
    
    const lowercasePrompt = prompt(`Do you want lowercase characters included? Put y/n`);
    const wantsLowercase = allowedResponse(lowercasePrompt.toLowerCase(),`Lowercase Characters`);

    const uppercasePrompt = prompt(`Do you want Uppercase Characters included? Put y/n`);
    const wantsUppercase = allowedResponse(uppercasePrompt.toLowerCase(), `Uppercase Characters`);

    const specialCharactersPrompt = prompt(`Do you want Special Characters included? Put y/n`);
    const wantsSpecialCharacter = allowedResponse(specialCharactersPrompt.toLowerCase(), `Special Characters`);
    console.log(wantsNumbers,wantsLowercase,wantsUppercase,wantsSpecialCharacter);
}

const passSize = parseInt(getPassSize());
inclusions();



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
