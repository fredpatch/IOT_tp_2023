const btnManual = document.querySelector('#btn-manual');
const btnAuto = document.querySelector('#btn-auto');
const baseUri = 'http://localhost:3000';

//Auto and manual button operation handling
function init(){
    /*checks whether both btnAuto and btnManual are truthy values before continuing with the rest of the code
    If either variable is falsy, the code execution will stop and return from the function.*/
    if (!btnAuto || !btnManual) return;

    //set a listener to the button Auto
    btnAuto.addEventListener('click', function (){

        /* classList.add() method changes the appearance of 
        the button to indicate that it is active.*/
        btnAuto.classList.add('active');
        if (btnManual.classList.contains('active')){

            /*classList.remove() method ensure that only
            one button has the 'active' class at any given time*/
            btnManual.classList.remove('active');
        }

        /* Use the fetch() method to make a POST request to a URL that is constructed
         using the baseUri variable and the path /auto. 
        This is an asynchronous operation, so the code uses a chain of then() 
        and catch() methods to handle the response from the server. */
        fetch(baseUri + '/auto',
            {
                method: 'POST',
            })
            .then((res) => {
                return res.text();
            })
            .then((data) => console.log(data))
            .catch(function (err) {
                console.log(err)
            });
    });

    //set a listener to the button Manual
    btnManual.addEventListener('click', function (){
        btnManual.classList.add('active');
        if (btnAuto.classList.contains('active')){
            btnAuto.classList.remove('active');
        }

        fetch(baseUri+'/manual',
            {
                method: 'POST',
            })
            .then((res) => {
                return res.text();
            })
            .then((data) => console.log(data))
            .catch(function (err) {
                console.log(err)
            });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    init();
});
