       function computeDistance(startCoords,destCoords){
            var startLatRads = degreesToRadians(startCoords.latitude);
            var startLongRads = degreesToRadians(startCoords.longitude);
            var destLatRads = degreesToRadians(destCoords.latitude);
            var destLongRads = degreesToRadians(destCoords.longitude);

            var Radius = 6371; // Radius of the Earth in km
            var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +　Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads = destLongRads)) * Radius;

            return distance;
        }

        function degreesToRadians(degrees){
            var radians = (degrees * Math.PI)/180;
            return radians;
        }