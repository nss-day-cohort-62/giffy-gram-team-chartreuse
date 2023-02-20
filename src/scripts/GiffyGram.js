import { createPost, postList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { directMessage, MessageList } from "./friends/DirectMessage.js"
import { MessageForm } from "./message/MessageForm.js"
import { Footer } from "./nav/Footer.js"

const applicationElement = document.querySelector(".giffygram")

export const GiffyGram = () => {

    // Show main main UI
    return `${NavBar()}
    <body>
    <div id="form">
    <div>${directMessage()}</div>
    ${MessageForm()}
    <div class="miniMode" id="miniMode">
    Have a gif to post? </div>
    ${postList()}
    </div>
    
    </body>
    ${Footer()}`
    
}