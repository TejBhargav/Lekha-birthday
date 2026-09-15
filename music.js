const songs=[
  {
    title:'Favorite Song 01',
    artist:'A song that reminds me of you',
    src:'assets/music/04 - Anukoledenadu - SenSongsMp3.co.mp3'
  },
  {
    title:'Favorite Song 02',
    artist:'One of our little songs',
    src:'assets\\music\\Neekem Kaavaalo Cheppu - SenSongsmp3.Co.mp3'
  },
  {
    title:'A Song That Reminds Me of You',
    artist:'For Sree Lekha ♡',
    src:'assets/music/Gaaju Bomma.mp3'
  }
];

let currentSong=0;
let audio=new Audio();

const songList=$('#songList');
const playBtn=$('#musicPlay');
const prevBtn=$('#musicPrev');
const nextBtn=$('#musicNext');
const progress=document.querySelector('.music-progress');
const progressBar=$('#musicProgress');
const disc=document.querySelector('.music-disc');

function renderSongs(){
  songList.innerHTML=songs.map((song,index)=>`
    <div class="song-item ${index===currentSong?'active':''}" data-index="${index}">
      <span class="song-number">${String(index+1).padStart(2,'0')}</span>
      <div>
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
      <b>▶</b>
    </div>
  `).join('');

  document.querySelectorAll('.song-item').forEach(item=>{
    item.addEventListener('click',()=>{
      currentSong=Number(item.dataset.index);
      loadSong();
      audio.play();
      updatePlayButton();
    });
  });
}

function loadSong(){
  const song=songs[currentSong];

  audio.src=song.src;

  $('#currentSongTitle').textContent=song.title;
  $('#currentSongArtist').textContent=song.artist;

  renderSongs();
}

function updatePlayButton(){
  playBtn.textContent=audio.paused?'▶':'Ⅱ';
  disc.classList.toggle('playing',!audio.paused);
}

function formatTime(seconds){
  if(!Number.isFinite(seconds)) return '0:00';

  const minutes=Math.floor(seconds/60);
  const remaining=Math.floor(seconds%60);

  return `${minutes}:${String(remaining).padStart(2,'0')}`;
}

playBtn.addEventListener('click',()=>{
  if(audio.paused){
    audio.play();
  }else{
    audio.pause();
  }

  updatePlayButton();
});

prevBtn.addEventListener('click',()=>{
  currentSong=(currentSong-1+songs.length)%songs.length;
  loadSong();
  audio.play();
  updatePlayButton();
});

nextBtn.addEventListener('click',()=>{
  currentSong=(currentSong+1)%songs.length;
  loadSong();
  audio.play();
  updatePlayButton();
});

audio.addEventListener('timeupdate',()=>{
  const percent=audio.duration
    ?(audio.currentTime/audio.duration)*100
    :0;

  progressBar.style.width=`${percent}%`;

  $('#musicCurrentTime').textContent=formatTime(audio.currentTime);
  $('#musicDuration').textContent=formatTime(audio.duration);
});

progress.addEventListener('click',event=>{
  if(!audio.duration) return;

  const rect=progress.getBoundingClientRect();
  const percent=(event.clientX-rect.left)/rect.width;

  audio.currentTime=percent*audio.duration;
});

audio.addEventListener('ended',()=>{
  currentSong=(currentSong+1)%songs.length;
  loadSong();
  audio.play();
});

loadSong();