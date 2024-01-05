/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let i=0,j=str.length-1;
  str=str.toLowerCase();

  while(i<j){
    while(i<j && !(str.charCodeAt(i)>=97 && str.charCodeAt(i)<=122)) i++;
    while(i<j && !(str.charCodeAt(j)>=97 && str.charCodeAt(j)<=122)) j--;
    if(i>=j) return true;
    else{
      if(str.charAt(i)==str.charAt(j)){
        i++;
        j--;
      }else return false;
    }
  }
  return true;
}

module.exports = isPalindrome;
