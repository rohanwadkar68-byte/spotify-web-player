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
    era: 'retro_90s',
    badge: '📻 90s Evergreen',
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
,
  {
    id: "my_life_goes_on",
    title: "Life Goes On",
    artist: "BTS",
    album: "BE",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/273/BE-Korean-2021-20220510145040-500x500.jpg",
    url: "https://aac.saavncdn.com/273/b5cd64cc353c8955903bdc5d91a684f9_320.mp4",
    duration: "3:27",
    lyrics: "Life Goes On by BTS"
  },
  {
    id: "my_taare",
    title: "Taare",
    artist: "Guru Randhawa",
    album: "Taare",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/518/Taare-Punjabi-2017-500x500.jpg",
    url: "https://aac.saavncdn.com/518/a7d29274f24ac7f4003bb76fbe8c8051_320.mp4",
    duration: "3:02",
    lyrics: "Taare by Guru Randhawa"
  },
  {
    id: "my_im_sorry_mom",
    title: "I'm Sorry Mom",
    artist: "Marino",
    album: "Im Sorry Mom",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/545/Im-Sorry-Mom-English-2026-20260609210759-500x500.jpg",
    url: "https://aac.saavncdn.com/545/19fcda6ed7eb797ff17091be3fea863f_320.mp4",
    duration: "1:47",
    lyrics: "Im Sorry Mom by Marino"
  },
  {
    id: "my_koodappirannor",
    title: "Koodappirannor",
    artist: "B.K. Harinarayanan",
    album: "Vaazha 2 (Original Motion Picture Soundtrack)",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/639/Vaazha-2-Original-Motion-Picture-Soundtrack-Malayalam-2026-20260403000537-500x500.jpg",
    url: "https://aac.saavncdn.com/639/d7a3149420e5df9719e15d71e81537df_320.mp4",
    duration: "4:04",
    lyrics: "Koodappirannor by B.K. Harinarayanan"
  },
  {
    id: "my_i_thought_i_saw_your_face_today",
    title: "I Thought I Saw Your Face Today",
    artist: "She & Him",
    album: "Volume One",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/106/Volume-One-English-2008-20250911190502-500x500.jpg",
    url: "https://aac.saavncdn.com/106/e1a39adaa8163c8ef1ff07accab4ad4c_320.mp4",
    duration: "2:50",
    lyrics: "I Thought I Saw Your Face Today by She & Him"
  },
  {
    id: "my_barsat",
    title: "Barsaat",
    artist: "Darshan Raval",
    album: "Barsaat Lagdi Ae",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/418/Barsaat-Lagdi-Ae-Hindi-2026-20260729022553-500x500.jpg",
    url: "https://aac.saavncdn.com/418/56fe79fcb0027343270df73d2341fd13_320.mp4",
    duration: "3:06",
    lyrics: "Barsaat Lagdi Ae by Darshan Raval"
  },
  {
    id: "my_banjara",
    title: "Banjara",
    artist: "Mithoon",
    album: "Ek Villain",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/151/Ek-Villain-Hindi-2014-500x500.jpg",
    url: "https://aac.saavncdn.com/151/d47f0f0edf55c1ec4ea5633b1ff1ba49_320.mp4",
    duration: "5:37",
    lyrics: "Banjaara by Mithoon"
  },
  {
    id: "my_ishq_se_faniyar_female",
    title: "Ishq Se Faniyar (Female)",
    artist: "Jyotica Tangri",
    album: "World Music Day 2026",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/157/World-Music-Day-2026-Hindi-2026-20260619182741-500x500.jpg",
    url: "https://aac.saavncdn.com/157/fe4be5ca8cf9affa9921c6472edbce9c_320.mp4",
    duration: "2:57",
    lyrics: "Ishq de Fanniyar - Female by Jyotica Tangri"
  },
  {
    id: "my_bolve",
    title: "Bolve",
    artist: "Madan Maddi & Sukshinder Shinda",
    album: "Moving & Grooving",
    genre: "Punjabi Bhangra",
    theme: "punjabi",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music/fc/9f/46/mzi.wkdfpphx.tif/600x600bb.jpg",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/88/34/7d/88347da9-c940-1b2a-1467-c5c05fd3c786/mzaf_11013022392691564059.plus.aac.p.m4a",
    duration: "5:12",
    lyrics: "Bolve by Madan Maddi & Sukshinder Shinda"
  },
  {
    id: "my_imposter_syndrome",
    title: "Imposter Syndrome",
    artist: "Sidney Gish",
    album: "No Dogs Allowed",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/702/No-Dogs-Allowed-English-2017-20260420063629-500x500.jpg",
    url: "https://aac.saavncdn.com/702/27d5b0db3e95fc09d2bb19ca84ab0402_320.mp4",
    duration: "4:54",
    lyrics: "Impostor Syndrome by Sidney Gish"
  },
  {
    id: "my_aarzu",
    title: "Aarzu (with Asim Azhar)",
    artist: "IshqWave",
    album: "Aarzu (Asim Azhar Edm Mix)",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/988/Aarzu-Asim-Azhar-Edm-Mix-Urdu-2026-20260611145427-500x500.jpg",
    url: "https://aac.saavncdn.com/988/4454b45c84b228684cbb86b7c4897b3c_320.mp4",
    duration: "4:30",
    lyrics: "Aarzu (Asim Azhar Edm Mix) by IshqWave"
  },
  {
    id: "my_jhoom_rnb",
    title: "Jhoom (R&B Mix)",
    artist: "Ali Zafar",
    album: "Jhoom - Ali Zafar",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/671/Jhoom-Ali-Zafar-Hindi-2011-20190329150037-500x500.jpg",
    url: "https://aac.saavncdn.com/671/658aa1d9d81d2a358dd7c17c65f12943_320.mp4",
    duration: "4:55",
    lyrics: "Jhoom R&B Mix by Ali Zafar"
  },
  {
    id: "my_ambarsariya",
    title: "Ambarsariya",
    artist: "Ram Sampath",
    album: "Fukrey",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/840/Fukrey-2013-500x500.jpg",
    url: "https://aac.saavncdn.com/840/550bd2d4868e769f7fae66f7489c94e7_320.mp4",
    duration: "4:09",
    lyrics: "Ambarsariya by Ram Sampath"
  },
  {
    id: "my_love_me_not",
    title: "Love Me Not",
    artist: "Ravyn Lenae",
    album: "Love Me Not / Love Is Blind",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/546/Love-Me-Not-Love-Is-Blind-English-2024-20240807224721-500x500.jpg",
    url: "https://aac.saavncdn.com/546/0ca89ac68d8279fab2efc9d893ec3ff3_320.mp4",
    duration: "3:33",
    lyrics: "Love Me Not by Ravyn Lenae"
  },
  {
    id: "my_mann_mera",
    title: "Mann Mera",
    artist: "Gajendra Verma",
    album: "Table No. 21",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/196/Table-No-21-Hindi-2025-20250930143941-500x500.jpg",
    url: "https://aac.saavncdn.com/196/d2c7bbfceb81b066e0f72e6f78d45c3a_320.mp4",
    duration: "3:18",
    lyrics: "Mann Mera by Gajendra Verma"
  },
  {
    id: "my_paro",
    title: "Paro",
    artist: "Aditya Rikhari",
    album: "Paro",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/487/Paro-Hindi-2024-20241111123914-500x500.jpg",
    url: "https://aac.saavncdn.com/487/edd8060dcb7c5cf2862c7245c826fce7_320.mp4",
    duration: "1:10",
    lyrics: "Paro by Aditya Rikhari"
  },
  {
    id: "my_pal_pal",
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    album: "70s Special - Hindi",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/951/70s-Special-Hindi-Hindi-2026-20260629180528-500x500.jpg",
    url: "https://aac.saavncdn.com/951/642bd758c0685c60f1c079b48f7d874b_320.mp4",
    duration: "5:26",
    lyrics: "Pal Pal Dil Ke Paas (From \"Blackmail\") by Kishore Kumar"
  },
  {
    id: "my_finding_her",
    title: "Finding Her",
    artist: "Kushagra",
    album: "Finding Her",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/067/Finding-Her-Hindi-2025-20250104190643-500x500.jpg",
    url: "https://aac.saavncdn.com/067/0ad6e1af9474894530c703b4ffcf44e1_320.mp4",
    duration: "3:27",
    lyrics: "Finding Her by Kushagra"
  },
  {
    id: "my_aadmi_chutiya_hai",
    title: "Aadmi Chutiya Hai",
    artist: "Rahgir",
    album: "Mere Gaon Aaoge",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/295/Mere-Gaon-Aaoge-English-2019-20200726201508-500x500.jpg",
    url: "https://aac.saavncdn.com/295/091bbc84ee170b31540c28fa8aea4944_320.mp4",
    duration: "3:46",
    lyrics: "Aadmi Chutiya Hai by Rahgir"
  },
  {
    id: "my_chidiya_vilen",
    title: "Chidiya",
    artist: "Vilen",
    album: "Chidiya",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/779/Chidiya-Hindi-2023-20241205194941-500x500.jpg",
    url: "https://aac.saavncdn.com/779/63a4a0c17183d4c1900df66e7dda6f46_320.mp4",
    duration: "4:13",
    lyrics: "Chidiya by Vilen"
  },
  {
    id: "my_die_with_a_smile",
    title: "Die With A Smile",
    artist: "Lady Gaga",
    album: "Die With A Smile",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/060/Die-With-A-Smile-English-2024-20240816103634-500x500.jpg",
    url: "https://aac.saavncdn.com/060/05bb6ae7a01edcbd8e0d859d2fa1d83d_320.mp4",
    duration: "4:10",
    lyrics: "Die With A Smile by Lady Gaga"
  },
  {
    id: "my_mitwa",
    title: "Mitwa",
    artist: "Shankar Mahadevan",
    album: "Ishq Bulaava",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/798/Ishq-Bulaava-2014-500x500.jpg",
    url: "https://aac.saavncdn.com/798/61c9a7552212dee2f304877a12b6daa8_320.mp4",
    duration: "6:25",
    lyrics: "Mitwa (From \"Kabhi Alvida Naa Kehna\") by Shankar Mahadevan"
  },
  {
    id: "my_line_without_a_hook",
    title: "Line Without a Hook (Slowed)",
    artist: "Ricky Montgomery",
    album: "Edits",
    genre: "Pop / Indie",
    theme: "sad",
    image: "https://c.saavncdn.com/730/Edits-English-2022-20221216075513-500x500.jpg",
    url: "https://aac.saavncdn.com/730/4a938d14b4233fdeb222a0a508b7bca1_320.mp4",
    duration: "4:53",
    lyrics: "Line Without a Hook (slow) by Ricky Montgomery"
  },
  {
    id: "my_aasa_kooda",
    title: "Aasa Kooda",
    artist: "Sai Abhyankkar",
    album: "Aasa Kooda (From \"Think Indie\")",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/772/Aasa-Kooda-From-Think-Indie-Tamil-2024-20251026074529-500x500.jpg",
    url: "https://aac.saavncdn.com/772/6cb3205b2579e7ade889bd6898d9f2b6_320.mp4",
    duration: "3:35",
    lyrics: "Aasa Kooda (From \"Think Indie\") by Sai Abhyankkar"
  },
  {
    id: "my_mockingbird",
    title: "Mockingbird",
    artist: "Eminem",
    album: "Encore",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/700/Encore-Premiere-Explicit-2004-500x500.jpg",
    url: "https://aac.saavncdn.com/700/f5df39c690d3ada350b29f990a749576_320.mp4",
    duration: "4:11",
    lyrics: "Mockingbird by Eminem"
  },
  {
    id: "my_timro_pratiksha",
    title: "Timro Pratiksha (Sped Up)",
    artist: "Akdas Hayat",
    album: "Timro Pratiksha (Sped Up)",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/586/Timro-Pratiksha-Sped-Up-Bengali-2023-20240108123237-500x500.jpg",
    url: "https://aac.saavncdn.com/586/6fb73cead45a41548aad7920c87be7cc_320.mp4",
    duration: "3:21",
    lyrics: "Timro Pratiksha (Sped Up) by Akdas Hayat"
  },
  {
    id: "my_heat_waves",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Au ski !",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/353/Au-ski-English-2025-20260605225527-500x500.jpg",
    url: "https://aac.saavncdn.com/353/693f95158c535a6eccf01011ccbd92ef_320.mp4",
    duration: "3:58",
    lyrics: "Heat Waves by Glass Animals"
  },
  {
    id: "my_sweater_weather",
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/834/I-Love-You--English-2013-20220323205211-500x500.jpg",
    url: "https://aac.saavncdn.com/834/18f56ba72edfe2bfab7210c173b9a5c3_320.mp4",
    duration: "4:00",
    lyrics: "Sweater Weather by The Neighbourhood"
  },
  {
    id: "my_novocaine_slowed",
    title: "Novocaine (Slowed)",
    artist: "GenrIX",
    album: "unfortunately yours,",
    genre: "Pop / Indie",
    theme: "sad",
    image: "https://c.saavncdn.com/515/unfortunately-yours-English-2023-20221214000418-500x500.jpg",
    url: "https://aac.saavncdn.com/515/9878b3d3186e5dfe63d31fb3679df62f_320.mp4",
    duration: "3:40",
    lyrics: "novocaine (Slowed) by GenrIX"
  },
  {
    id: "my_me_gustas_tu",
    title: "Me Gustas Tu (Speed Up)",
    artist: "Manu Chao",
    album: "Manu Chao - Sped Up",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/564/Manu-Chao-Sped-Up-English-2001-20231205035141-500x500.jpg",
    url: "https://aac.saavncdn.com/564/d2fdefa3364ae9f10fbfec102cdbf0c2_320.mp4",
    duration: "3:41",
    lyrics: "Me Gustas Tu - Sped Up (Manu Chao) by Manu Chao"
  },
  {
    id: "my_kings_and_queens",
    title: "Kings & Queens",
    artist: "Ava Max",
    album: "Heaven & Hell",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/032/Heaven-Hell-English-2020-20201119053157-500x500.jpg",
    url: "https://aac.saavncdn.com/032/93fc2828f69be38f22fed9f885a1a08f_320.mp4",
    duration: "2:42",
    lyrics: "Kings & Queens by Ava Max"
  },
  {
    id: "my_your_eyes",
    title: "Your Eyes",
    artist: "Barney Sku",
    album: "Your Eyes",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/912/Your-Eyes-English-2022-20220412173452-500x500.jpg",
    url: "https://aac.saavncdn.com/912/bc75a16dc5a7e16407eb4feefd5215b5_320.mp4",
    duration: "1:47",
    lyrics: "Your Eyes by Barney Sku"
  },
  {
    id: "my_mood_24kgoldn",
    title: "Mood",
    artist: "24kgoldn",
    album: "El Dorado",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/776/El-Dorado-English-2021-20210322233939-500x500.jpg",
    url: "https://aac.saavncdn.com/776/2e092511bf28694477ebd1a9b56b1dc1_320.mp4",
    duration: "2:20",
    lyrics: "Mood by 24kgoldn"
  },
  {
    id: "my_blue_yung_kai",
    title: "Blue",
    artist: "Yung Kai",
    album: "blue",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/419/blue-English-2026-20260119193607-500x500.jpg",
    url: "https://aac.saavncdn.com/419/9d8831c1cb89ddbc0bd9096c088753f2_320.mp4",
    duration: "3:34",
    lyrics: "blue by Yung Kai"
  },
  {
    id: "my_three_fifteen",
    title: "3:15 (Slowed + Reverb)",
    artist: "Russ",
    album: "3:15 (Breathe)",
    genre: "Pop / Indie",
    theme: "sad",
    image: "https://c.saavncdn.com/720/3-15-Breathe--English-2021-20210511033701-500x500.jpg",
    url: "https://aac.saavncdn.com/720/b025fae8ee4f17c6400bf5ef57f29627_320.mp4",
    duration: "3:04",
    lyrics: "3:15 (Breathe) by Russ"
  },
  {
    id: "my_losing_interest",
    title: "Losing Interest (Sped Up)",
    artist: "Stract",
    album: "Losing Interest",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/190/Losing-Interest-English-2019-20210526000809-500x500.jpg",
    url: "https://aac.saavncdn.com/190/976d646e1b80919462787749ddeec803_320.mp4",
    duration: "2:17",
    lyrics: "Losing Interest by Stract"
  },
  {
    id: "my_snap",
    title: "SNAP",
    artist: "Rosa Linn",
    album: "Lay Your Hands Upon My Heart",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/446/Lay-Your-Hands-Upon-My-Heart-English-2023-20240326201449-500x500.jpg",
    url: "https://aac.saavncdn.com/446/4062cc14587aeb3050af2d998bf534c3_320.mp4",
    duration: "2:59",
    lyrics: "SNAP by Rosa Linn"
  },
  {
    id: "my_summertime_sadness",
    title: "Summertime Sadness",
    artist: "Lana Del Rey",
    album: "Born To Die",
    genre: "Pop / Indie",
    theme: "sad",
    image: "https://c.saavncdn.com/915/Born-To-Die-English-2012-20250805223623-500x500.jpg",
    url: "https://aac.saavncdn.com/915/7135e9887cf87cecb04303fbe041659a_320.mp4",
    duration: "4:25",
    lyrics: "Summertime Sadness by Lana Del Rey"
  },
  {
    id: "my_dancin_krono",
    title: "Dancin (Krono Remix)",
    artist: "Aaron Smith",
    album: "Dancin",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/454/Dancin-English-2014-20260228225235-500x500.jpg",
    url: "https://aac.saavncdn.com/454/7e7aa1293a1b8aa629da421e7d30b57e_320.mp4",
    duration: "4:32",
    lyrics: "Dancin (Krono Extended Remix) by Aaron Smith"
  },
  {
    id: "my_play_date",
    title: "Play Date",
    artist: "Swattrex",
    album: "Play Date (Lofi)",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/312/Play-Date-Lofi-English-2021-20230404222554-500x500.jpg",
    url: "https://aac.saavncdn.com/312/79d702abbee7e2b0322a1d725b8fe6e7_320.mp4",
    duration: "3:01",
    lyrics: "Play Date (Lofi) by Swattrex"
  },
  {
    id: "my_death_bed",
    title: "death bed (coffee for your head)",
    artist: "Powfu",
    album: "death bed (coffee for your head)",
    genre: "Pop / Indie",
    theme: "reels_viral",
    image: "https://c.saavncdn.com/180/death-bed-English-2020-20200228133600-500x500.jpg",
    url: "https://aac.saavncdn.com/180/77375fc68cbb672798c601d8047c46d1_320.mp4",
    duration: "2:53",
    lyrics: "death bed (coffee for your head) by Powfu"
  }
]

export const SPOTIFY_PLAYLISTS = [
  {
    id: 'my_playlist',
    title: '✨ My Playlist',
    description: 'Handpicked viral hits, indie anthems, aesthetic slowed & reverb, and soulful favorites.',
    cover: 'https://c.saavncdn.com/978/Die-With-A-Smile-English-2024-20240816053358-500x500.jpg',
    gradient: 'linear-gradient(135deg, #8a2387, #e94057, #f27121)',
    emoji: '✨',
    songIds: [
      "my_life_goes_on",
      "my_taare",
      "my_im_sorry_mom",
      "my_koodappirannor",
      "my_i_thought_i_saw_your_face_today",
      "my_barsat",
      "my_banjara",
      "my_ishq_se_faniyar_female",
      "my_bolve",
      "my_imposter_syndrome",
      "my_aarzu",
      "my_jhoom_rnb",
      "my_ambarsariya",
      "my_love_me_not",
      "my_mann_mera",
      "my_paro",
      "my_pal_pal",
      "my_finding_her",
      "my_aadmi_chutiya_hai",
      "my_chidiya_vilen",
      "my_die_with_a_smile",
      "my_mitwa",
      "my_line_without_a_hook",
      "my_aasa_kooda",
      "my_mockingbird",
      "my_timro_pratiksha",
      "my_heat_waves",
      "my_sweater_weather",
      "my_novocaine_slowed",
      "my_me_gustas_tu",
      "my_kings_and_queens",
      "my_your_eyes",
      "my_mood_24kgoldn",
      "my_blue_yung_kai",
      "my_three_fifteen",
      "my_losing_interest",
      "my_snap",
      "my_summertime_sadness",
      "my_dancin_krono",
      "my_play_date",
      "my_death_bed"
]
  },
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
