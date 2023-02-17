import { getUsers, getPosts, getFavorites, setUser,getChosenUser } from "../data/provider.js";
import { applicationElement } from "../main.js";

export const Footer = () => {
    const users = getUsers()
    const posts = getPosts()
    const chosenUserId = getChosenUser()
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
        <select class="users" id="users"> <option value="0">Choose An Option</option>
            ${
                users.map(
                    user => {
                        let selected = (user.id == chosenUserId) ? 'selected' : ''
                        return `<option value="${user.id}" ${selected}>${user.name}</option>`
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

document.addEventListener("change", event => {
    const miniMode = document.querySelector("#form")
    const posts = getPosts()
    if (event.target.id === "users") {
        const userId = parseInt(event.target.value)
        setUser(userId)
      
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
    
})

/* document.addEventListener("change", event => {
    if (event.target.id === "favorite") {
        applicationState.feed.displayFavorites = true
    }
    if (applicationState.feed.disp) {
        for (const post of posts) {
            if(applicationState.feed.chosenUser === post.userId) {
                
            }
        }
    }
})
 */
