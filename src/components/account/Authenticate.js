import jwtDecode from 'jwt-decode'; // To decode the token

const Auth = {
    token: localStorage.FBIdToken,
    isAuthenticated: false,

    authenticate(){
        if(Auth.token){
            const decode = jwtDecode(Auth.token);
            if(decode.exp * 1000 < Date.now()){ // If the token has expired
                this.isAuthenticated =  false
            }
            else{
                this.isAuthenticated = true
            }
        }
    },

    signout(){
        this.isAuthenticated = false;
        localStorage.clear();
    },

    getAuth(){
        this.authenticate();
        return this.isAuthenticated;
    }

};

export default Auth;