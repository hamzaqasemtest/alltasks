const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL_POST = API_URL + '/posts';
const API_URL_COMMENTS = API_URL + '/comments';
const API_URL_USERS = API_URL + '/users';

const urlParams = new URLSearchParams(window.location.search);
localStorage.setItem('userTag', urlParams.get('tag'));
localStorage.setItem('userName', urlParams.get('username'));


// function renderPost(post,firstCommentOnly = false) header fix for second then
fetch(API_URL_POST)
  .then(response => response.json())
  .then(posts => posts.forEach(post => renderPost(post, true)));
