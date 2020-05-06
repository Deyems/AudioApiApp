class AudioPlayer{
  constructor(){
    this.playBtn = document.querySelector('#play');
    this.prevBtn = document.querySelector('#prev');
    this.nextBtn = document.querySelector('#next');
    this.title = document.querySelector('#title');
    this.cover = document.querySelector('#cover');

    this.audio = document.querySelector('#audio');
    this.progress = document.querySelector('#progress');
    this.progressContainer = document.querySelector('#progress-container');
    this.musicContainer = document.querySelector('.music-container');

    this.songs = ['hey','summer','ukulele'];
  }

  init(){
    //LISTEN FOR EVENTS HERE
    this.loadSong(this.songs[this.songIndex]);
    this.playBtn.addEventListener('click', this.playOrPause);
    this.prevBtn.addEventListener('click', this.playPrev);
    this.nextBtn.addEventListener('click', this.playNext);
    this.audio.addEventListener('timeupdate', this.updateProgress);
    this.progressContainer.addEventListener('click', this.setProgress);
    this.audio.addEventListener('ended', this.playNext);

  }

  songIndex = 0;

  loadSong(song){
    this.title.innerText = song;
    this.audio.src = `music/${song}.mp3`;
    this.cover.src = `images/${song}.jpg`;
  }

  playPrev = (e) => {
    this.songIndex--;
    if(this.songIndex < 0){
      this.songIndex = this.songs.length - 1;
    }
    this.loadSong(this.songs[this.songIndex]);
    this.playCurrentSong();
  }

  playNext = (e) => {
    this.songIndex++;
    if(this.songIndex > this.songs.length-1){
      this.songIndex = 0;
    }
    this.loadSong(this.songs[this.songIndex]);
    this.playCurrentSong();
  }

  //playorPause SOng
  playOrPause = (e) => {
    let isPlaying = this.musicContainer.classList.contains('play');
    if(isPlaying){
      this.pauseCurrentSong();
    }else{
      this.playCurrentSong();
    }
  }

  //PLAY SONG
  playCurrentSong = () => {
    this.musicContainer.classList.add('play');
    this.playBtn.querySelector('i.fas').classList.remove('fa-play');
    this.playBtn.querySelector('i.fas').classList.add('fa-pause');
    this.audio.play();
  }

  //PAUSE SONG
  pauseCurrentSong = () => {
    this.musicContainer.classList.remove('play');
    this.playBtn.querySelector('i.fas').classList.remove('fa-pause');
    this.playBtn.querySelector('i.fas').classList.add('fa-play');
    this.audio.pause();
  }

  updateProgress = (e) => {
    let {duration, currentTime} = e.srcElement;
    let progressPercent = (currentTime/duration) * 100;
    this.progress.style.width = `${progressPercent}%`;
  }

  setProgress = (e) => {
    const width = e.target.clientWidth;
    const clickedPos = e.offsetX;
    let duration = this.audio.duration;
    this.audio.currentTime = (clickedPos/width)*duration;
  }

}

let player = new AudioPlayer();
player.init();
