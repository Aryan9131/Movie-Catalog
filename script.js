let cards = document.getElementsByClassName('glass-card');
let titles = document.getElementsByClassName('title');
let types = document.getElementsByClassName('type');
let imdbId = document.getElementsByClassName('imdb-id');
let symbols = document.getElementsByClassName('symbol');
let searchButton = document.getElementById('search');
let searchedMovies = document.getElementById('search-result');
let likedMovies=JSON.parse(localStorage.getItem('likedMovies'));
// Object of Some Suggested Movies Poster - Suggested Dual Audio movies Poster
let dualAudioPoster = {
    avatar: "https://w0.peakpx.com/wallpaper/433/718/HD-wallpaper-avatar-poster-avatar-poster-blue-hollywood-fantasy.jpg",
    avengerEndgame: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810",
    jurrasicPark: "https://cdn.wallpapersafari.com/28/12/krNGnx.jpg",
    inception: "https://images2.alphacoders.com/851/thumb-1920-85182.jpg",
    persuitOfHappiness: "https://images.justwatch.com/poster/241439322/s718/the-pursuit-of-happyness.%7Bformat%7D",
    johnWick: "https://e0.pxfuel.com/wallpapers/992/931/desktop-wallpaper-john-wick-iphone-john-wick-black.jpg",
    casinoRoyale: "https://e1.pxfuel.com/desktop-wallpaper/229/514/desktop-wallpaper-casino-royale-movie-posters-casino-movie.jpg",
    ironMan: "https://wallpaperaccess.com/full/1925945.jpg",
    matrix: "https://e0.pxfuel.com/wallpapers/316/73/desktop-wallpaper-the-matrix-reloaded-2003-phone-matrix-reloaded-matrix-movie-thumbnail.jpg",
    donnotLookUp: "https://sno.dvrhs.org/wp-content/uploads/2022/03/MV5BNzk0OWQzMDQtODg1ZC00Yjg2LWJjYzAtNGRjMjE2M2FlYjZjXkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_.jpg"
}

// Object of Some Suggested Movies Poster - Suggested Bollywood movies Poster
let bollywoodPoster = {
    pathaan: "https://e1.pxfuel.com/desktop-wallpaper/111/104/desktop-wallpaper-aryan-khan-on-twitter-pathaan.jpg",
    heraPheri: "https://wallpapercave.com/wp/wp6328023.jpg",
    badla: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2019/badla/poster.jpg",
    rrr: "https://e1.pxfuel.com/desktop-wallpaper/932/661/desktop-wallpaper-meet-the-real-rrr-revolutionaries-rrr-poster-thumbnail.jpg",
    barfi: "https://upload.wikimedia.org/wikipedia/en/2/2e/Barfi%21_poster.jpg",
    ddlj: "https://images.jdmagicbox.com/comp/jd_social/news/2018jul07/image-8836-a0311cc0pf.jpg",
    bramhastra: "https://wallpapercave.com/wp/wp10472643.jpg",
    drishyam: "https://m.media-amazon.com/images/M/MV5BYmJhZmJlYTItZmZlNy00MGY0LTg0ZGMtNWFkYWU5NTA1YTNhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UY1200_CR100,0,630,1200_AL_.jpg",
    swades: "https://e1.pxfuel.com/desktop-wallpaper/728/734/desktop-wallpaper-swades-movie-poster-swades.jpg",
    sholay: "https://image.songsuno.com/movie-images/original/movie/sholay/sholay-poster.jpg"
}

// Object of Some Suggested Movies Poster - Suggested English movies Poster
let hollywoodPoster = {
    godFather: "https://picfiles.alphacoders.com/500/thumb-500464.jpg",
    justiceLeague: "https://w0.peakpx.com/wallpaper/955/505/HD-wallpaper-justice-league-dc-movie-superheroes.jpg",
    shawshank: "https://i5.walmartimages.com/asr/e287a1b2-a085-4714-b3bd-c9c18afe6b95.f4c5cbb28c60c759448098d11de954b1.jpeg",
    titanic: "https://e0.pxfuel.com/wallpapers/657/1014/desktop-wallpaper-best-titanic-movie.jpg",
    darkKnight: "https://picfiles.alphacoders.com/360/thumb-360100.jpg",
    fightClub: "https://e1.pxfuel.com/desktop-wallpaper/795/877/desktop-wallpaper-fight-club-custom-edit-fight-club-thumbnail.jpg",
    forrestGump: "https://w0.peakpx.com/wallpaper/1/639/HD-wallpaper-forrest-gump-love-movie.jpg",
    schindlerList: "https://wallpapers.com/images/hd/schindler-s-list-oskar-schindler-film-poster-guo1fmhjzfbx79tj.jpg",
    noCountryForOldMan: "https://wallpapercave.com/wp/wp2466118.jpg",
    lifeIsBeautiful: "https://cdn.wallpapersafari.com/34/66/Iycowd.jpg"
}

// Add Background of Some Suggested Movies
function addBackground(obj) {
    for (key in obj) {
        let ele = document.getElementById(`${key}`)
        ele.style.backgroundImage = `url(${obj[key]})`
    }
}

// function take array of search movies as argument and display it on screen
function displayMovies(movieList){
            let str = ``;        
            for (let i = 0; i < movieList.length; i++) {
                str += `
                <div class='movieCont'>
                 <a href="./movieDetails/movieDetail.html">
                  <div id=${movieList[i].imdbID} class="glass-card" style="width:200px; background-image:url(${movieList[i].Poster});">
                    <div class="data">      
                      <p class="title">${movieList[i].Title}</p>
                      <p id="imdb-id">${movieList[i].imdbID}</p>
                    </div>
                  </div>
                 </a>
                  <div class="like">
                    <i class="fa-solid fa-2x fa-heart symbol" style="color: #f89ef8;"></i>
                  </div>
                </div>`
            }
            searchedMovies.innerHTML = str;
}

// Fetch Movies based on Search and call Display function to display Search Movies
function fetchMovies(movieWant) {
    fetch(`https://www.omdbapi.com/?s=${movieWant}&apikey=1e6d9e90`).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.Search) {
            let movieList = data.Search;
            displayMovies(movieList);
        }
    })
}

// Function to Update and Display the Liked-Movies List on Sidebar as i click on Like Symbol on Movies
let count=0;
LikedListDisplay();
function LikedListDisplay(){
    let likedMovieList=JSON.parse(localStorage.getItem('likedMovies'));
    let likedMovieListContainer=document.getElementById('likedMoviesListItems')
    // check if the Liked Movies list is empty then display all Movies by getting from localstorage
    if(likedMovieList!=undefined){
        if(likedMovieListContainer.innerHTML.trim()=="" )
        {
            for(let j=0;j<likedMovieList.length;j++)
            {
             likedMovieListContainer.innerHTML+=`<a href="./likedMovieDetails/liked.html" ><li class="liked">${likedMovieList[j]}</li></a>`
             count++;
            }
        }
        // Else if Liked movies list is already in display and contain some movies then just add the recently liked movie
        else{
        likedMovieListContainer.innerHTML+=`<a href="./likedMovieDetails/liked.html" ><li class="liked">${likedMovieList[count]}</li></a>`
        count++;
       }   
    }
}

// Add BackGround of Some Static and Suggested Movies
addBackground(dualAudioPoster);
addBackground(bollywoodPoster);
addBackground(hollywoodPoster);


// Event Delegation to make liked movie list and to find Details of Clicked movie by saving its imdbID on localStorage
document.addEventListener('click', (event) => {
    if (event.target.classList.contains("symbol")) {
        event.target.style.color = "red";
        let likedMovie=event.target.parentElement.parentElement;
        let likedMovieTitle=likedMovie.querySelector('.title').innerText;
        if(likedMovies==null)
        {
            likedMovies=[];
        }
        else if(likedMovies.indexOf(likedMovieTitle)==-1)
        {
            likedMovies.push(likedMovieTitle);
            localStorage.setItem('likedMovies',JSON.stringify(likedMovies));
            LikedListDisplay();  
            window.alert("Movie is Added to Liked List see LikedMovies List Above")
        }else{
            window.alert("Movie is Already in LikedMovies List see Above")
        }     
      }
    else if (event.target.classList.contains("glass-card")) {
        let id = (event.target.querySelector('#imdb-id').innerText) + " "
        localStorage.setItem('movieID', id)
    }else if(event.target.classList.contains("liked"))
    {
            localStorage.setItem('likedClick',JSON.stringify(event.target.innerText))  
    }
})


// Event listener(keyup) on Search bar to Search based on typed input and call FetchMovie function
searchButton.addEventListener('keyup', (event) => {
    fetchMovies(event.target.value)
})
