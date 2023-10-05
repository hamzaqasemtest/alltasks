const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL_POST = API_URL + '/posts';
const API_URL_COMMENTS = API_URL + '/comments';
const API_URL_USERS = API_URL + '/users';


const urlParams = new URLSearchParams(window.location.search);


const postID = urlParams.get('postID');
const userId = urlParams.get('userId');



// Fetch and render posts
fetch(API_URL_POST + `?userId=${userId}&id=${postID}`)
  .then(response => response.json())
  .then(post => renderPost(post[0]));


