const createRequest = async (options = {
  sendMethod, method, id, data, callback,
}) => {
  let strRequest = `${options.url}?method=${options.method}`;
  //let strRequest = `http://localhost:3000/?method=${options.method}`;
  if (options.id) {
    strRequest += `&id=${options.id}`;
  }

  if (options.sendMethod === 'GET') {
    fetch(strRequest)
      .then((response) => {
        if (options.method === 'deleteById') {
          return response;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        options.callback(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  } else if (options.sendMethod === 'POST') {
    fetch(strRequest, {
      method: 'POST',
      body: JSON.stringify(options.data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        options.callback(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }
};

export default createRequest;
