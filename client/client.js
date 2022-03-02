//import web components
import '../components/my-footer.js';
import '../components/my-nav.js';
import '../components/my-banner.js';

const handleResponse = async(response) => {

    //Grab the content section
    const content = document.querySelector('#content');

    //Based on the status code, display something
    switch (response.status) {
        case 200: //success
            content.innerHTML = `<b>Success</b>`;
            break;
        case 201: //created
            content.innerHTML = '<b>Created</b>';
            break;
        case 204: //updated (no response back from server)
            content.innerHTML = '<b>Updated (No Content)</b>';
            return;
        case 400: //bad request
            content.innerHTML = `<b>Bad Request</b>`;
            break;
        case 404: //Not Found
            content.innerHTML = `<b>Not Found</b>`;
            break;
        default: //any other status code
            content.innerHTML = `Error code not implemented by client.`;
            break;
    }

    content.innerHTML += '<hr>';

    let obj = await response.text();

    //check if its just a head and end the function
    if (!obj) return 0;

    obj = JSON.parse(obj);

    //If we have a message, display it.
    if (obj.message) {
        content.innerHTML += `<p>Message: ${obj.message}</p>`;
    }
    if (obj.pantry) {
        await populateField(obj, content);
    }
};

const populateField = (obj, element) => {
    let category = document.querySelector('#getCategoryField').value;

    //build list html
    let listhtml = '';
    listhtml += '<div class="tile is-ancestor notification is-info">'

    let tilecounter = 0;
    if (category === 'all') {

        for (let k of Object.keys(obj.pantry)) {
            tilecounter++;
            listhtml += `<div class="tile is-parent"><div class="tile is-child box notification is-primary"><b>${k}</b><ul>`;
            for (let l of Object.keys(obj.pantry[k])) {
                listhtml += `<li> ${obj.pantry[k][l].quantity} ${obj.pantry[k][l].units} of ${obj.pantry[k][l].food}</li>`;
            }
            listhtml += '</ul></div></div>';

            //start tiles on new row if there are already 3 on the same one
            if (tilecounter % 3 === 0) {
                listhtml += '</div><div class="tile is-ancestor notification is-info">';
            }
        }

    } else {
        if (obj.pantry[category]) {
            listhtml += `<div class="tile is-child notification is-primary"><b>${category}</b><ul>`;
            for (let l of Object.keys(obj.pantry[category])) {
                listhtml += `<li> ${obj.pantry[category][l].quantity} ${obj.pantry[category][l].units} of ${obj.pantry[category][l].food}</li>`;
            }
            listhtml += '</ul></div>';
        } else {
            listhtml += `<p>Nothing in the pantry from the category ${category}</p>`
        }
    }
    listhtml += '</div></div>';

    element.innerHTML += listhtml
}

//Uses fetch to send a postRequest. Marksed as async because we use await
//within it.
const sendPost = async(foodForm) => {
    //Grab all the info from the form
    const foodAction = foodForm.getAttribute('action');
    const foodMethod = foodForm.getAttribute('method');

    const foodField = foodForm.querySelector('#foodField');
    const categorySelect = document.querySelector('#categoryField');
    const quantityField = foodForm.querySelector('#quantityField');
    const units = document.querySelector('#measurementField');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `food=${foodField.value}&category=${categorySelect.value}&quantity=${quantityField.value}&units=${units.value}`;

    //Make a fetch request and await a response. Set the method to
    //the one provided by the form (POST). Set the headers. Content-Type
    //is the type of data we are sending. Accept is the data we would like
    //in response. Then add our FORM-URLENCODED string as the body of the request.
    let response = await fetch(foodAction, {
        method: foodMethod,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: formData,
    });

    //Once we have a response, handle it.
    handleResponse(response);
};

const getPost = async(pantryForm) => {
    //Grab all the info from the form
    //const categorySelect = document.querySelector('#categorySelect2');
    const methodField = document.querySelector('#methodSelect');

    //Make a fetch request and await a response. Set the method to
    //the one provided by the form (POST). Set the headers. Content-Type
    //is the type of data we are sending. Accept is the data we would like
    //in response. Then add our FORM-URLENCODED string as the body of the request.
    let response = await fetch('/getPantry', {
        method: methodField.value,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
    });

    handleResponse(response);
}

const init = () => {
    //Grab the form
    const foodForm = document.querySelector('#foodForm');
    const pantryForm = document.querySelector('#pantryForm');

    //Create an addUser function that cancels the forms default action and
    //calls our sendPost function above.
    const addUser = (e) => {
        e.preventDefault();
        sendPost(foodForm);
        return false;
    }

    const getUser = (e) => {
        e.preventDefault();
        getPost(pantryForm)
        return false;
    }

    //Call addUser when the submit event fires on the form.
    foodForm.addEventListener('submit', addUser);
    pantryForm.addEventListener('submit', getUser);
};

//When the window loads, run init.
window.onload = init;