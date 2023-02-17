import { getPosts, getFavorites, getUsers, savePost } from "../data/provider.js"

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

export const postList = () => {
    const posts = getPosts()
    const users = getUsers()
    let html = ""

    for (const post of posts){
        html += `<div class="giffygram__feed"> <h3> ${post.name} </h3> <img class="gif" src="${post.link}"> <p> ${post.message} </p>`
        for (const user of users) {
            if(user.id === parseInt(post.userId)){
                html += `<p> Posted by ${user.name} on ${post.datePosted} </p>`
                if(user.id ===localStorage.getItem("gg_user")) {
                   ` </div>`
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

        const dataToSend = {
            name: title, 
            link: gifLink, 
            message: story, 
            datePosted: new Date().toLocaleDateString(),
            userId: localStorage.getItem("gg_user")

        }
        savePost(dataToSend)
        
    }

})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost_cancel") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})
