function showComments(comments) {
    var comments_holder = document.getElementById('comments-holder');
    comments_holder.innerHTML = '';
    console.log(comments);
    console.log(comments.length);
    if (comments.length === 0) {
        comments_holder.innerHTML = `
            <div class="col-lg-8 py-4">
                <p class="text-light"><i class="far fa-comment fa-3x"></i></p>
                <span class="text-light">No comments on this post. Be the first one to comment.</span>
            </div>
        `;
    }
    else {
        comments.forEach(comment => {
            var div = document.createElement('div');
            div.classList.add('col-lg-8', 'py-4', 'revealOnScroll', 'faster');
            div.setAttribute('data-animation', 'fadeInUp');
            div.setAttribute('data-delay', 100);
            div.innerHTML = `
                <div class="d-flex align-items-center mb-2">
                    <div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width:50px;height:50px;background:linear-gradient(135deg, ${comment.color[0]}, ${comment.color[1]});">
                        <h5 class="mb-0">${comment.name[0].toUpperCase()}</h5>
                    </div>
                    <div class="d-flex flex-column pl-2">
                        <h4 class="mb-0">${comment.name}</h4>
                        <span class="text-muted">${moment.utc(comment.time).local().fromNow()}</span>
                    </div>
                </div>
                <span class="text-light">${comment.content}</span>
            `;
            comments_holder.appendChild(div);
        });
    }
}


function loadComments() {
    load_comments_btn.disabled = true;
    load_comments_btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Loading comments...`;

    var blog = document.getElementsByName("blog-name")[0];
    var formData = new FormData();
    formData.append("blog", blog.value);

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            load_comments_btn.disabled = false;
            comments = JSON.parse(ajax.response);
            showComments(comments);
            load_comments_btn.innerText = "Load Comments";
            load_comments_btn.classList.add('d-none');
        }
    };
    ajax.open("POST", "https://ravgeet-blog-comments.herokuapp.com/get", true);
    ajax.send(formData);
}


function addNewComment() {
    var username = document.getElementsByName("username")[0];
    var content = document.getElementsByName("content")[0];
    var blog = document.getElementsByName("blog-name")[0];
    
    if ( !(valid(username.value, 'string')) || username.value.trim() === '' ) {
        validation_id = username.getAttribute('data-validation-error-id');
        validation_message = document.getElementById(validation_id);
        validation_message.classList.remove('d-none');
        return 0;
    }
    if (content.value.trim() === '') {
        validation_id = content.getAttribute('data-validation-error-id');
        validation_message = document.getElementById(validation_id);
        validation_message.classList.remove('d-none');
        return 0;
    }

    add_comment_btn.disabled = true;
    add_comment_btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>`;

    var formData = new FormData();
    formData.append("name", username.value);
    formData.append("content", content.value);
    formData.append("blog", blog.value);

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            comments = JSON.parse(ajax.response);
            add_comment_btn.disabled = false;
            add_comment_btn.innerText = "Comment";
            discard();
            showComments(comments);
        }
    };
    ajax.open("POST", "https://ravgeet-blog-comments.herokuapp.com/add", true);
    ajax.send(formData);
}


function discard() {
    document.getElementsByName("username")[0].value = '';
    document.getElementsByName("content")[0].value = '';
}


function valid(item, type) {
    if (typeof(item) === type) {
        return true;
    }
}

var load_comments_btn = document.getElementById("load-comments-btn");
load_comments_btn.addEventListener("click", loadComments);

var add_comment_btn = document.getElementById("add-comment-btn");
add_comment_btn.addEventListener("click", addNewComment);

var discard_btn = document.getElementById("discard-btn");
discard_btn.addEventListener("click", discard);

var username = document.getElementsByName("username")[0];
username.addEventListener('keyup', event => {
    var validation_id = username.getAttribute('data-validation-error-id');
    var validation_message = document.getElementById(validation_id);
    if ( !(valid(username.value, 'string')) || username.value.trim() === '' ) {
        validation_message.classList.remove('d-none');
    }
    else {
        validation_message.classList.add('d-none');
    }
});

var content = document.getElementsByName("content")[0];
content.addEventListener('keyup', event => {
    var validation_id = content.getAttribute('data-validation-error-id');
    var validation_message = document.getElementById(validation_id);
    if (content.value.trim() === '') {
        validation_message.classList.remove('d-none');
    }
    else {
        validation_message.classList.add('d-none');
    }
});
