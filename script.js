gsap.registerPlugin(ScrollTrigger);

let brick = '';
let sections;

getStarted();

function getStarted() {
    console.log(Artist);

    preloadImages();
    getNav();
    getArtist(0);
}

function getNav() {
    brick = '';

    for (let i = 0; i < Artist.length; i++) {
        brick += `<div class="nav-item" onclick="getArtist(${i})"><a href="#">${Artist[i].artistName}</a></div>`;
        console.log(Artist[i])
    }

    document.getElementById("nav").innerHTML = brick;
}

function getArtist(index) {
    brick = '';
    document.getElementById('output').innerHTML = '';
    brick += '<div class="artist">';
    brick += `<h1 class="artist-name">${Artist[index].artistName}</h1>`;
    brick += `<h2 class="genre">${Artist[index].genre}</h2>`;

    brick += '<div class="albums">';
    for (let i = 0; i < Artist[index].albums.length; i++) {
        let artistName = Artist[index].artistName.split(' ').join('');
        let albumName = Artist[index].albums[i].name.split(' ').join('');
        brick +=
            `<div class="album album-of-${artistName}-name-${albumName}"> 
            <h3 class="albumNameHeadline">${Artist[index].albums[i].name}</h3> 
            <p class="dateOfAlbum">${Artist[index].albums[i].releaseDay} ${Artist[index].albums[i].releaseMonth} ${Artist[index].albums[i].releaseYear}</p> 
            <img onclick="changeBackground(${index},${i});" class="album-images" src="${Artist[index].albums[i].imageSrc}" alt="'${Artist[index].albums[i].name}' Album Cover">
            <div class="album-links">
                <a class="album-link" href="${Artist[index].albums[i].SpotifyLink}">Listen to it on<br>Spotify</a>
                <a class="album-link" href="${Artist[index].albums[i].AppleMusicLink}">Listen to it on<br>Apple Music</a>
                <a class="album-link" href="${Artist[index].albums[i].YoutubeLink}">Listen to it on<br>YouTube</a>
            </div>
            <h3 class="get-songs" onclick="getSongs(${index}, ${i}, '${artistName}', '${albumName}')">Songs</h3>
        </div>`;
    }
    brick += '</div>';

    document.getElementById('output').innerHTML += brick;

    sections = document.querySelectorAll('.album');

    for (let i = 0; i < sections.length; i++) {
        scrollAnimation(i);
    }
    
}

function getSongs(index, albumNumber, artistName, albumName) {
    brick = '';
    brick += '<div class="songs" id="clear-songs">';
    for (let i = 0; i < Artist[index].albums[albumNumber].songs.length; i++) {
        brick += `<div class="song" style="text-align: center;">${i + 1}. ${Artist[index].albums[albumNumber].songs[i]}</div>`;
    }
    brick += '</div>';

    document.getElementsByClassName('album-of-' + artistName + '-name-' + albumName)[0].innerHTML += brick;

    document.getElementsByClassName('get-songs')[albumNumber].setAttribute('onclick', `clearSongs(${index}, ${albumNumber}, '${artistName}', '${albumName}')`);
}

function clearSongs(index, albumNumber, artistName, albumName) {
    document.getElementById('clear-songs').remove();
    document.getElementsByClassName('get-songs')[albumNumber].setAttribute('onclick', `getSongs(${index}, ${albumNumber}, '${artistName}', '${albumName}')`);
}

function preloadImages() {
    let imageBrick = '';
    for (let i = 0; i < Artist.length; i++) {
        for (let j = 0; j < Artist[i].albums.length; j++) {
            imageBrick += `<link rel="preload" href="${Artist[i].albums[j].imageSrc}" as="image">`;
        }
    }

    document.head.innerHTML += imageBrick;
}

function changeBackground(index, albumNumber) {
    document.body.style.backgroundImage = `url(${Artist[index].albums[albumNumber].imageSrc})`;
}

// Start with GSAP Animations

gsap.set('nav', {
    y: -100,
    opacity: 0
});

gsap.to('nav', {
    y: 0,
    opacity: 1,
    duration: 1
});


 sections = document.querySelectorAll('.album');

for (let i = 0; i < sections.length; i++) {
    scrollAnimation(i);
}

function scrollAnimation(i) {

    let element = sections[i];

    if (i % 2 == 0) {
        gsap.set(element, {
            x: '-110%',
            y: '20%',
            scale: 0.5,
            opacity: 0
        });
    } else {
        gsap.set(element, {
            x: '110%',
            y: '20%',
            scale: 0.5,
            opacity: 0
        });
    }

    gsap.to(element, {
        x: 0,
        y: 0,
        opacity: 2,
        scale: 1,
        duration: 0.7,
        scrollTrigger: {
            trigger: element,
            start: '10% 91%',
        }
    });

}