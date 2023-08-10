let detailsContainer=document.getElementById('detail-container');
console.log(detailsContainer);
let imdbID=localStorage.getItem('movieID')+"";
console.log(imdbID);
fetch(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=1e6d9e90`).then((response)=>{
    return response.json();
    }).then((data)=>{
        console.log(data)
     if(data)
     {     
       console.log(data)
       detailsContainer.innerHTML=`
       <div class="card mb-3" >
       <div class="row g-0">
         <div class="col-md-4">
           <img src="${data.Poster}" class="img-fluid rounded-start" alt="MovieImg">
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h3 class="card-title mb-3">${data.Title}</h3><hr>
             <p class="card-text">Stars : ${data.Actors}</p>
             <p class="card-text">Director : ${data.Director}</p>
             <p class="card-text">Writer : ${data.Writer}</p>
             <p class="card-text">Genre : ${data.Genre}</p>
             <p class="card-text">Language : ${data.Language}</p>
             <p class="card-text"><small class="text-body-secondary">Release Year : ${data.Released}</p>
             <p class="card-text"><small class="text-body-secondary">BoxOffice : ${data.BoxOffice}</p>
             <p class="card-text"><small class="text-body-secondary">IMDB : ${data.imdbRating}</p>
             <hr>
             <p class="card-text">Plot : ${data.Plot}</p>
             <hr>
           </div>
         </div>
       </div>
     </div>
      `
      localStorage.removeItem('movieID');
     }
     })
     