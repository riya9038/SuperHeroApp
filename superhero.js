
//to load the specified hero on page load
function pageload(){
    var hash= window.location.hash.substring(1);
    console.log("hash",hash);
    fetchTheHero(hash);
    
}

//to get the details of the specified hero

async function fetchTheHero(id){
    let url=`https://superheroapi.com/api.php/3071624346492008/${id}`;
    let response= await fetch(url);
    let resJSON= await response.json();
    console.log(resJSON);

    let container= document.getElementById('container');
    let superhero= document.createElement('div');
    superhero.setAttribute('class','hero-link');

    let heroImg= document.createElement('img');
    heroImg.setAttribute('src', resJSON.image.url);
    heroImg.setAttribute('class','hero-image');
    heroImg.setAttribute('height','450px');
    heroImg.setAttribute('width', '400px');
    superhero.appendChild(heroImg);
    container.appendChild(superhero);

    let heroDetails= document.createElement('div');
    heroDetails.setAttribute('id','details');
    superhero.appendChild(heroDetails);

    let heroName= document.createElement('div');
    heroName.innerHTML= `${resJSON.name}`;
    heroName.setAttribute('class','hero-name');
    heroDetails.appendChild(heroName);

    let heroGender = document.createElement('div');
    heroGender.innerHTML = `Gender: ${resJSON.appearance.gender}`;
    heroGender.setAttribute('class', 'hero-gender');
    heroDetails.appendChild(heroGender);

    let heroHeight = document.createElement('div');
    heroHeight.innerHTML = `Height: ${resJSON.appearance.height}`;
    heroHeight.setAttribute('class', 'hero-height');
    heroDetails.appendChild(heroHeight);

    let heroWeight = document.createElement('div');
    heroWeight.innerHTML = `Weight: ${resJSON.appearance.weight}`;
    heroWeight.setAttribute('class', 'hero-weight');
    heroDetails.appendChild(heroWeight);

    let heroPower = document.createElement('div');
    heroPower.innerHTML = `Power: ${resJSON.powerstats.power}`;
    heroPower.setAttribute('class', 'hero-power');
    heroDetails.appendChild(heroPower);

    let heroStrength = document.createElement('div');
    heroStrength.innerHTML = `Strength: ${resJSON.powerstats.strength}`;
    heroStrength.setAttribute('class', 'hero-strength');
    heroDetails.appendChild(heroStrength);

    let heroInt = document.createElement('div');
    heroInt.innerHTML = `Intelligence: ${resJSON.powerstats.intelligence}`;
    heroInt.setAttribute('class', 'hero-int');
    heroDetails.appendChild(heroInt);

    // let heroFullName = document.createElement('div');
    // heroFullName.innerHTML = `Full Name: ${resJSON.biography.fullName}`;
    // heroFullName.setAttribute('class', 'hero-fullname');
    // heroDetails.appendChild(heroFullName);

    let heroPub = document.createElement('div');
    heroPub.innerHTML = `Publisher: ${resJSON.biography.publisher}`;
    heroPub.setAttribute('class', 'hero-pub');
    heroDetails.appendChild(heroPub);

    // let heroApp = document.createElement('div');
    // heroApp.innerHTML = `First Appearance: ${resJSON.biography.first-appearance}`;
    // heroApp.setAttribute('class', 'hero-appearance');
    // heroDetails.appendChild(heroApp);

    let heroWork = document.createElement('div');
    heroWork.innerHTML = `Occupation: ${resJSON.work.occupation}`;
    heroWork.setAttribute('class', 'hero-work');
    heroDetails.appendChild(heroWork);
}