let title1 = document.getElementById('title1').value;
let text = document.getElementById('text').value;
let savebtn = document.getElementById('save-btn');



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




function closeoverlay() {
    let closeform = document.getElementById('close-btn');
    closeform.addEventListener('click', function () {
        form.classList.remove('activeform');
        document.getElementById('title1').value = '';
        document.getElementById('text').value = '';

        document.querySelectorAll('.error-text').forEach(item => {
            item.innerHTML = '';
        });

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
    let mainDiv = document.getElementById('service-wrapper');
    let mainelements = document.createElement('div');
    mainelements.classList.add('service');

    if (title1 == '' || title1.length > 25)
        errors.title1 = 'Title field cannot be empty and must be less than 25 symbols';


    if (text == '' || text.length > 100)
        errors.text = 'Description field cannot be empty and cannot be more than 100 symblos';


    if (image.files == 0) {
        errors.image.files = 'please select image';
    }


    for (let item in errors) {
        let errorSpan = document.getElementById('error_' + item);
        if (errorSpan) {
            errorSpan.textContent = errors[item];
        }
    }

    if (Object.keys(errors).length == 0) {

        let servicetitle = document.createElement('h2');
        servicetitle.classList.add('service-heading');
        servicetitle.textContent = title1;
        mainelements.appendChild(servicetitle);


        let servicediscript = document.createElement('p');
        servicediscript.classList.add('servive-description');
        servicediscript.textContent = text;
        mainelements.appendChild(servicediscript);


        let serviceimage = document.createElement('img');
        serviceimage.classList.add('service-img');
        serviceimage.setAttribute('src', `images/${image.files[0].name}`);
        mainelements.appendChild(serviceimage);
        mainDiv.appendChild(mainelements);

        document.getElementById('title1').value = '';
        document.getElementById('text').value = '';
        document.getElementById('filename').value = '';

        form.classList.remove('activeform');
    }
});



// display current date on footer
document.getElementById("year").innerHTML = (new Date().getFullYear());


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