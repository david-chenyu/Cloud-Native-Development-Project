import React from 'react';
import ReactDOM from 'react-dom';
import { Navigate } from 'react-router-dom';

import './HomeMap.css';
import H from "@here/maps-api-for-javascript";

export default class HomeMap extends React.Component {
  constructor(props) {
    super(props);
    // the reference to the container
    this.ref = React.createRef();
    this.ref2 = React.createRef();
    // reference to the map
    this.map = null;
    this.state = {
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_HERE_MAP_APIKEY
      });
      const layers = platform.createDefaultLayers({
        lg: 'zh-tw'
      });

      const map = new H.Map(
        this.ref.current,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: 24.80, lng: 120.98},
          zoom: 14,
        },
      );
      this.map = map;
      var routeInstructionsContainer = this.ref2.current;
      window.addEventListener('resize', () => map.getViewPort().resize());

      
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      var ui = H.ui.UI.createDefault(map, layers);

      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        map.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});
        map.setZoom(14);
        var marker = new H.map.Marker({lat:position.coords.latitude, lng:position.coords.longitude});
        map.addObject(marker);
      });

      var stops = [[25.02940176238104, 121.50055862568333], 
          [25.048876668724624,121.50619014148239], 
          [25.03991282424907,121.51290273721504]];

    
      function calculateRoute(platform, points, text) {
        const pstr = points.map(x => x[0].toString()+','+x[1].toString());
        var router = platform.getRoutingService(null, 8),
          routeRequestParams = {
            routingMode: 'fast',
            transportMode: 'car',
            origin: pstr[0],
            via: pstr.slice(1,-1),
            destination: pstr.slice(-1),
            return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
          };
        
          router.calculateRoute(
            routeRequestParams,
            onSuccess,
            onError
          );
        function onSuccess(result) {
          // console.log(result.routes);
          if(result.routes.length > 0){
            var route = result.routes[0];
            addRouteShapeToMap(route);
            addStopsToMap(points, text);
          }
        }
        function onError(error) {
            alert('Can\'t reach the remote server');
        }
      }

      var bubble;

      /**
       * Opens/Closes a infobubble
       * @param {H.geo.Point} position The location on the map.
       * @param {String} text          The contents of the infobubble.
       */
      function openBubble(position, text) {
        if (!bubble) {
            bubble = new H.ui.InfoBubble(
            position,
            // The FO property holds the province name.
            {content: text});
            ui.addBubble(bubble);
        } else {
            bubble.setPosition(position);
            bubble.setContent(text);
            bubble.open();
        }
      }

      /**
       * Creates a H.map.Polyline from the shape of the route and adds it to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */
      function addRouteShapeToMap(route) {
      route.sections.forEach((section) => {
          // decode LineString from the flexible polyline
          let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

          // Create a polyline to display the route:
          let polyline = new H.map.Polyline(linestring, {
          style: {
              lineWidth: 4,
              strokeColor: 'rgba(0, 128, 255, 0.7)'
          }
          });

          // Add the polyline to the map
          map.addObject(polyline);
          // And zoom to its bounding rectangle
          // map.getViewModel().setLookAtData({
          // bounds: polyline.getBoundingBox()
          // });
      });
      }

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */
      function addManueversToMap(route) {
        var svgMarkup = '<svg width="18" height="18" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="8" cy="8" r="8" ' +
            'fill="#1b468d" stroke="white" stroke-width="1" />' +
            '</svg>',
            dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
            group = new H.map.Group(),
            i,
            j;

        route.sections.forEach((section) => {
            let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

            let actions = section.actions;
            // Add a marker for each maneuver
            for (i = 0; i < actions.length; i += 1) {
              let action = actions[i];
              var marker = new H.map.Marker({
                  lat: poly[action.offset * 3],
                  lng: poly[action.offset * 3 + 1]},
                  {icon: dotIcon});
              marker.instruction = action.instruction;
              group.addObject(marker);
            }

            group.addEventListener('tap', function (evt) {
              map.setCenter(evt.target.getGeometry());
              openBubble(evt.target.getGeometry(), evt.target.instruction);
            }, false);

            // Add the maneuvers group to the map
            map.addObject(group);
        });
      }
      function addStopsToMap(stops, text) {
        var svgMarkup = '<svg width="18" height="18" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="8" cy="8" r="8" ' +
            'fill="#1b468d" stroke="white" stroke-width="1" />' +
            '</svg>',
            dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
            group = new H.map.Group(),
            i,
            j;

          // Add a marker for each maneuver
          for (let s of stops) {
            var marker = new H.map.Marker({
                lat: s[0],
                lng: s[1]},
                {icon: dotIcon});
            marker.instruction = text;
            group.addObject(marker)
          }

          group.addEventListener('tap', function (evt) {
            map.setCenter(evt.target.getGeometry());
            openBubble(evt.target.getGeometry(), evt.target.instruction);
          }, false);

          // Add the maneuvers group to the map
          map.addObject(group);
      }

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */
      function addWaypointsToPanel(route) {
        var nodeH3 = document.createElement('h3'),
            labels = [];

        route.sections.forEach((section) => {
            labels.push(
            section.turnByTurnActions[0].nextRoad.name[0].value)
            labels.push(
            section.turnByTurnActions[section.turnByTurnActions.length - 1].currentRoad.name[0].value)
        });

        nodeH3.textContent = labels.join(' - ');
        routeInstructionsContainer.innerHTML = '';
        routeInstructionsContainer.appendChild(nodeH3);
      }

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */
      function addSummaryToPanel(route) {
        let duration = 0,
            distance = 0;

        route.sections.forEach((section) => {
            distance += section.travelSummary.length;
            duration += section.travelSummary.duration;
        });

        var summaryDiv = document.createElement('div'),
            content = '<b>Total distance</b>: ' + distance + 'm. <br />' +
            '<b>Travel Time</b>: ' + toMMSS(duration) + ' (in current traffic)';

        summaryDiv.style.fontSize = 'small';
        summaryDiv.style.marginLeft = '5%';
        summaryDiv.style.marginRight = '5%';
        summaryDiv.innerHTML = content;
        routeInstructionsContainer.appendChild(summaryDiv);
      }

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */
      function addManueversToPanel(route) {
      var nodeOL = document.createElement('ol');

      nodeOL.style.fontSize = 'small';
      nodeOL.style.marginLeft ='5%';
      nodeOL.style.marginRight ='5%';
      nodeOL.className = 'directions';

      route.sections.forEach((section) => {
          section.actions.forEach((action, idx) => {
          var li = document.createElement('li'),
              spanArrow = document.createElement('span'),
              spanInstruction = document.createElement('span');

          spanArrow.className = 'arrow ' + (action.direction || '') + action.action;
          spanInstruction.innerHTML = section.actions[idx].instruction;
          li.appendChild(spanArrow);
          li.appendChild(spanInstruction);

          nodeOL.appendChild(li);
          });
      });

      routeInstructionsContainer.appendChild(nodeOL);
      }

      function toMMSS(duration) {
          return Math.floor(duration / 60) + ' minutes ' + (duration % 60) + ' seconds.';
      }

      function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
      }
      const backend_url = process.env.REACT_APP_BACKEND_URL;
      console.log(backend_url);

      fetch(backend_url+'/route/allRoutes', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (response) => {
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                for(let route of data){
                  if(route.routeList.length >= 2){
                    let status = [];
                    const weekdays = {
                      "Sunday": "週日",
                      "Monday": "週一",
                      "Tuesday": "週二",
                      "Wednesday": "週三",
                      "Thursday": "週四",
                      "Friday": "週五",
                      "Saturday": "週六"
                    };

                    Object.keys(weekdays).map((key) => {
                      if (route.dayOfWeek.includes(key)) {
                        status.push(weekdays[key]);
                      }
                    });
                    console.log(status);
                    
                    var routeList = route.routeList.map(x => [x.lat, x.lng]);
                    const time = new Date(route.startTime);
                    var text = "<div>" + route.routeList[0].loc + '→' + route.routeList.slice(-1)[0].loc + '<br>' + status.join("、") + '<br>' + pad(time.getHours(),2) + ':' + pad(time.getMinutes(),2) + ' 出發' + `<a href=\"/passroute?routeid=${route.routeId}\">Timetable</a></div>`;
                    console.log(routeList);
                    calculateRoute(platform, routeList, text);
                  }
                }
            } else if (response.status === 401) {
                console.log("Unauthorized");
            } else {
                console.log("Status Code:", response.status);
            }
        }).catch(function(error) {
            console.log('error = ' + error)
        })
      //calculateRoute(platform, stops);
    }
    
  }

  render() {
    if (this.state.shouldRedirect) {
      return <Navigate to="/order" />;
    }
    return (
        <>
        <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
            <div
                style={{ width: '100%', height:'auto' }}
                ref={this.ref}
            />
            <div
                ref={this.ref2}
            />
        </>
    )
  }
}
