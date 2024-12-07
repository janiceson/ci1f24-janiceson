document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('postButton');
    const hyperfixationInput = document.getElementById('hyperfixationInput');
    const discussionArea = document.getElementById('discussionArea');

    postButton.addEventListener('click', () => {
        const content = hyperfixationInput.value.trim();

        if (!content) {
            alert('Please enter a hyperfixation!');
            return;
        }

        // Create a new post element
        const post = document.createElement('div');
        post.classList.add('post');
        post.textContent = content;

        // Randomize initial position
        const discussionWidth = discussionArea.offsetWidth;
        const discussionHeight = discussionArea.offsetHeight;

        const randomX = Math.random() * (discussionWidth - 200); // Post width ~200px
        const randomY = Math.random() * (discussionHeight - 100); // Post height ~100px

        post.style.left = `${randomX}px`;
        post.style.top = `${randomY}px`;

        // Append post to discussion area
        discussionArea.appendChild(post);

        // Make post draggable
        makeDraggable(post);

        // Clear the input field
        hyperfixationInput.value = '';
    });

    function makeDraggable(element) {
        let offsetX = 0, offsetY = 0, isDragging = false;

        const onMouseDown = (e) => {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;

            // Add event listeners for dragging
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;

            // Calculate new position
            const discussionRect = discussionArea.getBoundingClientRect();
            const newLeft = e.clientX - discussionRect.left - offsetX;
            const newTop = e.clientY - discussionRect.top - offsetY;

            // Constrain within the discussion area
            const maxX = discussionRect.width - element.offsetWidth;
            const maxY = discussionRect.height - element.offsetHeight;

            element.style.left = `${Math.max(0, Math.min(newLeft, maxX))}px`;
            element.style.top = `${Math.max(0, Math.min(newTop, maxY))}px`;
        };

        const onMouseUp = () => {
            isDragging = false;

            // Remove event listeners
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        // Attach mousedown event to make element draggable
        element.addEventListener('mousedown', onMouseDown);
    }
});
