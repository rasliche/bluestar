console.log("Imported register-form.js to the Register page.")

new Vue({
    el: '#register-form',
    data(){
      return {
        userData: {
          email: '',
          password: '',
          passwordMatch: ''
        },
        formSubmitted: false,
        formErrors: []
      }
    },
    methods: {
      submit() {
        console.log(this.userData)
        this.formSubmitted = true
      }
    }
  })