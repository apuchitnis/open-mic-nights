// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"markerclusterer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @name MarkerClusterer for Google Maps v3
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 */

/**
 * @license
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'imagePath': (string) The base URL where the images representing
 *                  clusters will be found. The full URL will be:
 *                  {imagePath}[1-5].{imageExtension}
 *                  Default: '../images/m'.
 *     'imageExtension': (string) The suffix for images URL representing
 *                       clusters will be found. See _imagePath_ for details.
 *                       Default: 'png'.
 *     'averageCenter': (boolean) Whether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
var MarkerClusterer =
/*#__PURE__*/
function () {
  function MarkerClusterer(map, opt_markers, opt_options) {
    _classCallCheck(this, MarkerClusterer);

    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = map;
    /**
     * The marker cluster image path.
     *
     * @type {string}
     * @private
     */

    this.MARKER_CLUSTER_IMAGE_PATH_ = '../images/m';
    /**
     * The marker cluster image path.
     *
     * @type {string}
     * @private
     */

    this.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';
    /**
    * @type {Array.<google.maps.Marker>}
    * @private
    */

    this.markers_ = [];
    /**
     *  @type {Array.<Cluster>}
     */

    this.clusters_ = [];
    this.sizes = [53, 56, 66, 78, 90];
    /**
     * @private
     */

    this.styles_ = [];
    /**
     * @type {boolean}
     * @private
     */

    this.ready_ = false;
    var options = opt_options || {};
    /**
     * @type {number}
     * @private
     */

    this.gridSize_ = options['gridSize'] || 60;
    /**
     * @private
     */

    this.minClusterSize_ = options['minimumClusterSize'] || 2;
    /**
     * @type {?number}
     * @private
     */

    this.maxZoom_ = options['maxZoom'] || null;
    this.styles_ = options['styles'] || [];
    /**
     * @type {string}
     * @private
     */

    this.imagePath_ = options['imagePath'] || this.MARKER_CLUSTER_IMAGE_PATH_;
    /**
     * @type {string}
     * @private
     */

    this.imageExtension_ = options['imageExtension'] || this.MARKER_CLUSTER_IMAGE_EXTENSION_;
    /**
     * @type {boolean}
     * @private
     */

    this.zoomOnClick_ = true;

    if (options['zoomOnClick'] != undefined) {
      this.zoomOnClick_ = options['zoomOnClick'];
    }
    /**
     * @type {boolean}
     * @private
     */


    this.averageCenter_ = false;

    if (options['averageCenter'] != undefined) {
      this.averageCenter_ = options['averageCenter'];
    }

    this.setupStyles_();
    this.setMap(map);
    /**
     * @type {number}
     * @private
     */

    this.prevZoom_ = this.map_.getZoom(); // Add the map event listeners

    var that = this;
    google.maps.event.addListener(this.map_, 'zoom_changed', function () {
      // Determines map type and prevent illegal zoom levels
      var zoom = that.map_.getZoom();
      var minZoom = that.map_.minZoom || 0;
      var maxZoom = Math.min(that.map_.maxZoom || 100, that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom);
      zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

      if (that.prevZoom_ != zoom) {
        that.prevZoom_ = zoom;
        that.resetViewport();
      }
    });
    google.maps.event.addListener(this.map_, 'idle', function () {
      that.redraw();
    }); // Finally, add the markers

    if (opt_markers && (opt_markers.length || Object.keys(opt_markers).length)) {
      this.addMarkers(opt_markers, false);
    }
  }
  /**
   * Extends a objects prototype by anothers.
   *
   * @param {Object} obj1 The object to be extended.
   * @param {Object} obj2 The object to extend with.
   * @return {Object} The new extended object.
   * @ignore
   */


  _createClass(MarkerClusterer, [{
    key: "extend",
    value: function extend(obj1, obj2) {
      return function (object) {
        for (var property in object.prototype) {
          this.prototype[property] = object.prototype[property];
        }

        return this;
      }.apply(obj1, [obj2]);
    }
    /**
     * Implementaion of the interface method.
     * @ignore
     */

  }, {
    key: "onAdd",
    value: function onAdd() {
      this.setReady_(true);
    }
  }, {
    key: "draw",

    /**
     * Implementaion of the interface method.
     * @ignore
     */
    value: function draw() {}
  }, {
    key: "setupStyles_",

    /**
     * Sets up the styles object.
     *
     * @private
     */
    value: function setupStyles_() {
      if (this.styles_.length) {
        return;
      }

      for (var i = 0, size; size = this.sizes[i]; i++) {
        this.styles_.push({
          url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
          height: size,
          width: size
        });
      }
    }
    /**
     *  Fit the map to the bounds of the markers in the clusterer.
     */

  }, {
    key: "fitMapToMarkers",
    value: function fitMapToMarkers() {
      var markers = this.getMarkers();
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
      }

      this.map_.fitBounds(bounds);
    }
    /**
     *  Sets the styles.
     *
     *  @param {Object} styles The style to set.
     */

  }, {
    key: "setStyles",
    value: function setStyles(styles) {
      this.styles_ = styles;
    }
    /**
     *  Gets the styles.
     *
     *  @return {Object} The styles object.
     */

  }, {
    key: "getStyles",
    value: function getStyles() {
      return this.styles_;
    }
    /**
     * Whether zoom on click is set.
     *
     * @return {boolean} True if zoomOnClick_ is set.
     */

  }, {
    key: "isZoomOnClick",
    value: function isZoomOnClick() {
      return this.zoomOnClick_;
    }
    /**
     * Whether average center is set.
     *
     * @return {boolean} True if averageCenter_ is set.
     */

  }, {
    key: "isAverageCenter",
    value: function isAverageCenter() {
      return this.averageCenter_;
    }
    /**
     *  Returns the array of markers in the clusterer.
     *
     *  @return {Array.<google.maps.Marker>} The markers.
     */

  }, {
    key: "getMarkers",
    value: function getMarkers() {
      return this.markers_;
    }
    /**
     *  Returns the number of markers in the clusterer
     *
     *  @return {Number} The number of markers.
     */

  }, {
    key: "getTotalMarkers",
    value: function getTotalMarkers() {
      return this.markers_.length;
    }
    /**
     *  Sets the max zoom for the clusterer.
     *
     *  @param {number} maxZoom The max zoom level.
     */

  }, {
    key: "setMaxZoom",
    value: function setMaxZoom(maxZoom) {
      this.maxZoom_ = maxZoom;
    }
    /**
     *  Gets the max zoom for the clusterer.
     *
     *  @return {number} The max zoom level.
     */

  }, {
    key: "getMaxZoom",
    value: function getMaxZoom() {
      return this.maxZoom_;
    }
    /**
     *  The function for calculating the cluster icon image.
     *
     *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
     *  @param {number} numStyles The number of styles available.
     *  @return {Object} A object properties: 'text' (string) and 'index' (number).
     *  @private
     */

  }, {
    key: "calculator_",
    value: function calculator_(markers, numStyles) {
      var index = 0;
      var count = markers.length;
      var dv = count;

      while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
      }

      index = Math.min(index, numStyles);
      return {
        text: count,
        index: index
      };
    }
    /**
     * Set the calculator function.
     *
     * @param {function(Array, number)} calculator The function to set as the
     *     calculator. The function should return a object properties:
     *     'text' (string) and 'index' (number).
     *
     */

  }, {
    key: "setCalculator",
    value: function setCalculator(calculator) {
      this.calculator_ = calculator;
    }
    /**
     * Get the calculator function.
     *
     * @return {function(Array, number)} the calculator function.
     */

  }, {
    key: "getCalculator",
    value: function getCalculator() {
      return this.calculator_;
    }
    /**
     * Add an array of markers to the clusterer.
     *
     * @param {Array.<google.maps.Marker>} markers The markers to add.
     * @param {boolean=} opt_nodraw Whether to redraw the clusters.
     */

  }, {
    key: "addMarkers",
    value: function addMarkers(markers, opt_nodraw) {
      if (markers.length) {
        for (var i = 0, marker; marker = markers[i]; i++) {
          this.pushMarkerTo_(marker);
        }
      } else if (Object.keys(markers).length) {
        for (var marker in markers) {
          this.pushMarkerTo_(markers[marker]);
        }
      }

      if (!opt_nodraw) {
        this.redraw();
      }
    }
    /**
     * Pushes a marker to the clusterer.
     *
     * @param {google.maps.Marker} marker The marker to add.
     * @private
     */

  }, {
    key: "pushMarkerTo_",
    value: function pushMarkerTo_(marker) {
      marker.isAdded = false;

      if (marker['draggable']) {
        // If the marker is draggable add a listener so we update the clusters on
        // the drag end.
        var that = this;
        google.maps.event.addListener(marker, 'dragend', function () {
          marker.isAdded = false;
          that.repaint();
        });
      }

      this.markers_.push(marker);
    }
    /**
     * Adds a marker to the clusterer and redraws if needed.
     *
     * @param {google.maps.Marker} marker The marker to add.
     * @param {boolean=} opt_nodraw Whether to redraw the clusters.
     */

  }, {
    key: "addMarker",
    value: function addMarker(marker, opt_nodraw) {
      this.pushMarkerTo_(marker);

      if (!opt_nodraw) {
        this.redraw();
      }
    }
    /**
     * Removes a marker and returns true if removed, false if not
     *
     * @param {google.maps.Marker} marker The marker to remove
     * @return {boolean} Whether the marker was removed or not
     * @private
     */

  }, {
    key: "removeMarker_",
    value: function removeMarker_(marker) {
      var index = -1;

      if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
      } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
          if (m == marker) {
            index = i;
            break;
          }
        }
      }

      if (index == -1) {
        // Marker is not in our list of markers.
        return false;
      }

      marker.setMap(null);
      this.markers_.splice(index, 1);
      return true;
    }
    /**
     * Remove a marker from the cluster.
     *
     * @param {google.maps.Marker} marker The marker to remove.
     * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
     * @return {boolean} True if the marker was removed.
     */

  }, {
    key: "removeMarker",
    value: function removeMarker(marker, opt_nodraw) {
      var removed = this.removeMarker_(marker);

      if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
      } else {
        return false;
      }
    }
    /**
     * Removes an array of markers from the cluster.
     *
     * @param {Array.<google.maps.Marker>} markers The markers to remove.
     * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
     */

  }, {
    key: "removeMarkers",
    value: function removeMarkers(markers, opt_nodraw) {
      // create a local copy of markers if required
      // (removeMarker_ modifies the getMarkers() array in place)
      var markersCopy = markers === this.getMarkers() ? markers.slice() : markers;
      var removed = false;

      for (var i = 0, marker; marker = markersCopy[i]; i++) {
        var r = this.removeMarker_(marker);
        removed = removed || r;
      }

      if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
      }
    }
    /**
     * Sets the clusterer's ready state.
     *
     * @param {boolean} ready The state.
     * @private
     */

  }, {
    key: "setReady_",
    value: function setReady_(ready) {
      if (!this.ready_) {
        this.ready_ = ready;
        this.createClusters_();
      }
    }
    /**
     * Returns the number of clusters in the clusterer.
     *
     * @return {number} The number of clusters.
     */

  }, {
    key: "getTotalClusters",
    value: function getTotalClusters() {
      return this.clusters_.length;
    }
    /**
     * Returns the google map that the clusterer is associated with.
     *
     * @return {google.maps.Map} The map.
     */

  }, {
    key: "getMap",
    value: function getMap() {
      return this.map_;
    }
    /**
     * Sets the google map that the clusterer is associated with.
     *
     * @param {google.maps.Map} map The map.
     */

  }, {
    key: "setMap",
    value: function setMap(map) {
      this.map_ = map;
    }
    /**
     * Returns the size of the grid.
     *
     * @return {number} The grid size.
     */

  }, {
    key: "getGridSize",
    value: function getGridSize() {
      return this.gridSize_;
    }
    /**
     * Sets the size of the grid.
     *
     * @param {number} size The grid size.
     */

  }, {
    key: "setGridSize",
    value: function setGridSize(size) {
      this.gridSize_ = size;
    }
    /**
     * Returns the min cluster size.
     *
     * @return {number} The grid size.
     */

  }, {
    key: "getMinClusterSize",
    value: function getMinClusterSize() {
      return this.minClusterSize_;
    }
    /**
     * Sets the min cluster size.
     *
     * @param {number} size The grid size.
     */

  }, {
    key: "setMinClusterSize",
    value: function setMinClusterSize(size) {
      this.minClusterSize_ = size;
    }
    /**
     * Extends a bounds object by the grid size.
     *
     * @param {google.maps.LatLngBounds} bounds The bounds to extend.
     * @return {google.maps.LatLngBounds} The extended bounds.
     */

  }, {
    key: "getExtendedBounds",
    value: function getExtendedBounds(bounds) {
      var projection = this.getProjection(); // Turn the bounds into latlng.

      var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
      var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()); // Convert the points to pixels and the extend out by the grid size.

      var trPix = projection.fromLatLngToDivPixel(tr);
      trPix.x += this.gridSize_;
      trPix.y -= this.gridSize_;
      var blPix = projection.fromLatLngToDivPixel(bl);
      blPix.x -= this.gridSize_;
      blPix.y += this.gridSize_; // Convert the pixel points back to LatLng

      var ne = projection.fromDivPixelToLatLng(trPix);
      var sw = projection.fromDivPixelToLatLng(blPix); // Extend the bounds to contain the new bounds.

      bounds.extend(ne);
      bounds.extend(sw);
      return bounds;
    }
    /**
     * Determins if a marker is contained in a bounds.
     *
     * @param {google.maps.Marker} marker The marker to check.
     * @param {google.maps.LatLngBounds} bounds The bounds to check against.
     * @return {boolean} True if the marker is in the bounds.
     * @private
     */

  }, {
    key: "isMarkerInBounds_",
    value: function isMarkerInBounds_(marker, bounds) {
      return bounds.contains(marker.getPosition());
    }
    /**
     * Clears all clusters and markers from the clusterer.
     */

  }, {
    key: "clearMarkers",
    value: function clearMarkers() {
      this.resetViewport(true); // Set the markers a empty array.

      this.markers_ = [];
    }
    /**
     * Clears all existing clusters and recreates them.
     * @param {boolean} opt_hide To also hide the marker.
     */

  }, {
    key: "resetViewport",
    value: function resetViewport(opt_hide) {
      // Remove all the clusters
      for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        cluster.remove();
      } // Reset the markers to not be added and to be invisible.


      for (var i = 0, marker; marker = this.markers_[i]; i++) {
        marker.isAdded = false;

        if (opt_hide) {
          marker.setMap(null);
        }
      }

      this.clusters_ = [];
    }
    /**
     *
     */

  }, {
    key: "repaint",
    value: function repaint() {
      var oldClusters = this.clusters_.slice();
      this.clusters_.length = 0;
      this.resetViewport();
      this.redraw(); // Remove the old clusters.
      // Do it in a timeout so the other clusters have been drawn first.

      setTimeout(function () {
        for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
          cluster.remove();
        }
      }, 0);
    }
    /**
     * Redraws the clusters.
     */

  }, {
    key: "redraw",
    value: function redraw() {
      this.createClusters_();
    }
    /**
     * Calculates the distance between two latlng locations in km.
     * @see http://www.movable-type.co.uk/scripts/latlong.html
     *
     * @param {google.maps.LatLng} p1 The first lat lng point.
     * @param {google.maps.LatLng} p2 The second lat lng point.
     * @return {number} The distance between the two points in km.
     * @private
    */

  }, {
    key: "distanceBetweenPoints_",
    value: function distanceBetweenPoints_(p1, p2) {
      if (!p1 || !p2) {
        return 0;
      }

      var R = 6371; // Radius of the Earth in km

      var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
      var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    }
    /**
     * Add a marker to a cluster, or creates a new cluster.
     *
     * @param {google.maps.Marker} marker The marker to add.
     * @private
     */

  }, {
    key: "addToClosestCluster_",
    value: function addToClosestCluster_(marker) {
      var distance = 40000; // Some large number

      var clusterToAddTo = null;
      var pos = marker.getPosition();

      for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        var center = cluster.getCenter();

        if (center) {
          var d = this.distanceBetweenPoints_(center, marker.getPosition());

          if (d < distance) {
            distance = d;
            clusterToAddTo = cluster;
          }
        }
      }

      if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
      } else {
        var cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
      }
    }
    /**
     * Creates the clusters.
     *
     * @private
     */

  }, {
    key: "createClusters_",
    value: function createClusters_() {
      if (!this.ready_) {
        return;
      } // Get our current map view bounds.
      // Create a new bounds object so we don't affect the map.


      var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast());
      var bounds = this.getExtendedBounds(mapBounds);

      for (var i = 0, marker; marker = this.markers_[i]; i++) {
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
          this.addToClosestCluster_(marker);
        }
      }
    }
  }]);

  return MarkerClusterer;
}();
/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */


var Cluster =
/*#__PURE__*/
function () {
  function Cluster(markerClusterer) {
    _classCallCheck(this, Cluster);

    this.markerClusterer_ = markerClusterer;
    this.map_ = markerClusterer.getMap();
    this.gridSize_ = markerClusterer.getGridSize();
    this.minClusterSize_ = markerClusterer.getMinClusterSize();
    this.averageCenter_ = markerClusterer.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(), markerClusterer.getGridSize());
  }
  /**
   * Determins if a marker is already added to the cluster.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @return {boolean} True if the marker is already added.
   */


  _createClass(Cluster, [{
    key: "isMarkerAlreadyAdded",
    value: function isMarkerAlreadyAdded(marker) {
      if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) != -1;
      } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
          if (m == marker) {
            return true;
          }
        }
      }

      return false;
    }
    /**
     * Add a marker the cluster.
     *
     * @param {google.maps.Marker} marker The marker to add.
     * @return {boolean} True if the marker was added.
     */

  }, {
    key: "addMarker",
    value: function addMarker(marker) {
      if (this.isMarkerAlreadyAdded(marker)) {
        return false;
      }

      if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
      } else {
        if (this.averageCenter_) {
          var l = this.markers_.length + 1;
          var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
          var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
          this.center_ = new google.maps.LatLng(lat, lng);
          this.calculateBounds_();
        }
      }

      marker.isAdded = true;
      this.markers_.push(marker);
      var len = this.markers_.length;

      if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
        // Min cluster size not reached so show the marker.
        marker.setMap(this.map_);
      }

      if (len == this.minClusterSize_) {
        // Hide the markers that were showing.
        for (var i = 0; i < len; i++) {
          this.markers_[i].setMap(null);
        }
      }

      if (len >= this.minClusterSize_) {
        marker.setMap(null);
      }

      this.updateIcon();
      return true;
    }
    /**
     * Returns the marker clusterer that the cluster is associated with.
     *
     * @return {MarkerClusterer} The associated marker clusterer.
     */

  }, {
    key: "getMarkerClusterer",
    value: function getMarkerClusterer() {
      return this.markerClusterer_;
    }
    /**
     * Returns the bounds of the cluster.
     *
     * @return {google.maps.LatLngBounds} the cluster bounds.
     */

  }, {
    key: "getBounds",
    value: function getBounds() {
      var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
      var markers = this.getMarkers();

      for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
      }

      return bounds;
    }
    /**
     * Removes the cluster
     */

  }, {
    key: "remove",
    value: function remove() {
      this.clusterIcon_.remove();
      this.markers_.length = 0;
      delete this.markers_;
    }
    /**
     * Returns the number of markers in the cluster.
     *
     * @return {number} The number of markers in the cluster.
     */

  }, {
    key: "getSize",
    value: function getSize() {
      return this.markers_.length;
    }
    /**
     * Returns a list of the markers in the cluster.
     *
     * @return {Array.<google.maps.Marker>} The markers in the cluster.
     */

  }, {
    key: "getMarkers",
    value: function getMarkers() {
      return this.markers_;
    }
    /**
     * Returns the center of the cluster.
     *
     * @return {google.maps.LatLng} The cluster center.
     */

  }, {
    key: "getCenter",
    value: function getCenter() {
      return this.center_;
    }
    /**
     * Calculated the extended bounds of the cluster with the grid.
     *
     * @private
     */

  }, {
    key: "calculateBounds_",
    value: function calculateBounds_() {
      var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
      this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
    }
    /**
     * Determines if a marker lies in the clusters bounds.
     *
     * @param {google.maps.Marker} marker The marker to check.
     * @return {boolean} True if the marker lies in the bounds.
     */

  }, {
    key: "isMarkerInClusterBounds",
    value: function isMarkerInClusterBounds(marker) {
      return this.bounds_.contains(marker.getPosition());
    }
    /**
     * Returns the map that the cluster is associated with.
     *
     * @return {google.maps.Map} The map.
     */

  }, {
    key: "getMap",
    value: function getMap() {
      return this.map_;
    }
    /**
     * Updates the cluster icon
     */

  }, {
    key: "updateIcon",
    value: function updateIcon() {
      var zoom = this.map_.getZoom();
      var mz = this.markerClusterer_.getMaxZoom();

      if (mz && zoom > mz) {
        // The zoom is greater than our max zoom so show all the markers in cluster.
        for (var i = 0, marker; marker = this.markers_[i]; i++) {
          marker.setMap(this.map_);
        }

        return;
      }

      if (this.markers_.length < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
      }

      var numStyles = this.markerClusterer_.getStyles().length;
      var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
      this.clusterIcon_.setCenter(this.center_);
      this.clusterIcon_.setSums(sums);
      this.clusterIcon_.show();
    }
  }]);

  return Cluster;
}();
/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */


var ClusterIcon =
/*#__PURE__*/
function () {
  function ClusterIcon(cluster, styles, opt_padding) {
    _classCallCheck(this, ClusterIcon);

    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);
    this.styles_ = styles;
    this.padding_ = opt_padding || 0;
    this.cluster_ = cluster;
    this.center_ = null;
    this.map_ = cluster.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;
    this.setMap(this.map_);
  }
  /**
   * Triggers the clusterclick event and zoom's if the option is set.
   */


  _createClass(ClusterIcon, [{
    key: "triggerClusterClick",
    value: function triggerClusterClick() {
      var clusterBounds = this.cluster_.getBounds();
      var markerClusterer = this.cluster_.getMarkerClusterer(); // Trigger the clusterclick event.

      google.maps.event.trigger(markerClusterer.map_, 'clusterclick', this.cluster_);

      if (markerClusterer.isZoomOnClick()) {
        // Zoom into the cluster.
        this.map_.fitBounds(clusterBounds);
        this.map_.setCenter(clusterBounds.getCenter());
      }
    }
  }, {
    key: "onAdd",

    /**
     * Adding the cluster icon to the dom.
     * @ignore
     */
    value: function onAdd() {
      this.div_ = document.createElement('DIV');

      if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.innerHTML = this.sums_.text;
      }

      var panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(this.div_);
      var that = this;
      google.maps.event.addDomListener(this.div_, 'click', function () {
        that.triggerClusterClick();
      });
    }
  }, {
    key: "getPosFromLatLng_",

    /**
     * Returns the position to place the div dending on the latlng.
     *
     * @param {google.maps.LatLng} latlng The position in latlng.
     * @return {google.maps.Point} The position in pixels.
     * @private
     */
    value: function getPosFromLatLng_(latlng) {
      var pos = this.getProjection().fromLatLngToDivPixel(latlng);
      pos.x -= parseInt(this.width_ / 2, 10);
      pos.y -= parseInt(this.height_ / 2, 10);
      return pos;
    }
  }, {
    key: "draw",

    /**
     * Draw the icon.
     * @ignore
     */
    value: function draw() {
      if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + 'px';
        this.div_.style.left = pos.x + 'px';
        this.div_.style.zIndex = google.maps.Marker.MAX_ZINDEX + 1;
      }
    }
  }, {
    key: "hide",

    /**
     * Hide the icon.
     */
    value: function hide() {
      if (this.div_) {
        this.div_.style.display = 'none';
      }

      this.visible_ = false;
    }
  }, {
    key: "show",

    /**
     * Position and show the icon.
     */
    value: function show() {
      if (this.div_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.style.display = '';
      }

      this.visible_ = true;
    }
  }, {
    key: "remove",

    /**
     * Remove the icon from the map
     */
    value: function remove() {
      this.setMap(null);
    }
  }, {
    key: "onRemove",

    /**
     * Implementation of the onRemove interface.
     * @ignore
     */
    value: function onRemove() {
      if (this.div_ && this.div_.parentNode) {
        this.hide();
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      }
    }
  }, {
    key: "setSums",

    /**
     * Set the sums of the icon.
     *
     * @param {Object} sums The sums containing:
     *   'text': (string) The text to display in the icon.
     *   'index': (number) The style index of the icon.
     */
    value: function setSums(sums) {
      this.sums_ = sums;
      this.text_ = sums.text;
      this.index_ = sums.index;

      if (this.div_) {
        this.div_.innerHTML = sums.text;
      }

      this.useStyle();
    }
  }, {
    key: "useStyle",

    /**
     * Sets the icon to the the styles.
     */
    value: function useStyle() {
      var index = Math.max(0, this.sums_.index - 1);
      index = Math.min(this.styles_.length - 1, index);
      var style = this.styles_[index];
      this.url_ = style['url'];
      this.height_ = style['height'];
      this.width_ = style['width'];
      this.textColor_ = style['textColor'];
      this.anchor_ = style['anchor'];
      this.textSize_ = style['textSize'];
      this.backgroundPosition_ = style['backgroundPosition'];
    }
  }, {
    key: "setCenter",

    /**
     * Sets the center of the icon.
     *
     * @param {google.maps.LatLng} center The latlng to set as the center.
     */
    value: function setCenter(center) {
      this.center_ = center;
    }
  }, {
    key: "createCss",

    /**
     * Create the css text based on the position of the icon.
     *
     * @param {google.maps.Point} pos The position.
     * @return {string} The css style text.
     */
    value: function createCss(pos) {
      var style = [];
      style.push('background-image:url(' + this.url_ + ');');
      var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
      style.push('background-position:' + backgroundPosition + ';');

      if (_typeof(this.anchor_) === 'object') {
        if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 && this.anchor_[0] < this.height_) {
          style.push('height:' + (this.height_ - this.anchor_[0]) + 'px; padding-top:' + this.anchor_[0] + 'px;');
        } else {
          style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px;');
        }

        if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
          style.push('width:' + (this.width_ - this.anchor_[1]) + 'px; padding-left:' + this.anchor_[1] + 'px;');
        } else {
          style.push('width:' + this.width_ + 'px; text-align:center;');
        }
      } else {
        style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
      }

      var txtColor = this.textColor_ ? this.textColor_ : 'black';
      var txtSize = this.textSize_ ? this.textSize_ : 11;
      style.push('cursor:pointer; top:' + pos.y + 'px; left:' + pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' + txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
      return style.join('');
    }
  }]);

  return ClusterIcon;
}();

var _default = MarkerClusterer;
exports.default = _default;
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41211" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","markerclusterer.js"], null)
//# sourceMappingURL=/markerclusterer.23c45522.js.map