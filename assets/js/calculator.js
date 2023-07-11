function calculate() {
    const x1 = input.get('2d_x_1').number().val();
    const x2 = input.get('2d_x_2').number().val();
    const y1 = input.get('2d_y_1').number().val();
    const y2 = input.get('2d_y_2').number().val();

    if (!input.valid()) return;

    const distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

    _('result').innerHTML = roundTo(distance);
}

function calculate3d() {
    const x1 = input.get('3d_x_1').number().val();
    const x2 = input.get('3d_x_2').number().val();
    const y1 = input.get('3d_y_1').number().val();
    const y2 = input.get('3d_y_2').number().val();
    const z1 = input.get('3d_z_1').number().val();
    const z2 = input.get('3d_z_2').number().val();

    if (!input.valid()) return;

    const distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));

    _('result').innerHTML = roundTo(distance);
}

function calculateLatLong() {
    const lat1 = input.get('lat_long_lat_1').number().gte(-90).lte(90).val();
    const lon1 = input.get('lat_long_long_1').number().gte(-180).lte(180).val();
    const lat2 = input.get('lat_long_lat_2').number().gte(-90).lte(90).val();
    const lon2 = input.get('lat_long_long_2').number().gte(-180).lte(180).val();

    if (!input.valid()) return;

    const distance = calculateDistance(lat1, lon1, lat2, lon2);

    _('result').innerHTML = roundTo(distance) + ' km or ' + roundTo(distance * 0.621371) + ' mi';

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Radius of the Earth in kilometers

        // Convert latitude and longitude from degrees to radians
        const lat1Rad = toRadians(lat1);
        const lon1Rad = toRadians(lon1);
        const lat2Rad = toRadians(lat2);
        const lon2Rad = toRadians(lon2);

        // Haversine formula
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;
        const a =
           Math.sin(dLat / 2) * Math.sin(dLat / 2) +
           Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c;
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}