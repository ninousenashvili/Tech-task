// // main page functions

// // creating the Banner slider 

let data = [
    {
        id: 1,
        imageurl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/b1/c0/1f/swimming-pool.jpg?w=900&h=-1&s=1',
        title: 'check our spa center',
        url: 'https://www.google.com/'
    },
    {
        id: 2,
        imageurl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/45/fc/f1/hotel-suit-in-side-turkey.jpg?w=900&h=-1&s=1',
        title: 'create memories',
        url: 'https://www.google.com/'
    },

    {
        id: 3,
        imageurl: 'https://storage.thesmallhotels.com/images/629bd20bec7a3ccde934dbac4fb6e773422c0593.jpg',
        title: 'relax, rechange',
        url: 'https://www.google.com/'
    },

];

let arrowleft = document.getElementById('arrow-left');
let arrowright = document.getElementById('arrow-right');
let slidercontent = document.getElementById('slider-content');
let dotslist = document.getElementsByClassName('dot');

let sliderindex = 0;

function createatag(item) {
    let atag = document.createElement('a');
    atag.setAttribute('href', item.url);
    atag.classList.add('slide');

    return atag;
}


function createimagetag(item) {
    let imagetag = document.createElement('img');
    imagetag.setAttribute('src', item.imageurl);
    imagetag.setAttribute('alt', item.title);
    imagetag.classList.add('image-slider');
    return imagetag;
}


function createh2tag(item) {
    let tagtitle = document.createElement('h2');
    tagtitle.classList.add('slider-title');
    tagtitle.append(item.title);
    return tagtitle;

}

function createdots(item) {
    let dots = document.createElement('div');
    dots.classList.add('dots');

    data.forEach((element) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id', element.id - 1);

        dot.onclick = function (event) {
            let id = event.target.getAttribute('data-id');
            sliderindex = id;
            setslide();
        };
        dots.appendChild(dot);
    });
    return dots;
}

function setslide() {
    slidercontent.innerHTML = '';
    let slideitem = createatag(data[sliderindex]);
    let imgtag = createimagetag(data[sliderindex]);
    let h2tag = createh2tag(data[sliderindex]);
    let dots = createdots();
    slidercontent.appendChild(dots);


    slideitem.appendChild(imgtag);
    slideitem.appendChild(h2tag);

    slidercontent.appendChild(slideitem);
    currendotactive();
    // console.log(slideitem);
}

function currendotactive() {
    dotslist[sliderindex].classList.add('active');
}
function arrowleftclick() {
    if (sliderindex <= 0) {
        sliderindex = data.length - 1;
        setslide();
        return;
    }
    sliderindex--;
    setslide();
}

function arrowrightclick() {
    if (sliderindex >= data.length - 1) {
        sliderindex = 0;
        setslide();
        return;
    }
    sliderindex++;
    setslide();
}

arrowleft.addEventListener('click', arrowleftclick);
arrowright.addEventListener('click', arrowrightclick);

setInterval(() => {
    arrowrightclick();
}, 3000);
setslide();



// burger bar

let hamburger = document.querySelector('.humburger');
let menubar = document.querySelector('.ul-list');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('activemenu');
    menubar.classList.toggle('activemenu');

});

document.querySelectorAll('.link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('activemenu');
    menubar.classList.remove('activemenu');
}));


// current date


let today = new Date();
let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
document.getElementById("year").append(date);


// get server posts


let mainwraperpost = document.getElementById('post-wrapper');
let overlaycontent = document.getElementById('overlay');
let closeoverlay = document.getElementById('close');
let content = document.getElementById('content');


function ajax(url, callback) {
    let request = new XMLHttpRequest;
    request.open('GET', url);
    request.addEventListener('load', function () {
        let data = JSON.parse(request.responseText);
        callback(data);


    });

    request.send();


}
ajax('https://api.npoint.io/44c1c313d40c0811ad19?fbclid=IwAR0Wv5wKUMcuLUeJBwJZBdiEGIb_AEb-8J5JYVHPQhNjlGjndvxXcYmoVs0/posts/', function (data) {
    printData(data);
});

function printData(data) {
    data.forEach(element => {
        createpost(element);

    });
}

function createpost(item) {
    let divwrapper = document.createElement('div');
    divwrapper.classList.add('server-post');
    divwrapper.setAttribute('data-id', item.id);


    let h2tag = document.createElement('h2');
    h2tag.innerText = item.id;
    h2tag.classList.add('server-id');

    let h3tag = document.createElement('h3');
    h3tag.innerText = item.title;
    h3tag.classList.add('server-title');

    let view = document.createElement('button');
    view.innerText = 'View More';
    view.classList.add('view-btn');
    view.setAttribute('data-id', item.id - 1);
    divwrapper.appendChild(view);


    divwrapper.appendChild(h2tag);
    divwrapper.appendChild(h3tag);




    view.addEventListener('click', function (event) {
        let id = event.target.getAttribute('data-id');
        openoverlay(id);
    })


    mainwraperpost.appendChild(divwrapper);


}


function openoverlay(id) {

    overlaycontent.classList.add('active');
    let url = `https://api.npoint.io/44c1c313d40c0811ad19?fbclid=IwAR0Wv5wKUMcuLUeJBwJZBdiEGIb_AEb-8J5JYVHPQhNjlGjndvxXcYmoVs0/posts/${id}`;

    ajax(url, function (data) {
        overlayfunction(data[id]);

    });
}
function overlayfunction(item) {



    let descript = document.createElement('p');
    descript.innerText = item.description;
    descript.classList.add('descript');

    let image = document.createElement('img');
    image.setAttribute('src', item.image);
    image.append = item.image;
    image.classList.add('server-img');


    content.appendChild(image);
    content.appendChild(descript);




}



closeoverlay.addEventListener('click', function () {
    overlaycontent.classList.remove('active');
    content.innerHTML = ' ';
});