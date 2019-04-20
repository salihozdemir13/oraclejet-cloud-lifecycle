define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
        'ojs/ojoffcanvas', 'ojs/ojtable', 'ojs/ojcollectiontabledatasource', 'ojs/ojchart', 'ojs/ojmenu'
    ],
    function (oj, ko, moduleUtils) {
        function ControllerViewModel() {
            var self = this;

            self.loadEnvironmentSettings = function () {
                var environmentSettingsURL = 'environmentSettings' // resource in local backend, the server that served up this static resource to the client
                console.log(location.protocol + "//" + location.hostname + ":" + "3000" + "/environmentSettings")
                if (location.hostname == 'localhost') {
                    environmentSettingsURL = location.protocol + "//" + location.hostname + ":" + "3000" + "/environmentSettings"
                }
                console.log("environmentSettingsURL:" + environmentSettingsURL)
                self.CUSTOMER_PORTAL_URL = "http://144.21.67.138:7792"
                self.LOYALTY_PORTAL_URL = "" // Oracle Cloud URL


                $.get(environmentSettingsURL, function (data) {
                    console.log(`Load was performed from ${environmentSettingsURL}. ${JSON.stringify(data)}`);
                    self.CUSTOMER_PORTAL_URL = data.CUSTOMER_PORTAL_URL || 'http://144.21.67.138:7792'
                    self.LOYALTY_PORTAL_URL = data.LOYALTY_PORTAL_URL || "" // Oracle Cloud URL
                });
            } //loadEnvironmentSettings

            self.globalContext = {}

            self.init = function () {
                self.globalContext.userName = "Not yet logged in";
                self.globalContext.sessionId = `anonymous_${Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)}`
                self.loadEnvironmentSettings()
            }
            $(document).ready(function () {
                self.init();
            })

            self.addProductToBasket = function (selectedProduct) {
                if (self.globalContext.basket == null) {
                    self.globalContext.basket = {}
                }
                if (self.globalContext.basket[selectedProduct] == null) {
                    self.globalContext.basket[selectedProduct] = 1;
                } else {
                    self.globalContext.basket[selectedProduct] = self.globalContext.basket[selectedProduct] + 1;
                }
                console.log("New composition of shopping basket: " + JSON.stringify(self.globalContext.basket))
                self.basketTitle("Your Shopping Basket: " + JSON.stringify(self.globalContext.basket))
            }

            self.sendGlobalContextToIFrame = function (iframe) {
                self.notifyIframe(iframe, {
                    "eventType": "globalContext",
                    "payload": {
                        "globalContext": self.globalContext
                    }
                })
            }

            self.notifyIframe = function (iframe, message) {
                //productsIframe
                var iframe = $(iframe)
                if (iframe && iframe[0]) {
                    var win = iframe[0].contentWindow;
                    var targetOrigin = '*';
                    win.postMessage(message, targetOrigin);
                } else {
                    console.log("Could not send message to iframe at this moment")
                }
            }

            // Media queries for repsonsive layouts
            var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
            self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

            // Router setup
            self.router = oj.Router.rootInstance;
            self.router.configure({
                'dashboard': {
                    label: 'Home',
                    isDefault: true
                },
                'products': {
                    label: 'Products'
                },
                'customers': {
                    label: 'Customers'
                },
                'about': {
                    label: 'About'
                }
            });
            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

            self.moduleConfig = ko.observable({
                'view': [],
                'viewModel': null
            });

            self.loadModule = function () {
                ko.computed(function () {
                    var name = self.router.moduleConfig.name();
                    var viewPath = 'views/' + name + '.html';
                    var modelPath = 'viewModels/' + name;
                    var masterPromise = Promise.all([
                        moduleUtils.createView({
                            'viewPath': viewPath
                        }),
                        moduleUtils.createViewModel({
                            'viewModelPath': modelPath
                        })
                    ]);
                    masterPromise.then(
                        function (values) {
                            self.moduleConfig({
                                'view': values[0],
                                'viewModel': values[1]
                            });
                        }
                    );
                });
            };

            // Navigation setup
            var navData = [{
                    name: 'Home',
                    id: 'dashboard',
                    loggedInOnly: false,
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-home-icon-24'
                },
                {
                    name: 'Products',
                    id: 'products',
                    loggedInOnly: true,
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
                },
                {
                    name: 'Profile',
                    id: 'customers',
                    loggedInOnly: true,
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
                },
                {
                    name: 'About',
                    id: 'about',
                    loggedInOnly: false,
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
                }
            ];
            self.navDataSource = new oj.ArrayTableDataSource(navData, {
                idAttribute: 'id'
            });

            // Drawer
            // Close offcanvas on medium and larger screens
            self.mdScreen.subscribe(function () {
                oj.OffcanvasUtils.close(self.drawerParams);
            });
            self.drawerParams = {
                displayMode: 'push',
                selector: '#navDrawer',
                content: '#pageContent'
            };
            // Called by navigation drawer toggle button and after selection of nav drawer item
            self.toggleDrawer = function () {
                return oj.OffcanvasUtils.toggle(self.drawerParams);
            }
            // Add a close listener so we can move focus back to the toggle button when the drawer closes
            $("#navDrawer").on("ojclose", function () {
                $('#drawerToggleButton').focus();
            });

            // Header
            // Application Name used in Branding Area
            self.appName = ko.observable("Oracle JET App By Volthread");
            self.basketTitle = ko.observable("Your shopping basket");
            // User Info used in Global Navigation area
            self.userLogin = ko.observable("Not yet logged in");
            self.userLoggedIn = ko.observable("N");

            self.enterShopbasket = function (event) {
                console.log("Show Basket")
            }

            //menu item handler
            self.menuItemAction = function (event) {
                var selectedMenuOption = event.target.value || event.path[0].id
                console.log(selectedMenuOption);
                if (selectedMenuOption == "sign") {
                    if (self.userLoggedIn() == "N") {
                        // navigate to the module that allows us to sign in
                        oj.Router.rootInstance.go('customers');
                    } else {
                        // sign off
                        self.userLogin("Not yet logged in");
                        self.userLoggedIn("N");
                        oj.Router.rootInstance.go('dashboard');
                        self.globalContext.userName = "";

                    }

                }
            };

            // Chart Options
            self.stackValue = ko.observable('off');
            self.orientationValue = ko.observable('vertical');

            /* chart data */
            var barSeries = [{
                    name: "Series 1",
                    items: [74, 42, 70, 46]
                },
                {
                    name: "Series 2",
                    items: [50, 58, 46, 54]
                },
                {
                    name: "Series 3",
                    items: [34, 22, 30, 32]
                },
                {
                    name: "Series 4",
                    items: [18, 6, 14, 22]
                }
            ];

            var barGroups = ["Group A", "Group B", "Group C", "Group D"];

            self.barSeriesValue = ko.observableArray(barSeries);
            self.barGroupsValue = ko.observableArray(barGroups);


            // Footer
            function footerLink(name, id, linkTarget) {
                this.name = name;
                this.linkId = id;
                this.linkTarget = linkTarget;
            }

            self.footerLinks = ko.observableArray([
                new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
                new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
            ]);

        }

        return new ControllerViewModel();

    });