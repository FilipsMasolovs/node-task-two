(function () {
    const getAllComments = async () => {
        await fetch('http://localhost:5000/comments').then(function (response) {
            return response.json();
        }).then(function (data) {
            data.data.forEach((comment) => {
                let div = document.createElement('div');
                div.innerHTML = `<div class='comment'><p>${comment.comment}</p><div><span>by: <h4>${comment.name}</h4></span></div></div>`
                const commentsContainer = document.getElementById("comments");
                commentsContainer.appendChild(div);
            })
        }).catch(function () {
            console.log("Something went wrong.");
        });
    }
    getAllComments()
})();