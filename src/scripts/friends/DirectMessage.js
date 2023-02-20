import { getMessages, getUsers, getShowPrivateMessage } from "../data/provider.js"
import { NavBar } from "../nav/NavBar.js"

export const MessageList = () => {
    const messages = getMessages()
    const users = getUsers()
    const showForm = getShowPrivateMessage()

    if (!showForm) {
        return ``
    } else {

    let html = `<article class="messageList">
            ${messages.map(message => {
                const sender = users.find(user => message.senderId === user.id)
                let addHTML = 
                `<section class="message" id="message--${message.id}">
                <section class="message__author">From ${sender.name}</section>
                <section class="message__text">${message.text}</section>
                </section>`

                return addHTML
            }).join('')}

            
        </article>`

        return html
    }
}

export const directMessage = () => {
    
    //will want to insert Nav and Footer above and below I think
    return  `
    ${NavBar()}
    <div class="messages">
        ${MessageList()}
    </div>
    
`
}

