
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = 'https://api.lyrics.ovh';

form.addEventListener('submit',e =>{
    e.preventDefault();
    searchValue = search.value.trim();

    if(!searchValue){
        alert('There is nothing to search!')
    }
    else{
        searchSong(searchValue)
        
    }
});

async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    showData(data);
}

//updating the DOM

function showData(data){
    result.innerHTML =` 
    <ul class="song-list">
        ${data.data.map(song => `<li>
                                    <div>
                                        <strong>
                                            ${song.artist.name}
                                        </strong> ${song.title}
                                    </div> 
                                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">get Lyric</span>
                                </li>

        `).join('')
        }
    </ul>`
}

//event listner in get lyric

result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist,songTitle)

    }
});

//get lyrics

async function getLyrics(artist,songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>
                            ${artist}
                            </strong>   ${songTitle}
                        </h2>
                        <p> ${lyrics}</p>
                        `
}