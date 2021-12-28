 const x_class = 'x';
 const circle_class = 'circle'

 const winning_combo = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
 ];
 const cellelement = document.querySelectorAll('[data-cell]');
 const board = document.getElementById('board');
 const winningmessagetext = document.getElementById('winningmessage');
 let circleturn
 const winningtext = document.querySelector('[data-winning-message-text]')
 startgame();

 function startgame() {
     circleturn = false;
     //  cell.classList.remove(x_class);
     //  cell.classList.remove(circle_class);
     cellelement.forEach(cell => {
         cell.addEventListener('click', handleClick, { once: true })
     })
     setboardhover()
     winningtext.classList.remove('show');

 }

 function handleClick(ele) {
     const cell = ele.target;
     const currentclass = circleturn ? circle_class : x_class
     placemark(cell, currentclass)
     if (checkwin(currentclass)) {
         endgame(false)
     } else if (isdraw()) {
         endgame(true)
     } else {
         swapturns()
         setboardhover()
     }

 }

 function endgame(draw) {
     if (draw) {
         winningtext.innerText = 'Draw!!'
     } else {
         winningtext.innerText = `${circleturn ? "O's" : "X's"} Wins!`
     }
     winningmessagetext.classList.add('show')
 }

 function isdraw() {
     return [...cellelement].every(cell => {
         return (cell.classList.conatins(x_class) || cell.classList.conatins(circle_class))
     })
 }


 function placemark(cell, currentclass) {
     cell.classList.add(currentclass);
 }

 function swapturns() {
     circleturn = !circleturn
 }

 function setboardhover() {
     board.classList.remove(x_class);
     board.classList.remove(circle_class);
     if (circleturn) {
         board.classList.add(circle_class);
     } else {
         board.classList.add(x_class)
     }
 }

 function checkwin(currentclass) {
     return winning_combo.some(combination => {
         return combination.every(index => {
             return cellelement[index].classList.contains(currentclass)
         })
     })
 }