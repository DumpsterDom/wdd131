document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const currentYear = document.getElementById('current-year');
    const lastModified = document.getElementById('last-modified');

    // Dant & Time
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;

    // Load comments
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    //  comments
    function renderComments() {
        commentsList.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="comment-header">
                    <span>${comment.username}</span>
                    <span>${new Date(comment.timestamp).toLocaleString()}</span>
                </div>
                <div class="comment-body">${comment.text}</div>
                <button class="reply-button" data-index="${index}">Reply</button>
                <form class="reply-form" data-index="${index}">
                    <label for="reply-username-${index}">Your Name</label>
                    <input type="text" id="reply-username-${index}" name="reply-username" required>
                    <label for="reply-text-${index}">Reply</label>
                    <textarea id="reply-text-${index}" name="reply-text" rows="3" required></textarea>
                    <input type="submit" value="Post Reply">
                </form>
                <div class="replies">
                    ${comment.replies ? comment.replies.map(reply => `
                        <div class="reply">
                            <div class="comment-header">
                                <span>${reply.username}</span>
                                <span>${new Date(reply.timestamp).toLocaleString()}</span>
                            </div>
                            <div class="comment-body">${reply.text}</div>
                        </div>
                    `).join('') : ''}
                </div>
            `;
            commentsList.appendChild(commentElement);
        });

        // reply buttons
        document.querySelectorAll('.reply-button').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                const replyForm = document.querySelector(`.reply-form[data-index="${index}"]`);
                replyForm.classList.toggle('active');
            });
        });

        //  reply forms
        document.querySelectorAll('.reply-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const index = form.getAttribute('data-index');
                const username = form.querySelector(`#reply-username-${index}`).value;
                const text = form.querySelector(`#reply-text-${index}`).value;
                if (!comments[index].replies) {
                    comments[index].replies = [];
                }
                comments[index].replies.push({
                    username,
                    text,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('comments', JSON.stringify(comments));
                form.reset();
                form.classList.remove('active');
                renderComments();
            });
        });
    }

    //  Comment  submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('comment-username').value;
        const text = document.getElementById('comment-text').value;
        comments.push({
            username,
            text,
            timestamp: new Date().toISOString(),
            replies: []
        });
        localStorage.setItem('comments', JSON.stringify(comments));
        commentForm.reset();
        renderComments();
    });

    renderComments();
});