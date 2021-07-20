var MAX_WISHES = 75;
var congratsArray = [];
var generateCongrats = true;

function congratulations() {

    section=document.createElement("div");
    section.innerHTML='Congratulations!';
    section.className='congratsdiv';
    document.body.appendChild(section);

    // Set the color
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    section.style.color = '#' + randomColor;

    section.style.fontFamily = "sans-serif";
    section.style.fontSize = Math.random() * 50 + 20 + 'px';

    var rotation = 90 * Math.random() - 45;
    section.style.transform = "rotate(" + rotation + "deg)";

    section.style.display = "none";

    // Positioning
    var elemWidth = section.parentElement.children[3].offsetWidth; // don't ask
    var elemHeight = section.parentElement.children[3].offsetHeight;

    var widthOffset = elemWidth / (window.screen.availWidth * 2);
    var heightOffset = elemHeight / (window.screen.availHeight * 2);

    section.style.position = 'absolute';
    section.style.left = (Math.random() - widthOffset) * 100 + '%';
    section.style.top = (Math.random() - heightOffset) * 100 + '%';

    if (congratsArray.length > MAX_WISHES) {
        deleteMe = congratsArray.shift();
        $(deleteMe).fadeOut(200 * Math.random() + 400);
        deleteMe.remove();
    }

    if (generateCongrats) {
        currWishes = congratsArray.push(section);
        $(section).fadeIn(200 * Math.random() + 400);

        var timeout = Math.random() * 2000;
        setTimeout(congratulations, timeout);
    }
}

function start() {
    $('#welcome').fadeOut();
    generateCongrats = true;

    document.getElementById('good').play();

    setTimeout(function() {
        document.body.id='getpausebutton';
    }, 400);

    // document.addEventListener('click', showThanks);

    if (generateCongrats) {
        congratulations();
    }
}

document.addEventListener('click', function(event) {
    if(document.body.id == 'getpausebutton') {
        $('#thankyou').fadeIn();
        document.body.id = '';
    }
  } );

function pause() {
    generateCongrats = false;

    document.getElementById('good').pause();
    $('#thankyou').fadeOut();
    $('#welcome').delay(400).fadeIn();
}

function finish() {
    document.body.id = '';

    $('.congratsdiv').fadeOut(500);
    $('#thankyou').delay().fadeIn();

    generateCongrats = false;

    setTimeout(function(){
        congratsArray.map(function(elem) {elem.remove()});
        congratsArray = [];
    }, 500);
}