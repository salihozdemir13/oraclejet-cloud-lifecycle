/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'customerController', 'jquery', 'ojs/ojmodel', 'ojs/ojbutton',
        'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojdatetimepicker'],
    function (oj, ko, customerController) {

        function EditCustomerViewModel() {
            var self = this;
            self.customerModel = ko.observable();
            self.list = ko.observable();

            self.initialize = function (params) {
                self.customerModel(customerController.createCustomerModel());
                self.list = customerController.createCustomerCollection();
            };

            self.goBack = function () {
                oj.Router.rootInstance.store(null);
                oj.Router.rootInstance.go("customers");
            };

            self.saveCustomer = function () {
                self.list.create(self.customerModel().toJSON(), {
                    //contentType: 'application/vnd.oracle.adf.resourceitem+json',
                    success: function (response) {
                        oj.Router.rootInstance.store(-1);
                        oj.Router.rootInstance.go("customers");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("Update error: ", errorThrown);
                    }
                });
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
