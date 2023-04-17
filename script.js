// Assignment Code
var generateBtn = document.querySelector("#generate");

//All the characters that can be used in a password
const numbers = [ `1`,`2`,`3`,`4`,`5`,`6`,`7`, `8`,`9`,`0`]

const characters = [`q`,`w`,`e`,`r`,`t`,`y`,`u`,`i`,`o`,`p`,`a`,`s`,`d`,`f`,`g`,`h`,`j`,`k`,`l`,`z`,`x`,`c`,`v`,`b`,`n`,`m`]

const specialCharacters = [` `,`!`,`"`,`#`,`$`,`%`,`&`,`'`,`(`,`)`,`*`,`+`,
  `,`,`-`,`.`,`/`,`:`,`;`,`<`,`=`,`>`,`?`,`@`,`[`,`]`,'\\',`^`,`_`,"`",`{`,`|`,`}`,`~`,];

//Gets the password size
function getPassSize(){

let response = prompt(`What size do you want the password to be?
Between 8 to 128 character `);
//Checks if its a number, if not enter the statement
function isPassSizeCorrect(response ,min =7 , max = 129){
  return !isNaN(response) && Number(response) > min && Number(response) < max;
}

//Function that loops until they return me a correct password
 const retryPass = function(){
    response = prompt(`Password size incorrect!
What size do you want the password to be?: `);

    if(isPassSizeCorrect(response)) return;
    else retryPass();
 }

 //If first password is wrong, retry password
 if(!isPassSizeCorrect(response)) retryPass();
 
  return response;
}


//Checks if the response is allowed, if not then retryResponse 
function allowedResponse(response, question){
//Function that will allow the response if the user puts in the correct thing.
const Wantedresponses = [`n`,`y`];

//If they enter a incorrect response, enter this function
function retryResponse(question){
  const response = prompt(`Incorrect Response to ${question} question, please put in y/n`);
  if(!Wantedresponses.includes(response)){
    return retryResponse(question);
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

//Function asks the user what they want to include
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

    //If they don't select an option restart the response
    if(!wantsLowercase && !wantsNumbers && !wantsUppercase && !wantsSpecialCharacter) 
    {
      alert(`You need to select atleast one criteria.`)
      return inclusions();
    }

    let charactersWanted = [];
  
    if(wantsNumbers) charactersWanted.push(...numbers);
    if(wantsLowercase) charactersWanted.push(...characters)
    if(wantsUppercase) charactersWanted.push(...characters.map(character => character.toUpperCase()))
    if(wantsSpecialCharacter)charactersWanted.push(...specialCharacters);

    return charactersWanted;
}



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

 //Returns the password size
const passSize = parseInt(getPassSize());
//Returns the character needed
const totalCharacters = inclusions();

  let rndPass = "";
    for(let i = 0; i < passSize; i++) rndPass += totalCharacters[randomNumInRange(0,totalCharacters.length - 1)];

    return rndPass;
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
