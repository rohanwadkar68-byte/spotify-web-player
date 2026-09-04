// Clean, Authentic Spotify Music Library (No hardcoded personal picks, neutral curation)

export const DEFAULT_ALBUM_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23282828'/%3E%3Ccircle cx='150' cy='150' r='90' fill='%23181818' stroke='%23383838' stroke-width='4'/%3E%3Ccircle cx='150' cy='150' r='35' fill='%23282828'/%3E%3Ccircle cx='150' cy='150' r='10' fill='%231ed760'/%3E%3Cpath d='M140 120v35a12 12 0 1 1-6-10.4V120h22v26a12 12 0 1 1-6-10.4V120h-10z' fill='%23ffffff' opacity='0.7'/%3E%3C/svg%3E"

export const CURATED_SONGS = [
  {
    id: 'kesariya',
    title: 'Kesariya',
    artist: 'Pritam, Arijit Singh',
    album: 'Brahmastra',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg',
    url: 'https://aac.saavncdn.com/871/c2febd353f3a076a406fa37510f31f9f_320.mp4',
    duration: '4:28',
    lyrics: `Kesariya tera ishq hai piya
Rang jaaun jo main haath lagaun
Din beete saara teri fikr mein
Rain saari teri khair manaun

Patjhad ke mausam mein bhi
Rangi chanaaron jaisi
Jhanke sannaaton mein tu
Veena ke taaron jaisi

Sadiyon se bhi lambi yeh
Ratiyan hongi chudailon jaisi
Teri zulfon ki chhaon mein
Bitein shaamein bahaaron jaisi

Kesariya tera ishq hai piya
Rang jaaun jo main haath lagaun!`
  },
  {
    id: 'tu_hai_kahan',
    title: 'Tu Hai Kahan',
    artist: 'Swapnil Choudhary',
    album: 'Tu Hai Kahan',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/859/Tu-hai-kahan-Hindi-2023-20231229111509-500x500.jpg',
    url: 'https://aac.saavncdn.com/859/5932b8f911ef56d1bc62b5ef42580e9d_320.mp4',
    duration: '3:45',
    lyrics: `Aise kaise ho gaya
Ki tu mujhse door ho gaya
Maine maangi thi dua
Tu hi mera jahan ho gaya

Tu hai kahan, khwaabon ke darmiyan
Main dhoondhta firoon tera nishaan
Tere bina adhoori har subah
Tu laut aa, na kar aur imtihaan.`
  },
  {
    id: 'apna_bana_le',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh, Sachin-Jigar',
    album: 'Bhediya',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/238/Romantic-Classics-Hits-Hindi-2026-20260529163838-500x500.jpg',
    url: 'https://aac.saavncdn.com/238/5583fbab6328b12f467f01ee335e496d_320.mp4',
    duration: '4:21',
    lyrics: `Tu mera koi na hoke bhi kuch laage
Tu mera koi na hoke bhi kuch laage

Kiya re jo bhi toone
Kaise kiya re jiya ko mere
Baandh aise liya re

Apna bana le piya, apna bana le piya
Dil ke nagar mein shehar tu basa le piya!`
  },
  {
    id: 'taylor_lover',
    title: 'Lover',
    artist: 'Taylor Swift',
    album: 'Lover',
    genre: 'Pop',
    theme: 'pop',
    image: 'https://c.saavncdn.com/228/Lover-English-2019-20250731010741-500x500.jpg',
    url: 'https://aac.saavncdn.com/228/a1a7354ee4c329f97c82cfd2b40c9cdc_320.mp4',
    duration: '3:41',
    lyrics: `We could leave the Christmas lights up 'til January
And this is our place, we make the rules
And there's a dazzling haze, a mysterious way about you, dear
Have I known you 20 seconds or 20 years?

Can I go where you go?
Can we always be this close forever and ever?
And ah, take me out, and take me home
You're my, my, my, my... lover!

Ladies and gentlemen, will you please stand?
With every guitar string scar on my hand
I take this magnetic force of a man to be my lover.`
  },
  {
    id: 'husn',
    title: 'Husn',
    artist: 'Anuv Jain',
    album: 'Husn',
    genre: 'Indie',
    theme: 'indie',
    image: 'https://c.saavncdn.com/436/Husn-Hindi-2023-20231129054140-500x500.jpg',
    url: 'https://aac.saavncdn.com/436/13795b7aa2e87393366162b9e6a6fe88_320.mp4',
    duration: '3:37',
    lyrics: `Dekho dekho kaisi baatein yahan ki
Hai saath par hai saath na bhi
Kya itni aasaan hai yeh judai
Ki khwabon mein bhi ab tu na aayi

Kyun yeh raat itni tanha hai
Kyun yeh dil bas tujhko doondhta hai
Husn tera hai roshni jaisa
Andheron mein bhi jo chamakta hai.`
  },
  {
    id: 'pehla_nasha',
    title: 'Pehla Nasha',
    artist: 'Udit Narayan, Sadhana Sargam',
    album: 'Jo Jeeta Wohi Sikandar',
    genre: 'Classic Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/852/Jo-Jeeta-Wohi-Sikandar-Hindi-1992-500x500.jpg',
    url: 'https://aac.saavncdn.com/852/9d335ee08b26f171a3d65e11f8819d52_sar_320.mp4',
    duration: '4:53',
    lyrics: `Pehla nasha, pehla khumaar
Naya pyaar hai, naya intezaar
Kar loon main kya apna haal
Aye dil-e-bekaraar
Mere dil-e-bekaraar, tu hi bata!

Udta hi firoon in hawaaon mein kahin
Ya main jhool jaaun in ghataon mein kahin
Ek kar doon aasmaan aur zameen
Kaho yaaron kya karoon, kya nahin!`
  },
  {
    id: 'shayad',
    title: 'Shayad',
    artist: 'Pritam, Arijit Singh',
    album: 'Love Aaj Kal',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/862/Love-Aaj-Kal-Hindi-2020-20200214140423-500x500.jpg',
    url: 'https://aac.saavncdn.com/862/e277c1b441b562640c6b264aa3335a83_320.mp4',
    duration: '4:07',
    lyrics: `Shayad kabhi na keh sakoon main tumko
Kahe bina samajh lo tum shayad
Shayad mere khayal mein tum ek din
Milo mujhe kahin pe ghum shayad

Jo tum na ho, rahenge hum nahin
Jo tum na ho, sakenge hum nahin
Na chahiye kuch tumse zyaada, tumse kam nahin!`
  },
  {
    id: 'raataan_lambiyan',
    title: 'Raataan Lambiyan',
    artist: 'Tanishk Bagchi, Jubin Nautiyal, Asees Kaur',
    album: 'Shershaah',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack--Hindi-2021-20210815181610-500x500.jpg',
    url: 'https://aac.saavncdn.com/238/35726d4394604604e961bf5b846870d0_320.mp4',
    duration: '3:50',
    lyrics: `Teri meri gallan ho gayi mashhoor
Kar na kabhi tu mujhe nazron se door
Kithe chali ae tu dhoop ke kinare
Tere bina dil lagda nahi ve

Kaate kate na re raataan lambiyan lambiyan
Re saware saware sang kaatiyan sang kaatiyan!`
  },
  {
    id: 'until_i_found_you',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    album: 'Until I Found You',
    genre: 'Pop / Retro',
    theme: 'pop',
    image: 'https://c.saavncdn.com/648/Until-I-Found-You-English-2022-20240426130801-500x500.jpg',
    url: 'https://aac.saavncdn.com/648/b4f0c2422d605de887bb72f684ddaa8e_320.mp4',
    duration: '2:58',
    lyrics: `Georgia, wrap me up in all your...
I want ya in my arms
Oh, let me hold ya
I'll never let you go again, like I did
Oh, I used to say

"I would never fall in love until I found her"
I said, "I would never fall unless it's you I fall into"
I was lost within the darkness, but then I found her
I found you.`
  },
  {
    id: 'baarishein',
    title: 'Baarishein',
    artist: 'Anuv Jain',
    album: 'Baarishein',
    genre: 'Indie',
    theme: 'indie',
    image: 'https://c.saavncdn.com/324/Barish-VIbes-Hindi-2026-20260716230015-500x500.jpg',
    url: 'https://aac.saavncdn.com/324/4b7744968a4148bc89669257ef2a7f41_320.mp4',
    duration: '3:27',
    lyrics: `Hawaaon mein bahenge
Ghataon mein rahenge
Tu barkha ban ke aana
Hum baarishein banenge

Tu muskuraaye to
Ruk jaaye yeh samaa
Tere bina kya hai
Yeh saara aasmaan.`
  },
  {
    id: 'study_lofi',
    title: 'Study Lofi Beats',
    artist: 'Lofi Chill Vibes',
    album: 'Music To Sleep Chill To',
    genre: 'Lo-Fi',
    theme: 'lofi',
    badge: '☕ Relax Lo-Fi',
    image: 'https://c.saavncdn.com/054/Music-To-Put-You-In-A-Better-Mood-Lofi-Hip-Hop-Beats-to-Sleep-Chill-To-Unknown-2023-20250508183531-500x500.jpg',
    url: 'https://aac.saavncdn.com/054/d0421389e10fbca2fcd2a4f47f9e7038_320.mp4',
    duration: '2:50',
    lyrics: `(Soft gentle piano chords & lo-fi vinyl crackle...)
Relaxing lo-fi study beats to unwind and chill.
Search any song to play full music tracks.`
  },
  {
    id: 'sajni',
    title: 'Sajni',
    artist: 'Arijit Singh, Ram Sampath',
    album: 'Laapataa Ladies',
    genre: 'Bollywood',
    theme: 'reels_viral',
    badge: '🔥 Reels Trending',
    image: 'https://c.saavncdn.com/252/Laapataa-Ladies-Hindi-2024-20240213155601-500x500.jpg',
    url: 'https://aac.saavncdn.com/252/f53c1a90a2f35d67490badb846d8c849_320.mp4',
    duration: '2:50',
    lyrics: `O sajni re
Kaise kate din raat
Kaise ho barsaat
Tere bina, tere bina...

O sajni re
Naino se behta neer
Jaise koi teer
Tere bina, tere bina!`
  },
  {
    id: 'choo_lo',
    title: 'Choo Lo',
    artist: 'The Local Train',
    album: 'Aalas Ka Pedh',
    genre: 'Indie Rock',
    theme: 'sad',
    badge: '🌙 2 AM Sad Reel',
    image: 'https://c.saavncdn.com/111/Aalas-Ka-Pedh-Hindi-2015-500x500.jpg',
    url: 'https://aac.saavncdn.com/111/09c5dba8ec03665a9a679e19338917a6_320.mp4',
    duration: '3:53',
    lyrics: `Khada hoon aaj bhi wahin
Ki tera intezaar hai
Choo lo jo mujhe tum kabhi
Kho na jaaun main raat din

Nazron mein tum ho base
Khwabon mein tum hi to ho
Jaane do baatein abhi
Ruk jao yaara yahin!`
  },
  {
    id: 'kahani_suno',
    title: 'Kahani Suno 2.0',
    artist: 'Kaifi Khalil',
    album: 'Kahani Suno 2.0',
    genre: 'Soul / Sad',
    theme: 'sad',
    badge: '💔 Viral Sad Reel',
    image: 'https://c.saavncdn.com/371/Kahani-Suno-2-0-Slowed-and-Reverbed-Hindi-2023-20230222071946-500x500.jpg',
    url: 'https://aac.saavncdn.com/371/d955e6c5bc587ea477a3e83dc361612d_320.mp4',
    duration: '3:15',
    lyrics: `Kahani suno, zubani suno
Mujhe pyar hua tha, iqrar hua tha
Kahani suno, zubani suno
Mujhe pyar hua tha, iqrar hua tha

Deewana hua, mastana hua
Tere ishq mein aisa ghayal hua
Kahin chain na aaye, nind na aaye
Yeh dil bas tera naam pukare!`
  },
  {
    id: 'o_maahi',
    title: 'O Maahi',
    artist: 'Pritam, Arijit Singh',
    album: 'Dunki',
    genre: 'Romantic',
    theme: 'reels_viral',
    badge: '🔥 Trending on Insta',
    image: 'https://c.saavncdn.com/139/Dunki-Drop-5-O-Maahi-Hindi-2023-20231211171015-500x500.jpg',
    url: 'https://aac.saavncdn.com/139/61036495c7ba45adf72a856b60f054fd_320.mp4',
    duration: '3:53',
    lyrics: `O maahi o maahi, o maahi o maahi
Tere ishq mein sab kho baitha
O maahi o maahi, o maahi o maahi
Tere sang hi ab jeena marna

Saanso ki dor chhoote to chhoote
Tera haath na chhootne paaye
Is dil ki bas itni khwahish
Tu sada muskaaye!`
  },
  {
    id: 'pehle_bhi_main',
    title: 'Pehle Bhi Main',
    artist: 'Vishal Mishra, Raj Shekhar',
    album: 'Animal',
    genre: 'Soul / Romantic',
    theme: 'reels_viral',
    badge: '🎬 Reels Hit',
    image: 'https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191427-500x500.jpg',
    url: 'https://aac.saavncdn.com/092/81b52beea90f186f27cf5c5eead972c8_320.mp4',
    duration: '4:10',
    lyrics: `Pehle bhi main tumse mila hoon
Pehli dafaa hi milke laga
Tune chhua zakhmon ko mere
Marham sa tha mehsoos hua

Kyun ab mujhe dar nahi lagta
Kyun har ghadi bas tu dikhta
Tere bina ab chal na sakunga
Rasta tu hi manzil tu hi!`
  },
  {
    id: 'faasle',
    title: 'Faasle',
    artist: 'Aditya Rikhari',
    album: 'Faasle',
    genre: 'Indie Sad',
    theme: 'sad',
    badge: '🌙 2 AM Sad Reel',
    image: 'https://c.saavncdn.com/832/Faasle-Hindi-2022-20220624053140-500x500.jpg',
    url: 'https://aac.saavncdn.com/832/7e9fe5a21e42c262d4e8c17b5a19808d_320.mp4',
    duration: '3:04',
    lyrics: `Faasle the darmiyaan
Phir bhi paas the hum yahan
Khamoshiyan kehti rahin
Jo lab na keh paaye kahan

Tu door hai par lagta nahi
Yeh dard kabhi thamta nahi
Faasle hain yeh kaisa imtihaan!`
  }
]

export const SPOTIFY_PLAYLISTS = [
  {
    id: 'insta_viral_reels',
    title: '🔥 Instagram Reels Hits',
    description: 'Trending tracks dominating your Instagram explore feed right now.',
    cover: 'https://c.saavncdn.com/252/Laapataa-Ladies-Hindi-2024-20240213155601-500x500.jpg',
    songIds: ['sajni', 'o_maahi', 'pehle_bhi_main', 'kesariya', 'apna_bana_le']
  },
  {
    id: 'insta_sad_reels',
    title: '🌙 2 AM Broken Heart Reels',
    description: 'Deep emotional ballads and melancholic indie masterpieces for late nights.',
    cover: 'https://c.saavncdn.com/111/Aalas-Ka-Pedh-Hindi-2015-500x500.jpg',
    songIds: ['choo_lo', 'husn', 'kahani_suno', 'tu_hai_kahan', 'faasle', 'baarishein']
  },
  {
    id: 'top_hits',
    title: "Today's Top Hits",
    description: 'The biggest and most popular tracks right now.',
    cover: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg',
    songIds: ['sajni', 'kesariya', 'o_maahi', 'pehle_bhi_main', 'tu_hai_kahan']
  },
  {
    id: 'romantic',
    title: 'Romantic Melodies',
    description: 'Timeless romantic hits and heartfelt vocals.',
    cover: 'https://c.saavncdn.com/238/Romantic-Classics-Hits-Hindi-2026-20260529163838-500x500.jpg',
    songIds: ['kesariya', 'apna_bana_le', 'sajni', 'o_maahi', 'shayad', 'raataan_lambiyan', 'pehla_nasha']
  },
  {
    id: 'acoustic_indie',
    title: 'Acoustic & Indie',
    description: 'Stripped-down acoustic strings and raw emotion.',
    cover: 'https://c.saavncdn.com/436/Husn-Hindi-2023-20231129054140-500x500.jpg',
    songIds: ['husn', 'choo_lo', 'faasle', 'baarishein', 'tu_hai_kahan']
  },
  {
    id: 'chill_lofi',
    title: 'Lo-Fi & Chill',
    description: 'Peaceful beats for relaxing and unwinding.',
    cover: 'https://c.saavncdn.com/054/Music-To-Put-You-In-A-Better-Mood-Lofi-Hip-Hop-Beats-to-Sleep-Chill-To-Unknown-2023-20250508183531-500x500.jpg',
    songIds: ['study_lofi', 'until_i_found_you', 'baarishein']
  }
]


export const SEARCH_CHIPS = [
  'Arijit Singh',
  'Taylor Swift',
  'Anuv Jain',
  'Pritam',
  'Atif Aslam',
  'Kesariya',
  'Tu Hai Kahan',
  'Shershaah',
  'AP Dhillon',
  'Until I Found You'
]
