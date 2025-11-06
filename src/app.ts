 export type Password = string|number;
 export type TweetType = string;
 export enum AuthStatus{
    LOGGED_IN,
    LOGGED_OUT
}
export interface IUser {
  id: number;
  username: string;
  email: string;
  password: Password;
  authStatus: AuthStatus;
  getUsername(): string;
  login(password: Password): boolean;
  logout(): void;
}

 export class User implements IUser {
    constructor(
        public id : number, 
        public username : string, 
        public email : string, 
        public password : Password,
        public authStatus: AuthStatus = AuthStatus.LOGGED_OUT
    ) {}

    getUsername(): string {
        return this.username;
    }

    login(password: Password): boolean {
        if (this.password === password) {
            this.authStatus = AuthStatus.LOGGED_IN;
            console.log(`${this.username} logged in successfully`);
            return true;
        }else{
        console.log("Incorrect password!");
        return false;
        }
    }

    logout(): void {
        this.authStatus = AuthStatus.LOGGED_OUT;
        console.log(`${this.username} logged out`);
    }
}

export class Tweet{
    constructor(public id : number, public content : TweetType, public author : User){}

    displayTweet(): string {
        return `${this.content} by ${this.author.getUsername()}`;
    }
}

export class TweetSystem {
    private tweets: Tweet[] = [];

    postTweet(content: TweetType, author: User): void {
        if (author.authStatus !== AuthStatus.LOGGED_IN) {
            console.log("User must be logged in to post a tweet.");
            return;
        }
        const tweet = new Tweet(this.tweets.length + 1, content, author);
        this.tweets.push(tweet);
    }

    getAllTweets(): Tweet[] {
        return this.tweets;
    }

    getTweetsByUser(user: User): Tweet[] {
        return this.tweets.filter(tweet => tweet.author.id === user.id);
    }

    deleteTweet(tweetId: number, user: User): boolean {
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

