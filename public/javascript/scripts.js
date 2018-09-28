

axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
    .then(function (response){
        //handle success
        alert(response.hex.value);
    })
    .catch(function (error){
        //handle error
        console.log(error);
    })

// listen for a form submit event
document.getElementById("newComment").addEventListener("submit", e =>{
    // prevent the default form behavior
    e.preventDefault();

    // serialize the form data into an object
    let comment = {};
    const inputs = document.getElementsByClassName('form-control');
    for (var i = 0; i < inputs.length; i++){
        comment[inputs[i].name] = inputs[i].value;
    }
    // use axios to initialize a post request and send
    axios.post('/reviews/comments', comment)
        .then(function (response) {
        // wait for the success response from the server
        console.log(response);
        // remove the information from the information
        // display the data as a new comment on the page
        })
        .catch(function (error) {
            console.log(error);
            // handle any errors
            alert('There was a problem saving your comment. Please try again.')
        })
})

axios.post('/user', comment)
.then(function (response) {
    // wait for the success response from the server
    console.log(response);
    // remove the information from the information
    this.reset();
    // display the data as a new comment on the page
    document.getElementById('comments').prepend(
        `
        <div class="card" id="${this._id}">
            <div class="card-block">
                <h4 class="card-title">${response.title}</h4>
                <p class="card-text">${response.content}</p>
                <p><button class="btn btn-link" id="deleteComment" data-comment-id=${response._id}>Delete</button></p>
            </div>
        </div>
        `
    );
})

document.getElementById('delete-comment').addEventListener('click', (e) => {
    console.log("click!")
    let commentId = this.getAttribute('data-comment-id')
    axios.delete(`/reviews/comments/${commentId}`)
        .then(response => {
            console.log(response)
            comment = document.getElementById(commentId)
            comment.parentNode.removeChild(comment); // OR comment.style.display = 'none'
        })
        .catch(error => {
            console.log(error)
            alert('There was an error deleting this comment.')
        });
})
