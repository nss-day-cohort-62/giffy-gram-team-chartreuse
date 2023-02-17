import { getUsers, getPosts, getFavorites } from "../data/provider.js";

const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    },
    users: [],
    posts: [],
    
}


export const Footer = () => {
    const users = getUsers()
    const posts = getPosts()
    return `<div class="footer">
    <label class="year" for="year">Posts since </label>
        <select class="year" id="year">
            <option value="1">2023</option>
            <option value="2">2022</option>
            <option value="3">2021</option>
            <option value="4">2020</option>
        </select> 
     ${posts.length}
    <label class="users" for="users">Posts by user </label>
        <select class="users" id="users">
            ${
                users.map(
                    user => {
                        return `<option value="${user.id}">${user.name}</option>`
                        }
                ).join("")
            }
        </select>
        <label class="favorite" for="favorite">Show only favorites </label>
            <input type="radio" name="favorite" value="favorite" />
        </div>
        `
}

const chosenUserPosts = (post) => {
   const users = getUsers()
    let html = ""
    html += `<div class="giffygram__feed"> <h3> ${post.name} </h3> <img class="post__image" src="${post.link}"> <p> ${post.message} </p>`
        for (const user of users) {
            if(user.id === parseInt(post.userId)){
                html += `<p> Posted by ${user.name} on ${post.datePosted} </p>`
            
        }
    }

    return html
}

// applicationElement.addEventListener("click", clickEvent => {
//     const miniMode = document.querySelector("#form")
//     if (clickEvent.target.id === "miniMode") {
//         miniMode.innerHTML = createPost() + postList()
//     }
// })



document.addEventListener("click", clickEvent => {
    const miniMode = document.querySelector("#form")
    const posts = getPosts()
    let chosenUser = null
    if (clickEvent.target.id === "users") {
        chosenUser = parseInt(clickEvent.target.value)
        for (const post of posts) {
            if(chosenUser === parseInt(post.userId)) {
                miniMode.innerHTML = chosenUserPosts(post) + Footer()
            }
        }
    }
    })

// document.addEventListener("change", event => {
//     if (event.target.id === "favorite") {
//         applicationState.feed.displayFavorites = true
//     }
//     if (applicationState.feed.disp) {
//         for (const post of posts) {
//             if(applicationState.feed.chosenUser === post.userId) {
                
//             }
//         }
//     }
// })
