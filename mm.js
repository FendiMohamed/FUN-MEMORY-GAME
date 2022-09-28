document.querySelector('.control-buttons span').onclick = function(){
 let yourName = prompt('Whats Your Name?');
 if(yourName == null || yourName == ''){
 document.querySelector('.name span').innerHTML = 'unknown';
 }else{
  document.querySelector('.name span').innerHTML = yourName;
 }
 document.querySelector('.control-buttons').remove();
}
let counter = 0;
///timer///////////////
const startMinute = 6;
let time = startMinute * 60;
let countDown = document.getElementById('countdown');
let finish = setInterval(updateCountDown,1000)
function updateCountDown () {
 const minutes = Math.floor(time/ 60);
 let seconds = time % 60;
 seconds = seconds < 10 ? '0' + seconds : seconds;
 countDown.innerHTML = `${minutes}:${seconds}`;
 time--;
 if( time < 0){
  clearInterval(finish);
  document.querySelector('.bd').classList.add('no-clicking');
  countDown.innerHTML = 'You Lost Please Try Again';
 }
}
////////
let duration = 1000;
let blockContainor = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blockContainor.children);
console.log(blocks);
let orderRange = [...Array(blocks.length).keys()];
console.log(orderRange);
shuffle(orderRange);

blocks.forEach((block,index)=> {

 block.style.order = orderRange[index];

 block.addEventListener('click', function() {
  flipBlock(block);
 });
});

function flipBlock(selectedBlock){
 selectedBlock.classList.add('is-flipped');
 //collect all flipped card
 let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
 //if there is two selected blocks
 if(allFlippedBlocks.length === 2){
  console.log('two selected');

 //stop clicking function
stopClicking();
//////
 //check matched block function
 checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
}
}

function stopClicking(){
 //add class no clicking on main containor
 document.querySelector('.memory-game-blocks').classList.add('no-clicking');
 setTimeout(() => {
  blockContainor.classList.remove('no-clicking');

 },duration)

}
function checkMatchedBlocks(firstBlock,secondBlock){

let triesElement = document.querySelector('.tries span');
if(firstBlock.dataset.band === secondBlock.dataset.band){
 firstBlock.classList.remove('is-flipped');
 secondBlock.classList.remove('is-flipped');

 firstBlock.classList.add('has-match');
 secondBlock.classList.add('has-match');
 counter = counter + 1;
 document.getElementById('succes').play();
}else{
 triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

 setTimeout(() => {

  firstBlock.classList.remove('is-flipped');
  secondBlock.classList.remove('is-flipped'); 

 }, duration);
 document.getElementById('fail').play();
 }
 if( parseInt(triesElement.innerHTML) >= 15){
  clearInterval(finish);
  document.querySelector('.bd').classList.add('no-clicking');
  countDown.innerHTML = 'You Lost Please Try Again';
 };
 if(counter == (orderRange.length / 2)){
  clearInterval(finish);
  document.querySelector('.bd').classList.add('no-clicking');
  countDown.innerHTML = 'Congrats You Won';
 };
}

function shuffle(array){
 let current = array.length,
 temp,
 random ;
 while( current > 0) {
  random = Math.floor(Math.random() * current);
  current--;
  // save current element in stash
  temp = array[current];
  // current element = random element
  array[current] =  array[random];
  //random element = get element from stash
  array[random] = temp;
 }
 return array;
}