let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/blade.jpg',
        name : 'Blade | Vingança',
        artist : 'Anirap e AnnyTHN',
        music : 'music/♪ Blade (Honkai_ Star Rail) _ Vingança _ AniRap e @AnnyTHN (320 kbps).mp3'
    },
    {
        img : 'images/minoru.jpg',
        name : 'O Novo Kira',
        artist : 'Anirap',
        music : 'music/♪ Minoru Tanaka (Death Note) _ O Novo Kira _ AniRap.mp3'
    },
    {
        img : 'images/partidaSeculo.jpg',
        name : 'A Partida do Século',
        artist : 'Theuz',
        music : 'music/A Partida do Século - Blue Lock Eleven X Sub-20 Japão (Blue Lock) _ Theuz-(128kbps).ogg'
    },
    {
        img : 'images/barbaNegra.jpg',
        name : 'A Própria Escuridão',
        artist : 'Enygma',
        music :  'music/A Própria Escuridão _ Barba Negra (One Piece) _ Enygma 81 [REMAKE]-(128kbps).ogg'
    },
    {
        img : 'images/mahito.jpg',
        name : 'Alma | Mahito',
        artist : 'Enygma',
        music :  'music/Alma _ Mahito (Jujutsu Kaisen) _ Enygma (128 kbps).mp3'
    },
    {
        img : '',
        name : 'Tesla vs Beelzebub',
        artist : 'Kaito ft. Duelista',
        music :  'music/Avanço _ Tesla vs Beelzebub (Shuumatsu no Valkyrie) _ Kaito ft. @Duelista (320 kbps).mp3'
    },
    {
        img : 'images/ayanokojiLex.jpg',
        name : 'TIPO MANIPULADOR',
        artist : 'LexClash',
        music :  'music/Ayanokoji ♟ (Youjitsu) _ TIPO MANIPULADOR _ LexClash-(128kbps).ogg'
    },
    {
        img : 'images/bakiYujiro.jpg',
        name : 'Assuntos de Família',
        artist : 'Kaito',
        music :  'music/Baki vs Yujiro (Baki The Grappler) _ Assuntos de Família _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/barou.jpg',
        name : 'Barou | Rei Egoísta',
        artist : 'M4rkim',
        music :  'music/Barou (Blue Lock) - Rei Egoísta _ M4rkim (320 kbps).mp3'
    },
    {
        img : 'images/todou.jpg',
        name : 'Bater de Palmas',
        artist : 'Kaito',
        music :  'music/Bater de Palmas _ Aoi Todo (Jujutsu Kaisen) _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/beel.jpg',
        name : 'Moscas',
        artist : 'M4rkim',
        music :  'music/Beelzebub (Shuumatsu no Valkyrie) - Moscas _ M4rkim (320 kbps).mp3'
    },
    {
        img : 'images/ben.jpg',
        name : 'Omnitrix',
        artist : 'M4rkim',
        music :  'music/Ben 10 (Ben 10) - Omnitrix _ M4rkim (320 kbps).mp3'
    },
    {
        img : 'images/urahara.jpg',
        name : 'Benehime',
        artist : 'Kaito',
        music :  'music/Benehime _ Urahara Kisuke (Bleach) _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/buda.jpg',
        name : 'Iluminação',
        artist : 'M4rkim',
        music :  'music/Buda (Shuumatsu no Valkyrie) - Iluminação _ M4rkim (320 kbps).mp3'
    },
    {
        img : 'images/pika',
        name : 'Caçadores de Demônios',
        artist : 'Sting',
        music :  'music/Caçadores de Demônios (Chainsaw Man) O Futuro é  _ Sting (320 kbps).mp3'
    },
    {
        img : 'images/baki.jpg',
        name : 'Campeão',
        artist : 'Kaito',
        music :  'music/Campeão _ Baki Hanma (Baki The Grappler) _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/ciencia.jpg',
        name : 'Ciência!!',
        artist : 'Enygma',
        music :  'music/Ciência!! _ Nikola Tesla (Shuumatsu no Valkyrie) _ Enygma (320 kbps).mp3'
    },
    {
        img : 'images/makima.jpg',
        name : 'CONTROLE',
        artist : 'AnnyTHN',
        music :  'music/CONTROLE _ Makima (Chainsaw Man) _ Anny [Prod.ZG]-(128kbps).ogg'
    },
    {
        img : 'images/denji.jpg',
        name : 'Demônio Motosserra',
        artist : 'M4rkim',
        music :  'music/Denji (Chainsaw Man) - Demônio Motosserra _ M4rkim (320 kbps).mp3'
    },
    {
        img : 'images/dan',
        name : 'Partindo o Mar',
        artist : 'Henrique Mendonça',
        music :  'music/Embebidor Lunae (Honkai_ Star Rail) - _Partindo o Mar_ _ Henrique Mendonça (320 kbps).mp3'
    },
    {
        img : 'images/lendas.jpg',
        name : 'As Lendas do Futebol',
        artist : 'Flash Beats',
        music :  'music/ESPECIAL 400K (Blue Lock) - As Lendas do Futebol _ Flash Beats (128 kbps).mp3'
    },
    {
        img : 'images/tojiGojo.jpg',
        name : 'Infinito',
        artist : 'Kaito',
        music :  'music/Fushiguro Toji vs Satoru Gojo (Jujutsu Kaisen) _ Infinito _ Kaito_ (320 kbps).mp3'
    },
    {
        img : 'images/alone.jpg',
        name : 'Hades | Alone',
        artist : 'Enygma',
        music :  'music/Hades _ Alone (Saint Seiya_ The Lost Canvas) _ Enygma (320 kbps).mp3'
    },
    {
        img : 'images/hatengu.jpg',
        name : 'Lua Superior Quatro',
        artist : 'M4rkim',
        music :  'music/Hantengu (Kimetsu no Yaiba) - Lua Superior Quatro _ M4rkim (128 kbps).mp3'
    },
    {
        img : 'images/wild.jpg',
        name : 'Wildfire',
        artist : 'Honkai',
        music :  'music/Honkai_ Star Rail Concert - Wildfire Song (128 kbps).mp3'
    },
    {
        img : 'images/impera.jpg',
        name : 'Imperador',
        artist : 'Kaito',
        music :  'music/Imperador _ Kaiser (Blue Lock) _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/itadori.jpg',
        name : 'Punhos Divergentes',
        artist : 'Enygma',
        music :  'music/Itadori Yuji (Jujutsu Kaisen) _ Punhos Divergentes _ Enygma 87-(128kbps).ogg'
    },
    {
        img : 'images/ishida.jpg',
        name : 'Fracos',
        artist : 'Ishida',
        music :  'music/Itoshi Sae Song (Blue Lock) _ FRACOS _ Ishida (320 kbps).mp3'
    },
    {
        img : 'images/kawaki.jpg',
        name : 'Karma',
        artist : 'M4rkim',
        music :  'music/Kawaki Uzumaki (Boruto) - Karma _ M4rkim (128 kbps).mp3'
    },
    {
        img : 'images/dio.jpg',
        name : 'Kono Dio Da!',
        artist : 'Enygma',
        music :  "music/Kono Dio Da! _ Dio Brando (JoJo's Bizarre Adventure) _ Enygma (320 kbps).mp3"
    },
    {
        img : 'images/kurapika.jpg',
        name : 'Minhas Correntes',
        artist : 'Enygma',
        music :  'music/Kurapika (Hunter x Hunter) _ Minhas Correntes _ Enygma 91-(128kbps).ogg'
    },
    {
        img : 'images/lampiao',
        name : 'Rei Do Cangaço',
        artist : 'M4rkim',
        music :  'music/Lampião (Lampião) - Rei Do Cangaço _ M4rkim (320 kbps).mp3'
    },
    {
        img : 'images/kid',
        name : 'Magnetização',
        artist : 'Kaito',
        music :  'music/Magnetização _ Eustass Kid (One Piece) _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/mal',
        name : 'MEU LADO MAL',
        artist : 'Enygma',
        music :  'music/MEU LADO MAL (Ayano & Akashi) _ Haruka e Enygma [Prod. Exetra Beatz]-(128kbps).ogg'
    },
    {
        img : '',
        name : 'Monarquistas',
        artist : 'Tokyo Player',
        music :  'music/Monarquistas - Não Desobedeça (Sung jin Woo, Akashi, Viego)-(128kbps).ogg'
    },
    {
        img : 'images/hero',
        name : 'New Type of Hero',
        artist : '凸变英雄X》动画原声带',
        music :  'music/New Type of Hero (《凸变英雄X》动画原声带) (128 kbps).mp3'
    },
    {
        img : 'images/tesla',
        name : 'Luz Da Esperança',
        artist : 'M4rkim',
        music :  'music/Nikola Tesla (Shuumatsu no Valkyrie) - Luz Da Esperança _ M4rkim (128 kbps).mp3'
    },
    {
        img : 'images/erwin',
        name : 'Ofereçam seus Corações',
        artist : 'ORIONMC',
        music :  'music/Ofereçam seus Corações _ Erwin Smith ( Shingeki no Kyojin ) _ ORIONMC-(128kbps).ogg'
    },
    {
        img : 'images/pucci',
        name : 'Paraíso',
        artist : 'Neko',
        music :  "music/Paraíso _ Enrico Pucci (Jojo's Bizarre Adventure) _ Neko (128 kbps).mp3"
    },
    {
        img : '',
        name : 'Poder de um Deus',
        artist : 'Kaito',
        music :  'music/Poder de um Deus _ Accelerator (Toaru Kagaku no Accelerator) _ Kaito-(128kbps).ogg'
    },
    {
        img : 'images/china',
        name : 'China',
        artist : 'M4rkim',
        music :  'music/Qin Shi Huang (Shuumatsu no Valkyrie) - China _ M4rkim (320 kbps).mp3'
    },
    {
        img : 'images/yuji',
        name : 'Quebrado por Dentro',
        artist : 'Shiny',
        music :  'music/Quebrado por Dentro _ Itadori Yuji pt __ (Jujutsu Kaisen) _ Shiny (128 kbps).mp3'
    },
    {
        img : 'images/mica',
        name : 'Ayanokoji',
        artist : 'Micael',
        music :  'music/Rap do Ayanokoji-(128kbps).ogg'
    },
    {
        img : 'images/rob',
        name : 'Rokushiki',
        artist : 'Kaito',
        music :  'music/Rokushiki _ Rob Lucci (One Piece) _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/gojo',
        name : 'Mundo Infinito',
        artist : 'Enygma',
        music :  'music/Satoru Gojo (Jujutsu Kaisen) _ Mundo Infinito _ Enygma 88-(128kbps).ogg'
    },
    {
        img : 'images/one',
        name : 'The One',
        artist : 'Kaito',
        music :  'music/The One _ Escanor (Nanatsu no Taizai) _ Kaito (320 kbps).mp3'
    },
    {
        img : 'images/anne',
        name : 'Uma Guerreira',
        artist : 'Mands',
        music :  'music/Uma Guerreira _ Annie Leonhart (Shingeki no Kyojin) Mands (@Prod.Khellvyn)-(128kbps).ogg'
    },
    {
        img : 'images/valquiria',
        name : 'Humanos vs Deuses',
        artist : 'WLO',
        music :  'music/WLO - Humanos vs Deuses pt 2 [ Shuumatsu no Valkyrie ]-(128kbps).ogg'
    },
    {
        img : 'images/dya',
        name : 'Só Pode Existir Um',
        artist : 'DYA ft. Kaito',
        music :  'music/Zaraki Vs Unohana (Bleach) - Só Pode Existir Um _ D.Y.A ft. @KaitoOFC (320 kbps).mp3'
    },
    {
        img : 'music/novos/oreki.jpg',
        name : 'Conto Lírico',
        artist : 'Micael',
        music : 'music/novos/Conto Lírico _ Oreki (Hyouka) _ Micael (320 kbps).mp3'
    },
    {
        img : '',
        name : 'Graus Negativos',
        artist : 'Micael',
        music : 'music/novos/Graus Negativos _ Esdeath (Akame Ga Kill) _ Micael [REMAKE] (320 kbps).mp3'
    },
    {
        img : 'music/novos/ikki.jpg',
        name : 'Minha Promessa',
        artist : 'Micael',
        music : 'music/novos/Minha Promessa _ Ikki Kurogane (Rakudai Kishi no Cavalry) _ Micael (320 kbps).mp3'
    },
    {
        img : 'music/novos/revolucao.jpg',
        name : 'Pela Revolução',
        artist : 'Micael',
        music : 'music/novos/Pela Revolução _ Night Raid (Akame Ga Kill) _ Micael (320 kbps).mp3'
    },
    {
        img: 'music/novos/lelouch.jpg',
        name : 'Rebelião',
        artist : 'Enygma',
        music : 'music/novos/Rap do Lelouch Pt. ll (Code Geass) _ Rebelião _ Enygma 90 (320 kbps).mp3'
    },
    {
        img: 'music/novos/comeco.jpg',
        name : 'Começo Dps fim',
        artist : 'Kaito',
        music : 'music/novos/Começo Depois do Fim _ Arthur Leywin (The Beginning After the End) _ Kaito (320 kbps).mp3'
    },
    {
        img: 'music/novos/levi.jpg',
        name : 'Capitão',
        artist : 'M4rkim',
        music : 'music/novos/Levi (Shingeki no Kyojin) - Capitão _ M4rkim (320 kbps).mp3'
    },
    {
        img: 'music/novos/hades.jpg',
        name : 'Submundo',
        artist : 'M4rkim',
        music : 'music/novos/Hades (Shuumatsu no Valkyrie) - Submundo _ M4rkim (320 kbps).mp3'
    },
    {
        img: 'music/novos/consumir.jpg',
        name : 'Consumir',
        artist : 'Kaito',
        music : 'music/novos/Consumir _ Suguru Geto (Jujutsu Kaisen) _ Kaito (320 kbps).mp3'
    },
    {
        img: 'music/novos/imperador.jpg',
        name : 'O Maior Imperador',
        artist : 'Kaito',
        music : 'music/novos/O Maior Imperador _ Qin Shi Huang VS Hades (Shuumatsu no Valkyrie) _ Kaito ft. @M4rkim & @BasaraMusic (320 kbps).mp3'
    },
    {
        img: 'music/novos/quadra.jpg',
        name : 'Quadra Elementar',
        artist : 'Kaito',
        music : 'music/novos/Quadra Elementar _ Arthur Leywin Pt. ll (The Beginning After the End) _ Kaito (320 kbps).mp3'
    },
    {
        img: 'music/novos/feiticeiros.jpg',
        name : 'Feiticeiros',
        artist : 'Sting',
        music : 'music/novos/Feiticeiros Jujutsu (Jujutsu Kaisen) _ Sting (320 kbps).mp3'
    },
    {
        img:'music/novos/funny.jpg',
        name:'INTOCÁVEL',
        artist:'Chrono',
        music:"music/novos/Funny Valentine (Jojo's Bizarres Adventure) - INTOCÁVEL _ Chrono (320 kbps).mp3"
    },
    {
        img:'music/novos/santuario.jpg',
        name:'Santuário Malevolente',
        artist:'Kaito',
        music:'music/novos/Santuário Malevolente _ Sukuna (Jujutsu Kaisen) _ Kaito (320 kbps).mp3'
    },
    {
        img:'music/novos/shibuya.jpg',
        name:'Shibuya',
        artist:'Anirap',
        music:'music/novos/♪ Shibuya _ Jujutsu Kaisen _ ESPECIAL URT (320 kbps).mp3'
    },
    {
        img:'music/novos/caos.jpg',
        name:'CAOS',
        artist:'Chrono ft Mystery e AnnyTHN',
        music:'music/novos/Caçadores de Stellarons (Honkai_ Star Rail) - CAOS _ Chrono (320 kbps).mp3'
    },
    {
        img:'music/novos/expansao.jpg',
        name:'Expansão de Domínio',
        artist:'Yondax',
        music:'music/novos/Gojo VS. Sukuna_ Expansão de Domínio [Prod. Kayro] (320 kbps).mp3'
    },
    {
        img:'music/novos/kafka.jpg',
        name:'Fios Do Destino',
        artist:'AnnyTHN',
        music:'music/novos/Anny - Fios Do Destino [Prod.ZG] (320 kbps).mp3'
    },
    {
        img: 'music/novos/escuridao.jpg',
        name: 'Escuridão',
        artist: 'Kaito',
        music: 'music/novos/Escuridão _ Deku Dark (Boku no Hero) _ Kaito (320 kbps).mp3'
    },
    {
        img: 'music/novos/lord.jpg',
        name: 'Deus',
        artist: 'M4rkim',
        music: 'music/novos/Lord Drakkon (Power Rangers) - Deus _ M4rkim (320 kbps).mp3'
    },
    {
        img: 'music/novos/nagi.jpg',
        name: 'Gênio em Ascensão',
        artist: 'Theuz',
        music: 'music/novos/Seishiro Nagi (Blue Lock) -  Gênio em Ascensão _ Theuz (320 kbps).mp3'
    },
    {
        img: 'music/novos/puro.jpg',
        name: 'Puro Desespero',
        artist: 'DKZ',
        music: 'music/novos/Puro Desespero (Danganronpa) - DKZ (320 kbps).mp3'
    },
    {
        img: 'music/novos/perfeicao.jpg',
        name: 'Perfeição',
        artist: 'Kaito',
        music: 'music/novos/Perfeição _ Itoshi Rin (Blue Lock) _ Kaito (320 kbps).mp3'
    },
    {
        img: 'music/novos/kaito.jpg',
        name: 'Original',
        artist: 'Kaito',
        music: 'music/novos/Original _ Muzan (Kimetsu no Yaiba) _ Kaito (320 kbps).mp3'
    },
    {
        img: 'music/novos/serLuz.jpg',
        name: 'Ser Luz',
        artist: 'AnnyTHN',
        music: 'music/novos/Anny - Ser Luz [Prod.Blxck] (320 kbps).mp3'
    },
    {
        img: 'music/novos/gojoAnny.jpg',
        name: 'Divergentes',
        artist: 'AnnyTHN',
        music: 'music/novos/Anny - Divergentes ft.@TakaB [Prod.ZG] (320 kbps).mp3'
    },
    {
        img: 'music/novos/gilgamesh.jpg',
        name: 'Portões Da Babilônia',
        artist: 'M4rkim',
        music: 'music/novos/Gilgamesh (Fate) - Portões Da Babilônia _ M4rkim (320 kbps).mp3'
    },
    {
        img: 'music/novos/kaito_gojovsSukuna.jpg',
        name: 'Expansão de Domínio',
        artist: 'Kaito ft. M4rkim',
        music: 'music/novos/Gojo vs Sukuna (Jujutsu Kaisen) _ Expansão de Domínio _ Kaito ft @M4rkim & @henriquemendonca (320 kbps).mp3'
    },
    {
        img: 'music/novos/gojovssukunaWLO.jpg',
        name: 'Expansão de Domínio',
        artist: 'WLO',
        music: 'music/novos/WLO - Expansão de Domínio ( Sukuna vs Gojo - Jujutsu Kaisen ) (320 kbps).mp3'
    },
    {
        img: 'music/novos/gojovssukunaBasara.jpg',
        name: 'Santuário Infinito',
        artist: 'Basara ft. Daarui',
        music: 'music/novos/Sukuna VS. Satoru Gojo _ Santuário Infinito (Jujutsu Kaisen) _ Basara ft. @DaaruiOficial (320 kbps).mp3'
    },
    {
        img: 'music/novos/m4rkimSukuna.jpg',
        name: 'Rei Das Maldições',
        artist: 'M4rkim',
        music: 'music/novos/Sukuna (Jujutsu Kaisen) - Rei Das Maldições _ M4rkim (320 kbps).mp3'
    },
    {
        img: 'music/novos/gojoVSsukuna2.jpg',
        name: 'Até a Morte',
        artist: 'Yondax Ft Duelista',
        music: 'music/novos/Gojo VS. Sukuna Pt. 2_ Até a Morte.mp3'
    },
    {
        img: 'music/novos/duelistaSukuna.jpg',
        name: 'Sukuna',
        artist: 'Duelista',
        music: 'music/novos/Sukuna (Jujutsu Kaisen) - O Mais Forte da História _ Duelista (320 kbps).mp3',
    },
    {
        img: 'music/novos/kaitoYutaHakari.jpg',
        name: 'Potencial Infinito',
        artist: 'Kaito ft. EoDan',
        music: 'music/novos/Hakari & Yuta (Jujutsu Kaisen) _ Potencial Infinito _ Kaito ft @EoDanOficial (320 kbps).mp3',
    },
    {
        img: 'music/novos/gojoDaarui.jpg',
        name: 'O Infinito',
        artist: 'Daarui',
        music: 'music/novos/O Infinito (Satoru Gojo) _ Daarui (320 kbps).mp3',
    }
    
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
