const pantry = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });

    response.write(JSON.stringify(object));

    response.end();
};

const respondJSONHead = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });

    response.end();
};

const getPantry = (request, response) => {
    const responseJSON = { pantry }

    return respondJSON(request, response, 200, responseJSON);
};

const getPantryHead = (request, response) => respondJSONHead(request, response, 200);

const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    return respondJSON(request, response, 404, responseJSON);
};

const notRealHead = (request, response) => respondJSONHead(request, response, 404);

const addFood = (request, response, params) => {
    // object including the message to send back
    const responseJSON = {
        message: 'Food name and quantity are both required',
    };

    // if either parameter is missing then it's an error
    if (!params.food || !params.quantity || params.food === '' || params.quantity === '') {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    // next default it to creating a new one
    let status = 201;

    if (!pantry[params.category]) { pantry[params.category] = {} };

    // change code if it exists, if it doesn't then create it
    if (pantry[params.category][params.food]) {
        status = 204;
    } else {
        pantry[params.category][params.food] = {};
    }

    // either adds or updates
    pantry[params.category][params.food].food = params.food;
    pantry[params.category][params.food].quantity += params.quantity;
    pantry[params.category][params.food].category = params.category;
    pantry[params.category][params.food].units = params.units;

    // sends the response for if it was created
    if (status === 201) {
        responseJSON.message = 'Created Successfuly!';
        return respondJSON(request, response, status, responseJSON);
    }

    // not created, so it must be updated, sends no data just a head
    return respondJSONHead(request, response, status);
};

module.exports = {
    getPantry,
    getPantryHead,
    notReal,
    notRealHead,
    addFood,
};