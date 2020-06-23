export default class UsersService {

  user = {
    logged_in: false,
    role: 'student',
    email: '',
    password: '',
    user: null 
  }

  handleLogin(data) {
    this.user = {...data};
  }

    /*getBooks() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(this.data);
            //reject(new Error('somethinmg gone wrong'));
          }, 700);
        });
    }*/

}