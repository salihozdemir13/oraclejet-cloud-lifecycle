/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {
  
    function AboutViewModel() {
      var self = this;

      self.connected = function() {
        // Implement if needed
      };

      self.disconnected = function() {
        // Implement if needed
      };

      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    return new AboutViewModel();
  }
);
