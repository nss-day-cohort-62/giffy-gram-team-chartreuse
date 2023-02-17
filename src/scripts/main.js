import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchUsers, fetchPosts, fetchMessages, fetchFavorites } from "./data/provider.js"


export const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    fetchUsers()
    .then(() => fetchPosts())
    .then(() => fetchMessages())
    .then(() => fetchFavorites())
    .then(() => {
            const user = parseInt(localStorage.getItem("gg_user"))

            if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
        })
}

renderApp()

applicationElement.addEventListener("stateChanged", CustomEvent => { renderApp(CustomEvent) })