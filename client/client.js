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

    let obj = await response.text();

    //check if its just a head and end the function
    if (!obj) return 0;

    obj = JSON.parse(obj);

    //If we have a message, display it.
    if (obj.message) {
        content.innerHTML += `<p>Message: ${obj.message}</p>`;
    }
    if (obj.pantry) {
        let category = document.querySelector('#getCategoryField').value;
        if (category === 'all') {
            content.innerHTML += `<p>${JSON.stringify(obj.pantry)}</p>`;

        } else {
            if (obj.pantry[category]) {
                content.innerHTML += `<p>${JSON.stringify(obj.pantry[category])}</p>`
            } else {
                content.innerHTML += `<p>Nothing in the pantry from the category ${category}</p>`
            }
        }
    }
};

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