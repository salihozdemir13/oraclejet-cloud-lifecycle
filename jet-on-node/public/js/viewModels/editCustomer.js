/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'customerController', 'jquery', 'ojs/ojmodel', 'ojs/ojbutton',
        'ojs/ojinputtext', 'ojs/ojinputnumber'],
    function (oj, ko, customerController) {

        function EditCustomerViewModel() {
            var self = this;
            self.customerModel = ko.observable();
            self.saveBtnBusyCheck = ko.observable(false);
            console.log("Fetching successed!");

            self.initialize = function (params) {
                console.log("Edit Customer initialize successed!");

                var customerId = oj.Router.rootInstance.retrieve();

                self.customerModel(customerController.createCustomerModel());
                self.customerModel().id = customerId;

                self.customerModel().fetch({
                    success: function (model) {
                        self.customerModel(model);
                        console.log("Fetching successed! Customer id is ", customerId);
                    },
                    error: function (model) {
                        console.log("Fetch error: ", model);
                    }
                });
            };

            self.goBack = function () {
                //oj.Router.rootInstance.store(null);
                oj.Router.rootInstance.go("customers");
            };

            self.saveCustomer = function () {
                var btnSave = document.querySelector("#btnSave");
                var busyContext = oj.Context.getContext(btnSave).getBusyContext();

                if (busyContext.isReady()) {
                    var options = {"description": "#Calling asynchronous REST endpoint"};
                    var resolve = busyContext.addBusyState(options);
                    self.saveBtnBusyCheck(!busyContext.isReady());

                    self.customerModel().save(self.customerModel().toJSON(), {
                        //contentType: 'application/vnd.oracle.adf.resourceitem+json',
                        patch: 'patch',
                        success: function (response) {

                            resolve();

                            busyContext.whenReady().then(function () {
                                self.saveBtnBusyCheck(!busyContext.isReady());
                            });

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Update error: ", errorThrown);

                            resolve();

                            busyContext.whenReady().then(function () {
                                self.saveBtnBusyCheck(!busyContext.isReady());
                            });
                        }
                    });
                }
            };

            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additionaly available methods.

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

        return new EditCustomerViewModel();
    }
);
