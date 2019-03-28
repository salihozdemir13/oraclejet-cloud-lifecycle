define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext', 'ojs/ojbutton'],
    function (oj, ko, $) {

        function CustomersViewModel() {
            var self = this;

            function loginAsUser(username, customer, token) {
                var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
                rootViewModel.userLogin(customer.title + " " + customer.firstName + " " + customer.lastName);
                //rootViewModel.userLogin(username);
                rootViewModel.userLoggedIn("Y");
                rootViewModel.globalContext.userName = username
                rootViewModel.globalContext.token = token
                console.log("Set customer on global context " + customer)
                rootViewModel.globalContext.customer = customer

                return true;
            }

            self.init = function () {

                window.addEventListener("message", function (event) {
                        console.log("Parent (customers.js) receives message from iframe " + event);
                        console.log("Payload =  " + JSON.stringify(event.data));
                        if (event.data.eventType == 'userSignInEvent' && event.data.payload) {
                            var username = event.data.payload.username;
                            var customer = event.data.payload.customer;
                            var token = event.data.payload.token;
                            customer.customerIdentifier = customer._id
                            console.log("log in for user: " + username);
                            loginAsUser(username, customer, token)
                        }
                        if (event.data.childHasLoaded) {
                            self.sendGlobalContext();
                        }
                    },
                    false);
            } //init
            $(document).ready(function () {
                self.init();
            })

            self.sendGlobalContext = function () {
                var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
                rootViewModel.sendGlobalContextToIFrame("#customersIframe")

            }

            self.handleActivated = function (info) {
                // Implement if needed
            };

            self.handleAttached = function (info) {
                // Implement if needed
            };

            self.handleBindingsApplied = function (info) {
                // Implement if needed
            };

            self.handleDetached = function (info) {
                // Implement if needed
            };
        }

        return new CustomersViewModel();
    }
);