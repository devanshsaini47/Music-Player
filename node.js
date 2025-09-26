
const firebaseConfig = {
    apiKey: "AIzaSyAn_kU6CLpkpRb4DvXOpTOLOC8Qz-8RWlY",
    authDomain: "sangeet-6cc3f.firebaseapp.com",
    databaseURL: "https://sangeet-6cc3f-default-rtdb.firebaseio.com",
    projectId: "sangeet-6cc3f",
    storageBucket: "sangeet-6cc3f.appspot.com",
    messagingSenderId: "680103315670",
    appId: "1:680103315670:web:40ba555527e4af59dae177",
    measurementId: "G-LTH8G4EBJT"
  };


firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  function save(params) 
  {

        if(songName.value!="" && artistName.value!="" && poster.value!="" && url!=undefined)
            {
                
                poster1= URL.createObjectURL(poster.files[0]);
                newDefault.src= poster1;

                
                addedSongName.innerText= songName.value;
                addedArtistName.innerText= artistName.value;
                const songAudio1= url;
                const songName1= songName.value;
                const artistName1=artistName.value;
        
                
               
                database.ref('user/'+ songName1).set(
                    {
                    poster: poster1,
                    audio: songAudio1,
                    name: songName1,
                    artist: artistName1,
                    
                    });
                alert("saved");
            
                
                  poster.value= "";
                  url.value="";
                  songName.value= "";
                  artistName.value= "";
            }
            else{
                alert("Fufill all the requirements");
            }
      }




let defaultPic= document.querySelector('.pic');
let playButton= document.querySelector("#run");
let trash= "0";
let music,a,storeSetInterval;
let p=0;
let ClickedDiv
let musicPlayer= document.querySelector(".player");
let controller= document.querySelector(".slider");
let allSongs= document.querySelectorAll(".song");
controller.value= 0;
let songsMenuDiv= document.querySelector('.songs-menu');
let menuBody= document.querySelector('.menu-body');
let searchBar, searchedSongDiv, songList, newDefault, poster, songName, artistName, audioSong, data, poster1, addedSongName, addedArtistName;
let b;
let sum=0;
let audioFile, url;
let toStoreNameOfSong= [];
let audioPlayer= document.querySelector("#audioPlayer");
let songs= [
        {
            name: "capital",
            singer: "nanku",
            poster: "capital.jpg",
            audio: "capital.mp3",
        },
        {
            name: "101",
            singer: "seedhe maut",
            poster: "101.jpg",
            audio: "101.mp3",
        },
        {
            name: "11k",
            singer: "seedhe maut",
            poster: "11k.jpg",
            audio: "11k.mp3",

        },{
            name: "heeriye",
            singer: "nanku",
            poster: "heeriye.jpg",
            audio: "heeriye.mp3",

        },{
            name: "kamikaze",
            singer: "nanku",
            poster: "kamikaze.jpg",
            audio: "kamikaze.mp3",

        },{
            name: "namastute",
            singer: "seedhe maut",
            poster: "namastute.jpg",
            audio: "namastute.mp3",

        },{
            name: "aajkal",
            singer: "nanku",
            poster: "aajkal.jpg",
            audio: "aajkal.mp3",

        },{
            name: "nanchaku",
            singer: "mc stan",
            poster: "nanchaku.jpg",
            audio: "nanchaku.mp3",
        },
]


function PicChanger(event) {
    if (p===1) 
        {
        ClickedDiv= event.querySelector('#image');
      if (trash=== "1") 
        {
            music.pause();        
        }
      music= event.querySelector('#song');
      defaultPic.src= ClickedDiv.src;
      a= ClickedDiv.src.toString();
      playButton.classList.remove("fa-play");
      playButton.classList.add("fa-pause");
      trash= "1";
      musicPlayer.style.backgroundImage= `url("${a}")`;
      musicPlayer.style.backgroundRepeat= "no-repeat";
      musicPlayer.style.backgroundSize= "cover";
      musicPlayer.style.backgroundBlendMode= "Hard-light"
      
      music.play();
      music.currentTime=0;
      controller.max= music.duration;
      p=0;
    }
    else{
        ClickedDiv = event.currentTarget.querySelector('#image');
        if (trash=== "1") 
        {
            music.pause();        
        }
        music= event.currentTarget.querySelector('#song');
        defaultPic.src= ClickedDiv.src;
        a= ClickedDiv.src.toString();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        trash= "1";
        musicPlayer.style.backgroundImage= `url("${a}")`;
        musicPlayer.style.backgroundRepeat= "no-repeat";
        musicPlayer.style.backgroundSize= "cover";
        musicPlayer.style.backgroundBlendMode= "Hard-light"
        music.play();
        music.currentTime=0;
       
        controller.max= music.duration;
        storeSetInterval= setInterval(() => {
            controller.value= music.currentTime;
            if(controller.value>=(music.duration-5))
                {
                changeSong('next');
                }
        }, 200);
    }
    
}

function pause(params) {
    let value= playButton.classList[1].toString();

    if (value==="fa-pause") {
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        if(trash=== "1")
        {
            music.pause();
        }
    }

    else if(value==="fa-play")
    {
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        if(trash==="1")
        {
            music.play();
        }
    }
}

function ward(word) {
    if (word==="forward") {
        if(music.currentTime<=music.duration)
        {
            music.currentTime= music.currentTime+10;        
                if (music.currentTime==music.duration) {
                    playButton.classList.remove("fa-pause");
                    playButton.classList.add("fa-play");
                }
        }
    }
    else{
        music.currentTime= music.currentTime-10;
    }
}
function manual(params) {
    clearInterval(storeSetInterval);
    music.currentTime= controller.value;
    storeSetInterval= setInterval(() => {
        controller.value= music.currentTime;
        if(controller.value>=(music.duration-5))
            {
            changeSong('next');
            }
    }, 200);
}
function changeSong(params) {
       if(params==='next')
        {
            for (let index = 0; index < allSongs.length; index++)
                {
               let element = allSongs[index];
               let x= element.querySelector('#image');
               let y= x.src.toString();
               
               if(a===y){
                    if (index==7) {
                        break;
                    }
                   p=1;
                   PicChanger(allSongs[index+1]);
                   break;
               }
               } 
        }
        else{
            for (let index = 0; index < allSongs.length; index++)
                {
               let element = allSongs[index];
               let x= element.querySelector('#image');
               let y= x.src.toString();
               
               if(a===y){
                if (index==0) {
                    break;
                }
                   p=1;
                   PicChanger(allSongs[index-1]);
                   break;
               }
               }
        }
}
function addHomePage(params) {
    if(songsMenuDiv.classList.contains("d1") )
        {
            songsMenuDiv.classList.remove("d1") 
        }
    else if(songsMenuDiv.classList.contains("d2") )
    {
        songsMenuDiv.classList.remove("d1") 
    }
    else if(songsMenuDiv.classList.contains("d3") )
    {
        songsMenuDiv.classList.remove("d3") 
    }
    songsMenuDiv.innerHTML= `<div class="songs-menu">
    <div class="song" onclick="PicChanger(event)">
        <img src="capital.jpg" id="image" alt="" srcset="">
        <h1>Capital</h1>
        <p>Nanku</p>
        <audio src="capital.mp3" id="song"></audio>
    </div>
    <div class="song" onclick="PicChanger(event)">
        <img src="101.jpg" id="image"  alt="" srcset="">
        <h1>101</h1>
        <p>Seedhe Maut</p>
        <audio src="101.mp3" id="song"></audio>
    </div>
    <div class="song" onclick="PicChanger(event)">
        <img src="11k.jpg" id="image"  alt="" srcset="">
        <h1>11k</h1>
        <p>Seedhe Maut</p>
        <audio src="11k.mp3" id="song"></audio>
    </div>
    <div class="song" onclick="PicChanger(event)">
        <img src="heeriye.jpg" id="image"  alt="" srcset="">
        <h1>Heeriye</h1>
        <p>Nanku</p>
        <audio src="heeriye.mp3" id="song"></audio>
    </div>
    <div class="song" onclick="PicChanger(event)">
        <img src="kamikaze.jpg" id="image"  alt="" srcset="">
        <h1>Kamikaze</h1>
        <p>Nanku</p>
        <audio src="kamikaze.mp3" id="song"></audio>
    </div>
    <div class="song" onclick="PicChanger(event)">
        <img src="namastute.jpg" id="image"  alt="" srcset="">
        <h1>Namastute</h1>
        <p>Seedhe Maut</p>
        <audio src="namastute.mp3" id="song"></audio>
    </div>
    <div class="song" onclick="PicChanger(event)">
        <img src="aajkal.jpg" id="image"  alt="" srcset="">
        <h1>Aajkal</h1>
        <p>Nanku</p>
        <audio src="aajkal.mp3" id="song"></audio>
    </div>
    <div class="song" onclick="PicChanger(event)">
        <img src="nanchaku.jpg" id="image"  alt="" srcset="">
        <h1>Nanchaku</h1>
        <p>MC Stan</p>
        <audio src="nanchaku.mp3" id="song"></audio>
    </div>
    </div>`;
}

function search(params) {
    if(songsMenuDiv.classList.contains("d2"))
        {
            songsMenuDiv.classList.remove("d2");
        }
        else if(songsMenuDiv.classList.contains("d3"))
            {
                songsMenuDiv.classList.remove("d3");
            }
        songsMenuDiv.classList.add("d1");

        songsMenuDiv.innerHTML= 
        
        `<div class= "searchBarDiv">
            <div class= "searchBarBorder">
                <input type="search" name="" id="searchBar" onchange= "searchSong()" autocomplete="off" />
            </div>
        </div>
        <div class= "songList">

        </div>
        `
        searchBar= document.querySelector("#searchBar");
        songList= document.querySelector(".songList");
        b=0;
}

function searchSong(params)
 {

    if(b==1)
        {
            songList.removeChild(searchedSongDiv);
        }
        for (let index = 0; index < songs.length; index++) 
            {
            const element = songs[index].name;
            let value= searchBar.value.toString();
            for (let index = 0; index < value.length; index++) {
                let k = value[index];
                if (k==" ") {
                    value= value.slice(0,index);
                }
            }
            if(element===(value.toLowerCase()))
                {
                    searchedSongDiv= document.createElement("div");
                    let image= document.createElement("img");
                    let title= document.createElement("h1");
                    let artistName= document.createElement("p");
                    let songAudio= document.createElement("audio");
                    songAudio.src=songs[index].audio;
                    songAudio.id= "song";
                    image.src= songs[index].poster;
                    image.id= "image";
                    title.innerText= songs[index].name;
                    artistName.innerText= songs[index].singer;
                    searchedSongDiv.className= "song";
                    searchedSongDiv.addEventListener('click', (event)=>{
                        PicChanger(event);
                    });
                    searchedSongDiv.appendChild(image);
                    searchedSongDiv.appendChild(title);
                    searchedSongDiv.appendChild(artistName);
                    searchedSongDiv.appendChild(songAudio);
                    songList.appendChild(searchedSongDiv)
                    b=1;
                }
                else{
                    sum+=1;
                    if(sum==8){
                        b=0;
                    }
                }
        }
        sum=0;
}
function addSongs(params) {
    if(songsMenuDiv.classList.contains("d1"))
        {
            songsMenuDiv.classList.remove("d1");
        }
        else if(songsMenuDiv.classList.contains("d3"))
            {
                songsMenuDiv.classList.remove("d3");
            }
    songsMenuDiv.classList.add("d2");
    songsMenuDiv.innerHTML=`
    <div class="borderForNewSong">
        <div class="newSong">
            <img src= "default1.jpg" id="newDefault">
            <h1 id="addedSongName">Song</h1>
            <p id="addedArtistName" > artist</p>
        </div>
    </div>
    <div class="essentials">
        <h1>Poster:</h1>
        <input type="file" class="choose-file" id="posterImage" name="choose-file" accept="image/*" />
        <h1>Audio:</h1>
        <input type="file" name="" class="choose-file" id="audioSong" accept="audio/*"/>   
        <h1>Song Name:</h1>
        <input type="text" name="" class="songNamePad" id="songName" />
        </br>
        <h1>Artist Name:</h1>
        <input type="text" name="" class="songNamePad" id="artistName" />
        </br>
        <div class="submitDiv">
                <button class="submit" onclick="save()">
                    Submit
                </button>
        </div>
    </div>
        
    `;
    newDefault= document.querySelector("#newDefault");
    poster= document.querySelector("#posterImage");
    songAudio= document.querySelector("#audioSong");
    songName= document.querySelector("#songName");
    artistName=document.querySelector("#artistName");
    addedSongName= document.querySelector("#addedSongName");
    addedArtistName= document.querySelector("#addedArtistName");
    songAudio.addEventListener("change", function (event) {
      const files= event.target.files[0];
        if(files){
            url= URL.createObjectURL(files);
         }
    })
}

function addedSongs(params) {
    if(songsMenuDiv.classList.contains("d1"))
        {
            songsMenuDiv.classList.remove("d1");
        }
    else if(songsMenuDiv.classList.contains("d2"))
        {
            songsMenuDiv.classList.remove("d2");
        }
    songsMenuDiv.innerHTML="";
    database.ref('user/').once('value', function(snapshot) {
        data = snapshot.val();
        const storage= Object.keys(data);
           if (data) {
            console.log("Dsfsffs");
            for (let index = 0; index < storage.length; index++) 
            {
                let newAddedSong= document.createElement("div");
                let newImage= document.createElement("img");
                let newH1= document.createElement("h1");
                let newP= document.createElement("p");
                let newMusic= document.createElement("audio");

                songsMenuDiv.appendChild(newAddedSong);
                newAddedSong.className= "song";
                newAddedSong.appendChild(newImage);
                newAddedSong.appendChild(newH1);
                newAddedSong.appendChild(newP);
                const pop= data[storage[index]].poster;
                newImage.src= pop;
                newImage.id= "image"
                newMusic.id= "song";
                newMusic.src= data[storage[index]].audio;
                newH1.innerText= data[storage[index]].name;
                newP.innerText= data[storage[index]].artist;
                p=0;
                newAddedSong.addEventListener('click', PicChanger(Event))
            }
        
           }
       });
        
    
}