/**
 * @example
 *   <elm>
 *       <div elm module="TextField"></div>
 *       // Other Elm modules here
 *   </elm>
 */
(function (angular) {
    angular.module('shared/directives/elm-directive', [])
        .directive('elm', function ($parse, $timeout) {
            function link(scope, element, attrs) {
                var target = element[0];
                var flags = $parse(attrs.flags)(scope);
                var ports = attrs.ports;
                var module = window.elm[attrs.module];
                var elm;

                if (target.nodeName === 'BODY') {
                    elm = module.fullscreen(flags);
                } else if (target.nodeName === 'DIV') {
                    elm = module.embed(target, flags);
                }

                /**
                 * This should allow you to use ports to communicate between
                 * angular and javascript, e.g:
                 * $scope.fromJsToElm = 'This gets automatically sent to Elm!';
                 * or from the other direction:
                 * $scope.fromElmToJs = function (msg) { console.log(msg) }
                 */
                if (elm) {
                    var portsPrefix = ports ? ports + '.' : '';
                    angular.forEach (elm.ports, function(port, name) {
                        if (port.send) {
                            scope.$watch(portsPrefix + name, function(value) {
                                try {
                                    port.send(value);
                                } catch (ex) {
                                    // elm border check error
                                }
                            });
                        } else if (port.subscribe) {
                            var adapterFn;
                            scope.$watch(portsPrefix + name, function(newFn) {
                                if (adapterFn) {
                                    port.unsubscribe(adapterFn);
                                    adapterFn = undefined;
                                }

                                if (angular.isFunction(newFn)) {
                                    adapterFn = function (value) {
                                        $timeout(function () {
                                            newFn(value);
                                        });
                                    };
                                    port.subscribe(adapterFn);
                                }
                            });
                        }
                    });
                }
            }

            return {
                restrict: 'EA',
                link: link
            };
        });
})(angular);
