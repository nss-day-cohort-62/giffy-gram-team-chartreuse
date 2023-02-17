import { applicationElement } from "../main.js";
import { setDisplayMessages } from "../data/provider.js";

export const NavBar = () => {
    // Home Icon | Giffygram-h1 -- CreateDM UserDMReceived Logout
    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="/images/pb.png" alt="Giffygram icon" id="logo">
            </div>
            <div class="navigation__item navigation__name">Giffygram</div>
            <div class="navigation__item navigation__search"></div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="/images/fountain-pen.svg" alt="Direct Message">
                <div class="notification__count" id="DMCount">0</div>
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
        `
}


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logo") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logout") {
        localStorage.removeItem("gg_user")
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

document.addEventListener("click", event => {
    if (event.target.id === "DMCount") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

document.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        setDisplayMessages()
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

// Copied from GiffyGram
/*
import { setDisplayMessages } from "./data/provider.js"
import { NavBar } from "./nav/NavBar.js"
import { postList } from "./feed/PostList.js"
import { DirectMessage } from "./friends/DirectMessage.js"
import { MessageForm } from "./MessageForm.js"
import { Footer } from "./Footer.js"

export const GiffyGram = () => {
    return `
        ${NavBar()}
        `
    /* Import modules for:
    a. ${PostList()}
    b. ${MessageForm()}
    C. ${DirectMessage()}
    d. ${Footer()}
}
*/