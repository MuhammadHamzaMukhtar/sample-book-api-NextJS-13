export default async function loginUser(username: string, email: string) {
    const data = {
        username: username,
        email: email,
    };
  
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
  
    // API endpoint where we send form data.
    const endpoint = "http://localhost:3000/api/login";
  
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",

      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };
  
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
  
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    return result;
  }
  