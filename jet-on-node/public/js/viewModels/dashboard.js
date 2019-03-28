define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart'],
  function (oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      // programmatic navigation to the Products tab
      self.enterCatalog = function () {
        oj.Router.rootInstance.go('products');
      }

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

    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);