
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
        clonedCard.querySelector('.film-info__release-date').querySelector('.film-info__text').innerHTML = releaseDate;

        //rating retrieval
        clonedCard.querySelector('.film-info__rating').querySelector('.film-info__text').innerHTML = rating;

         //director retrieval
         clonedCard.querySelector('.film-info__director').querySelector('.film-info__text').innerHTML = filmmaker;

         //plot retrieval
         clonedCard.querySelector('.film-info__plot').querySelector('.film-info__text').innerHTML = plot;

         //boxOffice retrieval
         clonedCard.querySelector('.film-info__box-office').querySelector('.film-info__text').innerHTML = budget;

         //header retrieval
         clonedCard.querySelector('.card-header__title').innerHTML = header;




        /* //text length limitation
        let filmInfo = clonedCard.querySelector('.film-info__plot');
        let pElement = filmInfo.querySelector('film-info__text');

        if(pElement.innerHTML.length > 137){
            let tersedText = pElement.innerHTML.slice(0,137) + '...';
            pElement.innerHTML = '';
            pElement.innerHTML = tersedText;
        } */
        filmList.appendChild(clonedCard);
    }
}



