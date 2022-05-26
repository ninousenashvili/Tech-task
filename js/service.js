

// service page

// function open the modal window (form)

let clickbutton = document.getElementById('add-btn');
let form = document.getElementById('open-form');

function openform() {
    clickbutton.addEventListener('click', function () {
        form.classList.add('activeform');

    });

}
openform();

// function - close the modal window (form)

function closeoverlay() {
    let closeform = document.getElementById('close-btn');
    closeform.addEventListener('click', function () {
        form.classList.remove('activeform');
        document.getElementById('title1').value = '';
        document.getElementById('text').value = '';


    });

}
closeoverlay();




// form validation

document.getElementById('open-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let errors = {};
    let postform = event.target;
    let title1 = document.getElementById('title1').value;
    let text = document.getElementById('text').value;
    let image = document.getElementById('filename');
    // let file = document.getElementById('filename').value;


    if (title1 == '')
        errors.title1 = 'Title field cannot be empty';
    else if (title1.length > 25)
        errors.title1 = 'Max length of title must be less than 25 symbols';


    if (text == '')
        errors.text = 'Description field cannot be empty';
    else if (text.length > 100)
        errors.text = 'Max length of description must be less than 100 symbols';


    // if (file == '')
    //     errors.file = 'you have not uploaded the image';

    postform.querySelectorAll('.error-text').forEach(item => {
        item.innerHTML = '';

    });


    for (let item in errors) {
        let errorSpan = document.getElementById('error_' + item);
        if (errorSpan) {
            errorSpan.textContent = errors[item];
        }
    }

    if (Object.keys(errors).length == 0) {

        mainDiv.classList.add('activepost');



        let servicetitle = document.createElement('h2');
        servicetitle.classList.add('service-title');
        servicetitle.innerHTML = title1;
        mainDiv.appendChild(servicetitle);

        let servicediscript = document.createElement('p');
        servicediscript.classList.add('service-descript');
        servicediscript.innerHTML = text;
        mainDiv.appendChild(servicediscript);

        let serviceimage = document.createElement('img');
        serviceimage.classList.add('service-image');
        serviceimage.setAttribute('src', `img/${image.files[0].name}`);
        mainDiv.appendChild(serviceimage);

        form.classList.remove('activeform');

    }

});


// document.querySelector('.open-form').addEventListener('submit', addpost);
// function creating new service-post - visible on page


let title1 = document.getElementById('title1').value;
let text = document.getElementById('text').value;
let savebtn = document.getElementById('save-btn');
let mainDiv = document.getElementById('post');


// function createservice(title1, text) {
//     let serviceDiv = document.createElement('div');
//     serviceDiv.classList.add('service-div');

//     let servicetitle = document.createElement('h2');
//     servicetitle.innerHTML = title1;
//     serviceDiv.appendChild(servicetitle);

//     let servicediscript = document.createElement('p');
//     servicediscript.classList.add('service-description');
//     servicediscript.innerHTML = text;
//     serviceDiv.appendChild(servicediscript);
//     mainDiv.appendChild(serviceDiv);

//     form.classList.remove('activeform');

// }
// savebtn.addEventListener('click', createservice);



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



// display current date on footer
document.getElementById("year").innerHTML = (new Date().getFullYear());
