// This is used to authenticate the user
// For ease of working, just set the isAuthenticated to true fo development but this will render everything from the transaction page only
const Auth = {
    isAuthenticated: false,

    authenticate(){
        this.isAuthenticated = true;
    },

    signout(){
        this.isAuthenticated = false;
    },

    getAuth(){
        return this.isAuthenticated;
    }

};

export default Auth;