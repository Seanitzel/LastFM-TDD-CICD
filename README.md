Description of the features and the API used :\n

API:\n
The Last.fm API allows anyone to build their own programs using Last.fm data, whether they are on the web, the desktop or mobile devices.\n
The Last.fm API allows you to call methods that respond in REST style xml.\n
The API root URL is located at: http://ws.audioscrobbler.com/2.0/ \n
We will send a method parameter expressed as 'package.method' along with method specific arguments to the root URL.\n The API supports multiple transport formats but will respond in Last. fm idiom xml by default.\n



Features:\n

getArtistInfo: allows to enter an artist’s name and shows the artist’s info from the data base. Includes biography , truncated at 300 characters.\n

getSimilar: allows to enter an artist’s name and shows all the  similar artists.\n

getTopTracks: allows to enter an artist’s name and get the top tracks by an artist on Last.fm, orders by popularity.\n

getTopArtists: showing the top artists chart.\n

commonSongsName: allows to enter an artist’s name and shows the songs chart with the same name of the artist and similar artists.\n

ArtistInChart: allows to enter and artist’s name and shows if the artist is a top artist or not .\n
