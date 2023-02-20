const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")

const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false, 
        setDate: null
    },
    users: [],
    posts: [],
    messages: [],
    showMessageForm: false,
    showPrivateMessages: false
    
}

export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.users = data
            }
        )
}

export const getUsers = () => {
    return applicationState.users.map(user => ({...user}))
}

export const getShowForm = () => {
    return applicationState.showMessageForm
}

export const getShowPrivateMessage = () => {
    return applicationState.showPrivateMessages
}

export const setShowForm = (showForm) => {
    applicationState.showMessageForm = showForm
    applicationElement.dispatchEvent(new CustomEvent('stateChanged'))
}

export const getChosenUser =() => {
    return applicationState.feed.chosenUser
}

export const toggleShowForm = () => {
    applicationState.showMessageForm = !applicationState.showMessageForm
    applicationElement.dispatchEvent(new CustomEvent('stateChanged'))
}

export const toggleShowPrivateMessage = () => {
    applicationState.showPrivateMessages = !applicationState.showPrivateMessages
    applicationElement.dispatchEvent(new CustomEvent('stateChanged'))
}

export const setUser = (id) => {
    applicationState.feed.chosenUser = id
    applicationElement.dispatchEvent(new CustomEvent('stateChanged'))
}

export const getChosenDate = () => {
    return applicationState.feed.setDate
}

export const setDate = (id) => {
    applicationState.feed.setDate = id
    applicationElement.dispatchEvent(new CustomEvent('stateChanged'))
}

export const setOnlyFav = () => {
    applicationState.feed.displayFavorites = !applicationState.feed.displayFavorites

    console.log(applicationState.feed.displayFavorites)
}

export const getFeed = () => {
    return applicationState.feed
}

export const getShowFavorites = () => {
    return applicationState.feed.displayFavorites
}

export const chooseFavoriteOnly = (choice) => {
    if (choice) {
        applicationState.feed.chosenUser = null
    } else {
        applicationState.feed.displayFavorites = choice
    }
}

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.posts = data
            }
        )
}

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}))
}

export const deletePost = (id) => {
    return fetch(`${apiURL}/posts/${id}`, { method: "DELETE" })
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const savePost = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${apiURL}/posts`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const fetchFavorites = () => {
    return fetch(`${apiURL}/favorites`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.favorites = data
            }
        )
}

export const getFavorites = () => {
    return applicationState.favorites.map(favorite => ({...favorite}))
}

export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.messages = data
            }
        )
}

export const getMessages = () => {
    return applicationState.messages.map(message => ({...message}))
}

export const deleteMessages = (id) => {
    return fetch(`${apiURL}/messages/${id}`, { method: "DELETE" })
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveMessage = (message) => {
    return fetch(`${apiURL}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => response.json())
    .then(() => {
        return fetchMessages()
    })
    .then(() => {
       setShowForm(false)
    })
    
}

export const setMessage = () => {
    applicationState.feed.displayMessages = true
}

export const clear = () => {
    applicationState.feed.chosenUser = null
    applicationState.feed.displayFavorites = false
    applicationState.feed.displayMessages = false
}

