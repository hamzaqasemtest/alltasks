document.getElementById('login').addEventListener('click', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;

    
    fetch('https://jsonplaceholder.typicode.com/users?email=' + email)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                window.location.href = 'index.html?username=' + data[0].username + '&tag=' + data[0].name;
            } else {
                console.log('No user found with this email');
            }
        })
        .catch(error => console.error('Error:', error));
});