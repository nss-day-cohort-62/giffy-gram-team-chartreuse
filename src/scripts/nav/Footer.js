import { getUsers, getPosts, getFavorites, setOnlyFav, setUser,getChosenUser, getFeed, setDate, getChosenDate } from "../data/provider.js";
import { applicationElement } from "../main.js";

let years = [2023, 2022, 2021, 2020]

export const Footer = () => {
    const users = getUsers()
    const posts = getPosts()
    const chosenUserId = getChosenUser()
    const chosenDate = getChosenDate()
    const feed = getFeed()

    let html = ""
    html += `<div class="footer">
    <label class="year " for="year">Posts Since </label>
        <select class="year footer__item" id="year"> <option value="0">Choose A Year</option>
        ${
            years.map(
                year => {
                    let selected = (year === chosenDate) ? 'selected' : ''
                    return  `<option value="${year}" ${selected}> ${year}</option>`
                }
            ).join("")
        }
        </select>`
        if (chosenUserId){
            let num = 0
            for(const post of posts){
                if(post.userId === chosenUserId){
                    num += 1
                }
            } html += ` ${num}  `
        } else {
            html += ` ${posts.length}  `
        }
    html +=`<label class="users footer__item" for="users">Posts by user </label>
        <select class="users footer__item" id="users"> <option value="0">Choose An Option</option>
            ${
                users.map(
                    user => {
                        let selected = (user.id == chosenUserId) ? 'selected' : ''
                        return `<option value="${user.id}" ${selected}>${user.name}</option>`
                        }
                ).join("")
            }
        </select>`
        if (feed.displayFavorites){
            html +=`<label class="favorite footer__item" for="favorite">Show only favorites </label> <input type="checkbox" name="favorite" checked="checked" value="favorite" />
            </div>
            `
        } else {
            html +=`<label class="favorite footer__item" for="favorite">Show only favorites </label> <input type="checkbox" name="favorite" value="favorite" />
        </div>
        `
        }
            

    return html
}

document.addEventListener("change", event => {
    if (event.target.id === "users") {
        const userId = parseInt(event.target.value)
        setUser(userId)
      
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
    
})

document.addEventListener("change", event => {
    if (event.target.id === "year") {
        const dateId = parseInt(event.target.value)
        setDate(dateId)
      
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
    
})

document.addEventListener("change", event => {
    if (event.target.name === "favorite") {
        setOnlyFav()
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})
 
