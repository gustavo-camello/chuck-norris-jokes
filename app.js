(function (){
  // Declare DOM variables
  const numberJokes = document.querySelector('#form-number-jokes');
  const jokesList = document.querySelector('#jokes-list');
  const newNameInput = document.querySelector('#new-name');
  const modal = document.querySelector('.modal-container');
  const modalBtn = document.querySelector('#be-chuck');
  const bringChuckBack = document.querySelector('#return-chuck');
  const name = document.querySelector('#name');
  const buttons = document.querySelectorAll('.button');
  let newName = '';

  // Add eventListeners
  numberJokes.addEventListener('submit', getJokes);
  modalBtn.addEventListener('click', displayModal);
  bringChuckBack.addEventListener('click', returnChuck);

  // Buttons in the modal
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      if (e.target.classList.contains('modal-btn')){
        console.log(e.target);
        newName = document.querySelector('#new-name').value;
        name.textContent = newName;
        closeModal();
        console.log(newName);
        jokesList.innerHTML = '';
        bringChuckBack.style.visibility = 'visible';
        e.preventDefault();
      } else if (e.target.classList.contains('close-btn')){
        newNameInput.value = '';
        closeModal();
      }
    })
  })
  
  // Function to fetch the jokes
  function getJokes (e){
    e.preventDefault();
    const numberOfJokes = document.querySelector('#user-input').value;

    if (newNameInput.value === ''){
      fetch(`https://api.icndb.com/jokes/random/${numberOfJokes}`)
      .then(response => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error ('Something went wrong')
        }
      })
      .then(jokes => {
        let output = '';
        jokes.value.forEach(theJokes => {
          output += `<div class="joke">
          <p class="joke-phrase">${theJokes.joke}</p>
        </div>`;
        })
        
        jokesList.innerHTML = output;
      })
      .catch(error => {
        console.log(error);
      })
    }else {
      fetch(`https://api.icndb.com/jokes/random/${numberOfJokes}?firstName=${newNameInput.value}`)
      .then(response => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error ('something went wrong')
        }
      })
      .then(jokes => {
        let output = '';
        jokes.value.forEach(theJokes => {
          output += `<div class="joke">
          <p class="joke-phrase">${theJokes.joke}</p>
        </div>`;
        })
        
        jokesList.innerHTML = output;
      })
      .catch(error => {
        console.log(error);
      })
    } 
  }

  // Function to return to chuck
  function returnChuck () {
    bringChuckBack.style.visibility = 'hidden';
    newName = 'Chuck';
    newNameInput.value = 'Chuck';
    name.textContent = newName;
    jokesList.innerHTML = '';
  }

  // Functions for the modal
  function displayModal () {
    modal.style.display = 'block';
  }

  function closeModal () {
    console.log(newName);
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

})();