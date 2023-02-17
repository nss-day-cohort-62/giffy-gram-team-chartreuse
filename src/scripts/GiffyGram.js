import { setDisplayMessages } from "./data/provider.js"
import { NavBar } from "./nav/NavBar.js"
/*
import { postList } from "./feed/PostList.js"
import { DirectMessage } from "./friends/DirectMessage.js"
import { MessageForm } from "./MessageForm.js"
import { Footer } from "./Footer.js"
*/

export const GiffyGram = () => {
    return `
        ${NavBar()}
        `
    /* Import modules for:
    a. ${PostList()}
    b. ${MessageForm()}
    C. ${DirectMessage()}
    d. ${Footer()}
    */
}