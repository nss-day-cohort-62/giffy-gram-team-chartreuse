import { getUsers, saveMessage} from "../data/provider.js";

let message = true
const applicationElement = document.querySelector('.giffygram')

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'directMessageIcon') {
        message = !message
    }
})

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'directMessage__submit') {
        let recipient = document.querySelector('select[name="message"]').value 
        let messages = document.querySelector('input[name="message"]').value
        let [, recipientId] = recipient.split("--")

        const messageObject = {
            userId: parseInt(localStorage.getItem('gg_user')),
            recipientId: parseInt(recipientId),
            message: messages
        }
        saveMessage(messageObject)
    }
})

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'directMessage__close') {
        message = true
        applicationElement.dispatchEvent(new CustomEvent('stateChanged'))
    }
})

export const MessageForm = () => {
    let users = getUsers()
    let html = ''
    if (!message) {
        return ``
    } else {
        html +=
        `<article class="directMessage">
            <h2>Direct Message</h2>
            <section>Recipient:
                <select name="directMessage__userSelect" class="message__input">
                    <option>Choose Recipient</option>
                    
                    ${ users.map(user => `<option value="recipient--${user.id}">${user.name}</option>"`).join('')}
    
                </select>
            </section>
        

        <section>
        <label for="message">Message</label>
        <input name="message" class="message__input" type="text" placeholder="Message..." />
        </section>
        
        <button id="directMessage__submit">Save</button>
        <button id="directMessage__cancel">Cancel</button>
        <button id="directMessage__close>X</button>
        
        </article>`

}
return html
}
