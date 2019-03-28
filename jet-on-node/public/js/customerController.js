define(['ojs/ojcore'], function (oj) {

    var CustomerController = {
        serviceURL: 'https://api.myjson.com/bins/m526m',
        //https://api.myjson.com/bins/m526m
        //http://127.0.0.1:7101/restapp/rest/1/Employees

        createCustomerModel: function () {
            var Customer = oj.Model.extend({
                urlRoot: this.serviceURL,
                idAttribute: "EMPLOYEE_ID"
            });

            return new Customer();
        },

        createCustomerCollection: function () {
            var Customers = oj.Collection.extend({
                url: this.serviceURL,
                fetchSize: 10,
                model: this.createCustomerModel()
            });

            return new Customers();
        }

    }

    return CustomerController;
});