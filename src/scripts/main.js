import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchFavorites, fetchMessages, fetchPosts, fetchUsers } from "./data/provider.js"


const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    fetchUsers()
    .then(() => fetchFavorites())
    .then(() => fetchMessages())
    .then(() => fetchPosts())
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

applicationElement.addEventListener(
    "stateChanged",
    CustomEvent => {
        renderApp()
    }
)
