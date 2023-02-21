import { getPosts, getFavorites, getUsers, savePost, getFeed, getShowFavorites, saveFavorite, deletePost } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

export const createPost = () => {
    let html = `<div class="newPost"> 
        <div><input class="newPost__input" id="title" type="text" name="title" placeholder="Title"/></div>
        <div><input class="newPost__input" id="url" type="text" name="url" placeholder="URL of gif"/></div>
        <textarea name="newPost__input" class="newPost__input newPost__description" id="story" rows="10" cols ="40" name="story" placeholder="story"> </textarea>
        <button id="newPost_submit">Save</button>
        <button id="newPost_cancel">Cancel</button>
        </div>`

    return html
}

export const postList = () => {
    let posts = getPosts()
    const users = getUsers()
    const feed = getFeed()
    const favorites = getFavorites()
    let html = ``

    if (feed.chosenUser) {
        posts = posts.filter(post => {
            return post.userId === feed.chosenUser
        })
    }

    if (feed.setDate) {
        posts = posts.filter(post => {
            return post.year === feed.setDate
        })
    }

    if (feed.displayFavorites) {
        posts = favorites.filter(favorite => {
            return favorite.userId === parseInt(localStorage.getItem("gg_user"))
        })
    }

    for (const post of posts) {
        const localGiffyUser = localStorage.getItem("gg_user")
        const giffyGramUser = JSON.parse(localGiffyUser)
        let deleteHTML = ``
        let favoriteHTML = `favorite-star-blank.svg`
        html += `<section class="post">
        <h2 class="post__title">${post.name}</h2>
        <img class="post__image" src="${post.link}">
        <div class="post__description"> ${post.message}</div>`
        for (const user of users) {
            if (post.userId === giffyGramUser) {
                deleteHTML = `<img id="post__delete--${post.id}" class="actionIcon" src="../images/block.svg" />`
            }
            if (user.id === parseInt(post.userId)) {
                html += `<div class="userPost">Posted by ${user.name} on ${post.datePosted}</div>
                <div class="post__actions"><img class="actionIcon" id="favorite--${post.id}" src="../images/${favoriteHTML}" />${deleteHTML}</div></section>`
            }
            for (const favorite of favorites) {
                if (favorite.postId === post.id && favorite.userId === giffyGramUser) {
                    favoriteHTML = `favorite-star-yellow.svg`
                }
        }
        }
    }
    return html + `</div>`
}

applicationElement.addEventListener("click", clickEvent => {
    const miniMode = document.querySelector("#form")
    if (clickEvent.target.id === "miniMode") {
        miniMode.innerHTML = createPost() + postList()
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost_submit") {
        const title = document.querySelector("input[name='title']").value
        const gifLink = document.querySelector("input[id='url']").value
        const story = document.querySelector("textarea[id='story']").value
        const localGiffyUser = localStorage.getItem("gg_user")
        const giffyGramUser = JSON.parse(localGiffyUser)

        const dataToSend = {
            name: title,
            link: gifLink,
            message: story,
            datePosted: new Date().toLocaleDateString(),
            year: new Date().getFullYear(),
            userId: giffyGramUser
        }
        savePost(dataToSend)

    }

})

/* applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost_submit") {
        const title = document.querySelector("input[name='title']").value
        const gifLink = document.querySelector("input[id='url']").value
        const story = document.querySelector("textarea[id='story']").value

        const dataToSend = {
            name: title, 
            link: gifLink, 
            message: story, 
            datePosted: new Date().toLocaleDateString(),
            userId: localStorage.getItem("gg_user")

        }
        savePost(dataToSend)
        
    }

}) */

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost_cancel") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("favorite--")) {
        const selectedUserId = localStorage.getItem("gg_user")
        const [, selectedPostId] = clickEvent.target.id.split("--")

        const userDataToAPI = {
            userId: parseInt(selectedUserId),
            postId: parseInt(selectedPostId)
        }

        saveFavorite(userDataToAPI)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("post__delete--")) {
        const [, selectedPostId] = clickEvent.target.id.split("--")
        deletePost(parseInt(selectedPostId))
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})