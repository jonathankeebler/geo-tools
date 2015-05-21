var should = require('should'),
	geotools = require('../src/geo-tools.js');

describe('GeoTools', function(){
	describe('geocode', function(){
		it('should geocode a given address', function(done){
			var address = '717 California Street San Francisco CA';
			geotools.geocode(address, function(coordinates){
				coordinates.should.have.property('lng').and.be.type('number');
				done();
			});
		});

		it('should geocode a given address using a given API key', function(done){
			var address = '1600 Amphitheatre Pkwy, Mountain View, CA';
			geotools.geocode(address, function(coordinates){
				coordinates.should.have.property('lng').and.be.type('number');
				done();
			});
		}, {
			key: 'YOUR_GOOGLE_API_KEY'
		});
	});

	describe('reverse geocode', function(){
		it('should reverse geocode a given set of lat & lng', function(done){
			var lat = 52.518611;
			var lng = 13.408056;
			geotools.reverseGeocode(lat, lng, function(error, address){
				should.not.exist(error);
				address.should.have.property('full_address').and.be.type('string');
				
				done();
			});
		});
		
		it('should throw errors via callback', function(done){
			var lat = 0;
			var lng = 0;
			geotools.reverseGeocode(lat, lng, function(error, address){
				should.exist(error);
				console.log(error)
				should.not.exist(address);
				
				done();
			});
		});

		it('can accept an object literal or 2 numbers for the lat/lon', function(done){
			var coordinates = { lat: 51.515400, lng: 7.455185 };
			geotools.reverseGeocode(coordinates, function(error, address){
				should.not.exist(error);
				geotools.reverseGeocode(51.515400, 7.455185, function(error, address1){
					should.not.exist(error);
					address.should.be.eql(address1)
					
					done();
				});
			});
		});
		
		
	});

	describe('distance', function(){
		it('return distance between two sets of lat/lng', function(){
			var coordinates = { lat: 51.515400, lng: 7.455185 };
			var coordinates1 = { lat: 40.803544, lng: -111.773849 };
			geotools.distance(coordinates, coordinates1, function(length){
				length.should.be.type('number')
			})		;
		});

		it('can accept 2 object literals or 4 numbers for the lat/lng', function(){
			var coordinates = { lat: 51.515400, lng: 7.455185 };
			var coordinates1 = { lat: 40.803544, lng: -111.773849 };
			geotools.distance(coordinates, coordinates1, function(length){
				distance(51.515400, 7.455185, 40.803544, -111.773849, function(length1){
					length.should.be.exactly(length1)
				});
			});
		});
	});

	describe('unit conversions', function(){
		it('should convert KM into respective units', function(done){
			geotools.toMiles(1).should.be.exactly(0.621371);
			geotools.toMeters(1).should.be.exactly(1000);
			geotools.toYards(1).should.be.exactly(1093.61);
			geotools.toFeet(1).should.be.exactly(3280.84);
			done();
		});
	});
});
