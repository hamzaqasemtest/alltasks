function countCharacters() {
    const str = document.getElementById("inputCharacters").value;
    const charCount = {};
    
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if(charCount[char]) {
        charCount[char]++;
      }
      else {
        charCount[char] = 1;
      }      
    }
  
    const table = document.getElementById("outTable");
    table.innerText = "";
    
    for (let char in charCount) {
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerText = char;
      cell2.innerText = charCount[char];
    }
}