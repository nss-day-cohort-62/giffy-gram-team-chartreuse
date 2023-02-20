import { getPosts, getFavorites, getUsers, savePost, getFeed, getShowFavorites } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

export const createPost = () => {
    let html = `<div class="postGif"> 
        <input class="newPost__input" id="title" type="text" name="title" placeholder="Title"/> 
        <input class="newPost__input" id="url" type="text" name="url" placeholder="URL of gif"/>
        <textarea class="newPost__input" id="story" rows="10" cols ="40" name="story" placeholder="story"> </textarea>
        <button id="newPost_submit">Save</button>
        <button id="newPost_cancel">Cancel</button>
        </div>`

    return html
}
const posts = getPosts()


export const postList = () => {
    let posts = getPosts()
    const users = getUsers()
    const feed = getFeed()
    let favorites = getFavorites()
    let html = ""

    if (feed.chosenUser){
       posts = posts.filter(post => {
            return post.userId === feed.chosenUser
        })
    }

    if (feed.setDate){
        posts = posts.filter(post => {
            return post.year === feed.setDate
        })
    }

    if (feed.displayFavorites){
        posts = favorites.filter(favorite => {
             return favorite.userId === parseInt(localStorage.getItem("gg_user"))
         })
     }

    for (const post of posts){
        html += `<div class="giffygram__feed"> <h3> ${post.name} </h3> <img class="post__image" src="${post.link}"> <p> ${post.message} </p>`
        for (const user of users) {
            if(user.id === parseInt(post.userId)){
                html += `<p> Posted by ${user.name} on ${post.datePosted} </p> <img class="post__remark" src="../images/favorite-star-blank.svg" /> 
                <img class="post__remark" src="../images/favorite-star-blank.svg" />` 
                if(user.id === localStorage.getItem("gg_user")) {
                    
                   `
                   </div>`
                }
                
            }
        }
    }
return html
    
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
