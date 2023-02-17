import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
<<<<<<< HEAD
import { fetchUsers, fetchPosts, fetchMessages, fetchFavorites } from "./data/provider.js"
=======
import { fetchFavorites, fetchMessages, fetchPosts, fetchUsers } from "./data/provider.js"
>>>>>>> main


export const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
<<<<<<< HEAD
    fetchUsers()
    .then(() => fetchPosts())
    .then(() => fetchMessages())
    .then(() => fetchFavorites())
    .then(() => {
            const user = parseInt(localStorage.getItem("gg_user"))
=======
    const user = parseInt(localStorage.getItem("gg_user"))
    fetchUsers()
        .then(() => fetchPosts())
        .then(() => fetchMessages())
        .then(() => fetchFavorites())
        .then(() => {
>>>>>>> main

            if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
        })
}

<<<<<<< HEAD
renderApp()

applicationElement.addEventListener("stateChanged", CustomEvent => { renderApp(CustomEvent) })
=======

renderApp()
>>>>>>> main
