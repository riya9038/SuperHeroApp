
var searchBar= document.getElementById('search-bar');
var searchBtn= document.getElementById('searchBox');
searchBar.addEventListener('keyup',fetchHero);
console.log(searchBar);
localStorage.removeItem('like326');

//fetching api to get the list of heroes

async function fetchHero(){
    let name= document.getElementById("search-bar").value;
    let url= `https://superheroapi.com/api.php/3071624346492008/search/${name}`;
    let response= await fetch(url);
    let resJSON= await response.json();
    console.log(resJSON);
    let arr= resJSON.results;
    let heroList= document.getElementById('hero-list');

    //in case of previous list if any
    if(heroList.childElementCount !=0)
        {
            let childs = heroList.childElementCount;
            for(let j=0; j < childs ; j++)
            {
                heroList.children[0].remove();
            }
        }

    //displaying the list
    for(let i=0; i < arr.length; i++)
    {
        let name= arr[i].name;
        let img = arr[i].image.url;

        let hid = `${arr[i].id}`

        let li = document.createElement('li');
        li.setAttribute('id','hero')
        //crete child and attributes for li....
        let lianchor = document.createElement('button');
        lianchor.setAttribute('id',hid);
        lianchor.setAttribute('class', 'hero-link');
        lianchor.setAttribute('onclick','fetchTheHero(this.id)');

        let liImg = document.createElement('img');
        liImg.setAttribute('src', img);
        liImg.setAttribute('height','150px');
        liImg.setAttribute('width', '150px');
        liImg.setAttribute('class', 'hero-img');
        // liimg.setAttribute('margin-left', '10px');
        lianchor.appendChild(liImg);

        let liDetails= document.createElement('div');
        liDetails.setAttribute('id','details');
        lianchor.appendChild(liDetails);

        let liName = document.createElement('div');
        liName.innerHTML = name;
        // liname.setAttribute('display', 'inline-block');
        liName.setAttribute('class', 'hero-name');
        // liname.setAttribute('margin-left', '10px');
        liDetails.appendChild(liName);

        let liPub = document.createElement('div');
        liPub.innerHTML = `Publisher:${arr[i].biography.publisher}`;
        // liname.setAttribute('display', 'inline-block');
        liPub.setAttribute('class', 'hero-pub');
        // liname.setAttribute('margin-left', '10px');
        liDetails.appendChild(liPub);


        let liStats = document.createElement('div');
        liStats.innerHTML = `Strength:${arr[i].powerstats.strength}`;
        // listats.setAttribute('display', 'inline-block');
        liStats.setAttribute('class', 'hero-stats');
        // listats.setAttribute('margin-left', '10px');
        liDetails.appendChild(liStats);


        let like = document.createElement('button');
        like.setAttribute('class', 'like');
        like.setAttribute('id', hid);
        like.setAttribute('onclick','setFav(this.id,event)');

        let like_btn = document.createElement('i');
        like_btn.innerHTML="Like";
        like.appendChild(like_btn);
        li.appendChild(lianchor);
        liDetails.appendChild(like);
        // li.innerHTML = name;
        heroList.appendChild(li);
    }
    
}

//storing the fav hero in the local storage
var favarr=[];
function setFav(id,e){
    console.log("event",e);
    e.stopPropagation();
    console.log("fav");
    let h_id= `${id}`
    localStorage.setItem(h_id, h_id);
    favarr.push(id);
    if(e.target.innerHTML==="Like")
        e.target.innerHTML="Unlike";
    else if(e.target.innerHTML==="Unlike"){
        e.target.innerHTML="Like";
        localStorage.removeItem(e.path[1].id);
        favarr.pop(e.path[1].id);
    }
    Notification.requestPermission(permission => {
        if(permission === 'granted') {
            const myNoti = new Notification('Notification', {
                body: 'SuperHero Added to Favourites',
            });
        }
    });
}

//rendering the fav list
async function getFav(){
    for(let i=0;i<localStorage.length;i++){
        let key= localStorage.key(i);
        console.log("key",key);
        console.log(localStorage);
        if(key!=null){
            let url= `https://superheroapi.com/api.php/3071624346492008/${key}`;
            let response= await fetch(url);
            let resJSON= await response.json();
            let heroList= document.getElementById('hero-list');

            let name= resJSON.name;
            let img = resJSON.image.url;

            let hid = `${resJSON.id}`

            let li = document.createElement('li');
            li.setAttribute('id','hero')
            //crete child and attributes for li....
            let lianchor = document.createElement('button');
            lianchor.setAttribute('id',hid);
            lianchor.setAttribute('class', 'hero-link');
            lianchor.setAttribute('onclick','fetchTheHero(this.id)');

            let liImg = document.createElement('img');
            liImg.setAttribute('src', img);
            liImg.setAttribute('height','150px');
            liImg.setAttribute('width', '150px');
            liImg.setAttribute('class', 'hero-img');
            // liimg.setAttribute('margin-left', '10px');
            lianchor.appendChild(liImg);

            let liDetails= document.createElement('div');
            liDetails.setAttribute('id','details');
            lianchor.appendChild(liDetails);

            let liName = document.createElement('div');
            liName.innerHTML = name;
            // liname.setAttribute('display', 'inline-block');
            liName.setAttribute('class', 'hero-name');
            // liname.setAttribute('margin-left', '10px');
            liDetails.appendChild(liName);

            let liPub = document.createElement('div');
            liPub.innerHTML = `Publisher:${resJSON.biography.publisher}`;
            // liname.setAttribute('display', 'inline-block');
            liPub.setAttribute('class', 'hero-pub');
            // liname.setAttribute('margin-left', '10px');
            liDetails.appendChild(liPub);


            let liStats = document.createElement('div');
            liStats.innerHTML = `Strength:${resJSON.powerstats.strength}`;
            // listats.setAttribute('display', 'inline-block');
            liStats.setAttribute('class', 'hero-stats');
            // listats.setAttribute('margin-left', '10px');
            liDetails.appendChild(liStats);


            let like = document.createElement('button');
            like.setAttribute('class', 'like');
            like.setAttribute('id', hid);
            like.setAttribute('onclick','removeFav(this.id, event)');

            let like_btn = document.createElement('i');
            like_btn.innerHTML="UnLike";
            like.appendChild(like_btn);
            li.appendChild(lianchor);
            liDetails.appendChild(like);
            // li.innerHTML = name;
            heroList.appendChild(li);
        }
    }
}

//removing the hero from the fav list
function removeFav(id, event){
    event.stopPropagation();
    localStorage.removeItem(`${id}`);
    Notification.requestPermission(permission => {
        if(permission === 'granted') {
            const myNoti = new Notification('Notification', {
                body: 'SuperHero removed from Favourites',
            });
        }
    });
    location.reload();
}

//rendering a specific superhero
function fetchTheHero(id){
    window.location.href= `superhero.html#${id}`;
}