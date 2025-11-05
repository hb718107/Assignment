export var AuthStatus;
(function (AuthStatus) {
    AuthStatus[AuthStatus["LOGGED_IN"] = 0] = "LOGGED_IN";
    AuthStatus[AuthStatus["LOGGED_OUT"] = 1] = "LOGGED_OUT";
})(AuthStatus || (AuthStatus = {}));
export class User {
    constructor(id, username, email, password, authStatus = AuthStatus.LOGGED_OUT) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authStatus = authStatus;
    }
    getUsername() {
        return this.username;
    }
    login(password) {
        if (this.password === password) {
            this.authStatus = AuthStatus.LOGGED_IN;
            console.log(`${this.username} logged in successfully`);
            return true;
        }
        else {
            console.log("Incorrect password!");
            return false;
        }
    }
    logout() {
        this.authStatus = AuthStatus.LOGGED_OUT;
        console.log(`${this.username} logged out`);
    }
}
export class Tweet {
    constructor(id, content, author) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
    displayTweet() {
        return `${this.content} by ${this.author.getUsername()}`;
    }
}
export class TweetSystem {
    constructor() {
        this.tweets = [];
    }
    postTweet(content, author) {
        if (author.authStatus !== AuthStatus.LOGGED_IN) {
            console.log("User must be logged in to post a tweet.");
            return;
        }
        const tweet = new Tweet(this.tweets.length + 1, content, author);
        this.tweets.push(tweet);
    }
    getAllTweets() {
        return this.tweets;
    }
    getTweetsByUser(user) {
        return this.tweets.filter(tweet => tweet.author.id === user.id);
    }
    deleteTweet(tweetId, user) {
        if (user.authStatus !== AuthStatus.LOGGED_IN) {
            console.log("User must be logged in to delete a tweet.");
            return false;
        }
        const tweetIndex = this.tweets.findIndex(tweet => tweet.id === tweetId && tweet.author.id === user.id);
        if (tweetIndex !== -1) {
            this.tweets.splice(tweetIndex, 1);
            return true;
        }
        console.log("Unauthorized action or tweet not found.");
        return false;
    }
}
