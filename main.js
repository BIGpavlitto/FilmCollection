
function getRequest(){
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let textData = xhttp.response;  //text data received  
        let objectData = JSON.parse(textData);
        sessionStorage.setItem('tokenValue', objectData.token);
      };
    xhttp.open('POST', 'https://fe08-films.herokuapp.com/auth', true);
    xhttp.send();
}

function getFilms(){
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        let textData = xhttp.response;  //text data received  
        objData = JSON.parse(textData);
        let arrayOfFilms = objData[Object.keys(objData)[0]];
        generateCardsInDom(arrayOfFilms);
    }
    xhttp.open('GET', 'https://fe08-films.herokuapp.com/films', true);
    xhttp.setRequestHeader('Autorization', `Beare ${sessionStorage.getItem('tokenValue')}`);
    xhttp.send();
}



//Token generation
getRequest();
//Films getting
getFilms();

//
function generateCardsInDom(filmDatabase){
    let cardFromTemplate = document.querySelector('#card-template');
    let card = cardFromTemplate.content;   
    let filmList = document.querySelector('.film-list');

    for (let i = 0; i < filmDatabase.length; i++) {
        let clonedCard = card.cloneNode(true);
        let image = filmDatabase[i].Poster;
        let releaseDate = filmDatabase[i].Released;
        let rating = filmDatabase[i].Ratings[0]["Value"];
        let filmmaker = filmDatabase[i].Director;
        let plot = filmDatabase[i].Plot;
        let budget = filmDatabase[i].BoxOffice;
        let header = filmDatabase[i].Title;

        //image retrival
        clonedCard.querySelector('.card-header__image').src = image;

         //release retrival
        if(releaseDate === null){
            clonedCard.querySelector('.film-info__release-date').querySelector('.film-info__text').innerHTML = 'N/A';
        }else{
            clonedCard.querySelector('.film-info__release-date').querySelector('.film-info__text').innerHTML = releaseDate;
        }

        //rating retrieval
        if(rating === null){
            clonedCard.querySelector('.film-info__rating').querySelector('.film-info__text').innerHTML = 0;
        }else{
            clonedCard.querySelector('.film-info__rating').querySelector('.film-info__text').innerHTML = rating;
        }

         //director retrieval
         if(filmmaker === null){
            clonedCard.querySelector('.film-info__director').querySelector('.film-info__text').innerHTML = 'N/A';
         }else{
            clonedCard.querySelector('.film-info__director').querySelector('.film-info__text').innerHTML = filmmaker;
         }
        
         //plot retrieval
         //text length limitation in plot
         if(plot === null){
            clonedCard.querySelector('.film-info__plot').querySelector('.film-info__text').innerHTML = 'N/A';
         }else{
            if(plot.length > 140){
                let tersedText = plot.slice(0,137) + '...';
                clonedCard.querySelector('.film-info__plot').querySelector('.film-info__text').innerHTML = tersedText;
            }else{
               clonedCard.querySelector('.film-info__plot').querySelector('.film-info__text').innerHTML = plot;
            }
         }
         
         //boxOffice retrieval
         if(budget === null){
            clonedCard.querySelector('.film-info__box-office').querySelector('.film-info__text').innerHTML = 0;
         }else{
            clonedCard.querySelector('.film-info__box-office').querySelector('.film-info__text').innerHTML = budget;
         }

         //header retrieval
         clonedCard.querySelector('.card-header__title').innerHTML = header;

        filmList.appendChild(clonedCard);
    }
}

//button events
let ratingButton = document.querySelector('#rating');
let releaseDateButton = document.querySelector('#releaseDate');
let boxOfficeButton = document.querySelector('#boxOffice');

ratingButton.addEventListener('click', () => {
    if(releaseDateButton.classList.contains('button_checked')){
        releaseDateButton.classList.toggle('button_checked')
    }else if(boxOfficeButton.classList.contains('button_checked')){
        boxOfficeButton.classList.toggle('button_checked')
    }
    ratingButton.classList.toggle('button_checked');

    sortByRating();
})

releaseDateButton.addEventListener('click', () => {
    if(ratingButton.classList.contains('button_checked')){
        ratingButton.classList.toggle('button_checked')
    }else if(boxOfficeButton.classList.contains('button_checked')){
        boxOfficeButton.classList.toggle('button_checked')
    }
    releaseDateButton.classList.toggle('button_checked');

    sortByReleaseDate();
})

boxOfficeButton.addEventListener('click', () => {
    if(ratingButton.classList.contains('button_checked')){
        ratingButton.classList.toggle('button_checked')
    }else if(releaseDateButton.classList.contains('button_checked')){
        releaseDateButton.classList.toggle('button_checked')
    }
    boxOfficeButton.classList.toggle('button_checked');

    sortByBudget();

})

//sorting by rating
function sortByRating(){

    let innerDivs = document.querySelector('.film-list').getElementsByClassName('card');

    if(ratingButton.classList.contains('button_checked') && document.querySelector('.film-list').hasChildNodes()){
    
        for (let i = 0; i < innerDivs.length; i++) {
            for (let j = 0; j < innerDivs.length - i - 1; j++) {
                if(Number(innerDivs[j + 1].querySelector('.film-info__rating').getElementsByTagName('p')[1].innerHTML.slice(0,3)) > Number(innerDivs[j].querySelector('.film-info__rating').getElementsByTagName('p')[1].innerHTML.slice(0,3))){
                    let temp = innerDivs[j + 1].innerHTML;
                    innerDivs[j + 1].innerHTML = innerDivs[j].innerHTML;
                    innerDivs[j].innerHTML = temp;
                }
            }
        }
    }else if(!ratingButton.classList.contains('button_checked')){
        document.querySelector('.film-list').innerHTML = '';
        getFilms();
    }
}

//sorting by release date
function sortByReleaseDate(){
    
    let innerDivs = document.querySelector('.film-list').getElementsByClassName('card');
    
    if(releaseDateButton.classList.contains('button_checked') && document.querySelector('.film-list').hasChildNodes()){

        for (let i = 0; i < innerDivs.length; i++) {
            for (let j = 0; j < innerDivs.length - i - 1; j++) {
               if(Date.parse(innerDivs[j + 1].querySelector('.film-info__release-date').getElementsByTagName('p')[1].innerHTML) > Date.parse(innerDivs[j].querySelector('.film-info__release-date').getElementsByTagName('p')[1].innerHTML)){
                    let temp = innerDivs[j + 1].innerHTML;
                    innerDivs[j + 1].innerHTML = innerDivs[j].innerHTML;
                    innerDivs[j].innerHTML = temp;
               }
            }
        }
    }else if(!releaseDateButton.classList.contains('button_checked')){
        document.querySelector('.film-list').innerHTML = '';
        getFilms();
    }
}


//sorting by budget
function sortByBudget(){
    let innerDivs = document.querySelector('.film-list').getElementsByClassName('card');
    
    if(boxOfficeButton.classList.contains('button_checked') && document.querySelector('.film-list').hasChildNodes()){

        for (let i = 0; i < innerDivs.length; i++) {
            for (let j = 0; j < innerDivs.length - i - 1; j++) {
               if(Number(innerDivs[j + 1].querySelector('.film-info__box-office').getElementsByTagName('p')[1].innerHTML.slice(1).replace(/,/g, "")) > Number(innerDivs[j].querySelector('.film-info__box-office').getElementsByTagName('p')[1].innerHTML.slice(1).replace(/,/g, ""))){
                    let temp = innerDivs[j + 1].innerHTML;
                    innerDivs[j + 1].innerHTML = innerDivs[j].innerHTML;
                    innerDivs[j].innerHTML = temp;
               }
            }
        }
    }else if(!boxOfficeButton.classList.contains('button_checked')){
        document.querySelector('.film-list').innerHTML = '';
        getFilms();
    }
}










