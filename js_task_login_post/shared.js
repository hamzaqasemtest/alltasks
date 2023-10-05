
const cardsContainer = document.querySelector('.cards');
document.querySelector('.create-post').addEventListener('click', () => toggleModal('post'));

function toggleModal(action) {
    const modal = document.getElementById(`${action}Modal`);
    const form = modal.querySelector('form');
    const closeBtn = modal.querySelector('.close');
    const postBody = form.querySelector('textarea');


    modal.style.display = modal.style.display === "block" ? "none" : "block";

    closeBtn.addEventListener('click', () => toggleModal(action));
    window.addEventListener('click', (event) => { if (event.target == modal) toggleModal(action); });
    form.onsubmit = (e) => {
      e.preventDefault();
      if (action === 'post') {
          createPost(postBody.value);
      } else if (action === 'comment') {
          createComment(postBody.value);
      }
      toggleModal(action);
    };
}

function createPost(body) {
    const card = createCard(localStorage.getItem('userName'),localStorage.getItem('userTag'),body,5000);
    cardsContainer.prepend(card);
    const hr = createElement('hr');
    card.after(hr);
  }

function createCard(postOwnerName, postOwnerTag,body,postID) {

    const card = createElement('div', 'container card');
    const postOwner = createElement('div', 'post-owner user-info');
    const img = createElement('img');
    img.src = './img/Ellipse.png';
    img.alt = 'Owner';
    const userInfo = createElement('div');


    
    const userInfoName = createElement('div', 'user-info-name', postOwnerName);
    const userInfoTag = createElement('div', 'user-info-tag', postOwnerTag);
    const postContent = createElement('p', 'post-body', body);
  
    userInfo.append(userInfoName, userInfoTag);
    postOwner.append(img, userInfo);
    card.append(postOwner, postContent);
    const commentsSection = createElement('div', 'comment-section');
    const commentsWrapper = createElement('div', 'comments-wrapper');
    
    
    if (window.location.pathname === '/index.html') {
        // the button to see comments doesn't exist in comments.html
        const seeCommentsButton = createElement('a', 'see-comments-button', 'See Comments');
        seeCommentsButton.addEventListener('click', () => {
          // redirect to comments.html with postId and userId and username 
          // https://jsonplaceholder.typicode.com/posts?userId=1&id=1
          window.location.href = `./comments.html?userId=${postOwnerName}&postID=${postID}`;
        });
        commentsWrapper.append(seeCommentsButton);
        // end of the button to see comments
    }
  
    
    const addComment = createElement('div', 'create-comment');
    addComment.addEventListener('click', () => toggleModal('comment'));
    const imgAddComment = createElement('img');
    imgAddComment.src = './img/Comment.svg';
    imgAddComment.alt = 'Commenter';
    const spanAddComment = createElement('span', '', 'Add Comment...');
    addComment.append(imgAddComment, spanAddComment);
  
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
  

  function renderPost(post,firstCommentOnly = false) {
    const card = createCard(post.userId,post.userId,post.body,post.id);
    cardsContainer.append(card);
    showComments({ postID: post.id ,element: card}, firstCommentOnly);
    const hr = createElement('hr');
    card.after(hr);    
  }
  
  function showComments(postInfo, firstComment = false) {
    fetch(API_URL_COMMENTS + `?postId=${postInfo.postID}`)
      .then(response => response.json())
      .then(comments => {
        const commentsWrapper = postInfo.element.querySelector('.comments-wrapper');
        comments.forEach((comment, index) => {
          // render all comments but if firstComment is true render only the first comment
          if (firstComment && index > 0) return;
          
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
  
  
  function createComment(body) {
    const commentDiv = createElement('div', 'comment');
    const userInfo = createElement('div', 'user-info');
    const img = createElement('img');
    img.src = './img/Ellipse.png';
    img.alt = 'Commenter';
    const userInfoDiv = createElement('div');
    const userInfoName = createElement('div', 'user-info-name', localStorage.getItem('userName'));
    const userInfoComment = createElement('div', 'user-info-comment', localStorage.getItem('userTag'));
    const commentBody = createElement('p', '', body);
    userInfoDiv.append(userInfoName, userInfoComment);
    userInfo.append(img, userInfoDiv);
    commentDiv.append(userInfo, commentBody);
    const commentsWrapper = document.querySelector('.comments-wrapper');
    commentsWrapper.append(commentDiv);
  }
  