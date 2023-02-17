import { createPost, postList } from "./feed/PostList.js"


const applicationElement = document.querySelector(".giffygram")
import { directMessage } from "./friends/DirectMessage.js"

export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>
    <div id="form">
    <div class="miniMode" id="miniMode">
    Have a gif to post? </div>
    <div>
    ${postList()}
    
        ${directMessage()}`
    
}

