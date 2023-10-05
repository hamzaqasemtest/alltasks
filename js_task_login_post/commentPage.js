const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL_POST = API_URL + '/posts';
const API_URL_COMMENTS = API_URL + '/comments';
const urlParams = new URLSearchParams(window.location.search);


const postID = urlParams.get('postID');
const userId = urlParams.get('userId');



const cardsContainer = document.querySelector('.cards');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');
const postForm = document.getElementById('postForm');

// Event Listeners
document.querySelector('.create-post').addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
window.addEventListener('click', (event) => { if (event.target == modal) toggleModal(); });
postForm.addEventListener('submit', submitPost);

// Fetch and render posts
// example posts?userId=1&id=1

fetch(API_URL_POST + `?userId=${userId}&id=${postID}`)
  .then(response => response.json())
  .then(post => renderPost(post));

function createPost(body) {
    const card = createCard(username,`@${userId}` , body);
    cardsContainer.prepend(card);
}


function toggleModal() {
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function submitPost(e) {
  e.preventDefault();
  createPost(document.getElementById('postBody').value);
  toggleModal();
}

function createCard(userName, userTag, body, postId) {
  console.log(userTag +"will send to " + postId);  
  const card = createElement('div', 'container card');
  const postOwner = createElement('div', 'post-owner user-info');
  const img = createElement('img');
  img.src = './img/Ellipse.png';
  img.alt = 'Owner';
  const userInfo = createElement('div');
  const userInfoName = createElement('div', 'user-info-name', userName);
  const userInfoTag = createElement('div', 'user-info-tag', userTag);
  const postContent = createElement('p', 'post-body', body);

  userInfo.append(userInfoName, userInfoTag);
  postOwner.append(img, userInfo);
  card.append(postOwner, postContent);

  const commentsSection = createElement('div', 'comment-section');
  const commentsWrapper = createElement('div', 'comments-wrapper');


  const addComment = createElement('div', 'add-comment');
  const imgAddComment = createElement('img');
  imgAddComment.src = './img/Comment.svg';
  imgAddComment.alt = 'Commenter';
  const spanAddComment = createElement('span', '', 'Add Comment...');
  addComment.append(imgAddComment, spanAddComment);

  addComment.addEventListener('click', toggleCommentModal);
  commentsSection.append(commentsWrapper);
  commentsSection.append(addComment);
  card.append(commentsSection);


  commentsSection.append(commentsWrapper);
  commentsSection.append(addComment);
  card.append(commentsSection);
  
  return card;
}


function createElement(type, className = '', textContent = '') {
  const element = document.createElement(type);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

function renderPost(post) {
  console.log(post);  
  const card = createCard(post[0].userId,post[0].userId,post[0].body,post[0].id);
  cardsContainer.append(card);
  console.log("reach here renderPost");
  
  showComments({ postID: post[0].id, element: card });
}

function showComments(postInfo, firstComment = false) {
    console.log("reach here showComments")
  fetch(API_URL_COMMENTS + `?postId=${postInfo.postID}`)
    .then(response => response.json())
    .then(comments => {
    
      const commentsWrapper = postInfo.element.querySelector('.comments-wrapper');
      comments.forEach((comment, index) => {
        // render all comments but if firstComment is true render only the first comment
        console.log("reach here");
        if (firstComment && index > 0) return;
            console.log("reach here");
         const commentDiv = createElement('div', 'comment');
         const userInfo = createElement('div', 'user-info');
         const img = createElement('img');
         img.src = './img/Ellipse.png';
         img.alt = 'Commenter';
         const userInfoDiv = createElement('div');
         const userInfoName = createElement('div', 'user-info-name', comment.name);
         const userInfoComment = createElement('div', 'user-info-comment', `@${comment.email.split('@')[0]}`);
         const commentBody = createElement('p', '', comment.body);
         userInfoDiv.append(userInfoName, userInfoComment);
         userInfo.append(img, userInfoDiv);
         commentDiv.append(userInfo, commentBody);
         commentsWrapper.append(commentDiv);
      });
    });
}



function toggleCommentModal() {
  commentModal.style.display = commentModal.style.display === "block" ? "none" : "block";
}

function submitComment(e) {
  e.preventDefault();
  createComment(document.getElementById('commentBody').value);
  toggleCommentModal();
}

function createComment(body) {

  const userTag = `@user${userId}`;
  const commentDiv = createElement('div', 'comment');
  const userInfo = createElement('div', 'user-info');
  const img = createElement('img');
  img.src = './img/Ellipse.png';
  img.alt = 'Commenter';
  const userInfoDiv = createElement('div');
  const userInfoName = createElement('div', 'user-info-name', userName);
  const userInfoComment = createElement('div', 'user-info-comment', userTag);
  const commentBody = createElement('p', '', body);
  userInfoDiv.append(userInfoName, userInfoComment);
  userInfo.append(img, userInfoDiv);
  commentDiv.append(userInfo, commentBody);
  const commentsWrapper = document.querySelector('.comments-wrapper');
  commentsWrapper.append(commentDiv);
}

