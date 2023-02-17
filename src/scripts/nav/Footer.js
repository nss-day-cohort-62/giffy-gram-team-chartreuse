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



document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "users") {
        applicationState.feed.chosenUser = clickEvent.target.value
    }
    if (applicationState.feed.chosenUser != null) {
        for (const post of posts) {
            if(applicationState.feed.chosenUser === post.userId) {

            }
        }
    }
})

document.addEventListener("change", event => {
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
