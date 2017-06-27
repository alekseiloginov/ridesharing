import { Component, OnInit, forwardRef, ElementRef, Self, Renderer, NgZone, ViewChild, Input } from '@angular/core';
import {
    ControlValueAccessor, FormBuilder, FormGroup, DefaultValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormControl
} from '@angular/forms';

import { LatLngLiteral, MouseEvent, MapsAPILoader } from '@agm/core';
import {  } from '@types/googlemaps';

@Component({
    selector: 'app-address-control',
    templateUrl: './address-control.component.html',
    styleUrls: ['./address-control.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddressControlComponent),
            multi: true
        }
    ]
})
export class AddressControlComponent implements OnInit, ControlValueAccessor {

    addressForm: FormGroup;
    lat: number;
    lng: number;
    officeLat: number;
    officeLng: number;
    type: string;
    public searchControl: FormControl;
    public zoom: number;
    public map: google.maps.Map;

    @ViewChild('userAddress')
    public userAddressElementRef: ElementRef;

    @Input('officeAddress') officeAddress: FormControl;

    propagateChange: (_: Address) => void;

    constructor(fb: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
        this.setupForm(fb);
    }

    ngOnInit() {
        this.propagateChange = () => { };

        // create search FormControl
        this.searchControl = new FormControl();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.userAddressElementRef.nativeElement, {
                types: ['address']
            });

            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    // save and show
                    this.updateLocation({lng: place.geometry.location.lng(), lat: place.geometry.location.lat()});
                });
            });

            this.obtainOfficeLocationAndRedrawRoute();
        });
    }

    setupForm(fb: FormBuilder) {
        this.addressForm = fb.group({
            id: '',
            address: '',
            latitude: '',
            longitude: '',
            type: ''
        });
        this.addressForm.valueChanges.subscribe(() => {
            this.propagateChange(this.addressForm.value);
        });
        this.addressForm.get('latitude').valueChanges.subscribe(newLat => {
            if (newLat) {
                this.setCoords(this.lng, newLat);
            }
        });
        this.addressForm.get('longitude').valueChanges.subscribe(newLng => {
            if (newLng) {
                this.setCoords(newLng, this.lat);
            }
        });
    }

    mapReady(map: google.maps.Map) {
        console.log(map);
        const coords: LatLngLiteral = { lat: +this.lat, lng: +this.lng };
        this.setCoords(this.lng, this.lat);
        map.setCenter(coords);
        // map.data;
        this.map = map;
    }

    mapClick($event: MouseEvent) {
        this.setCoords($event.coords.lng, $event.coords.lat);
        this.addressForm.get('latitude').setValue(this.lat);
        this.addressForm.get('longitude').setValue(this.lng);
        this.propagateChange(this.addressForm.value);
    }

    setCoords(lng, lat) {
        console.log('changing coords from: ', this.lng, this.lat);
        this.lng = +lng;
        this.lat = +lat;
        console.log('new coords: ', this.lng, this.lat);
    }

    updateFormCoords() {
        this.addressForm.get('latitude').setValue(this.lat);
        this.addressForm.get('longitude').setValue(this.lng);
    }

    setZoom(zoom) {
        if (!!zoom) {
            this.zoom = zoom;
        }
    }

    writeValue(obj: Address): void {
        if (obj) {
            this.addressForm.patchValue(obj);
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        // do nothing?
    }

    setDisabledState(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

    setCenter() {
        if (!this.map) {
            return;
        }

        const coords: LatLngLiteral = { lat: +this.lat, lng: +this.lng };
        this.map.setCenter(coords);
    }

    onChange(event) {
        this.getLocationByAddress(this.userAddressElementRef.nativeElement.value).then(
            result => this.updateLocation(result),
            error => {}
        );
        // this.obtainOfficeLocationAndRedrawRoute(); not working yet
    }

    updateLocation(location: any) {
        const coords: LatLngLiteral = <any>location;
        this.map.setCenter(coords);
        this.setCoords(coords.lng, coords.lat);
        this.updateFormCoords();
        this.setZoom(15);
        this.setCenter();
    }

    getLocationByAddress(address: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode( { address: address}, function(results, status) {
                console.log('status. result', status, results);
                if (status === google.maps.GeocoderStatus.OK) {
                    const location = results[0].geometry.location;
                    resolve({ lat: +location.lat(), lng: +location.lng() });
                } else {
                    reject();
                }
            });
        });
    }

    obtainOfficeLocationAndRedrawRoute() {
        console.log('obtainOfficeLocation',this.officeAddress.value);
        if (!this.officeAddress) {
            return;
        }

        this.getLocationByAddress(this.officeAddress.value).then(
            result => {
                this.officeLat = (<any>result).lat;
                this.officeLng = (<any>result).lng;
                this.drawRoute();
            },
            error => {}
        );
        console.log('this office latlng:', this.officeLat, this.officeLng);
    }

    drawRoute(waypoints?: Array<object>) {
        if (!this.map || !this.officeAddress || !this.addressForm.get('address')) {
            return;
        }

        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer(
            { suppressMarkers: true}
        );

        directionsDisplay.setMap(this.map);
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, this.getRouteSettings());
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, routeSettings) {
        console.log(routeSettings);
        directionsService.route(routeSettings, function(response, status) {
           if (status === 'OK') {
              console.log('route status OK', response);
              directionsDisplay.setDirections(response);
           } else {
             window.alert('Directions request failed due to ' + status);
           }
        });
    }

    getRouteSettings(waypoints?: Array<object>) {
        console.log('getRouteSettings:', this.lat, this.lng, this.officeLat, this.officeLng);
        return {
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(this.officeLat, this.officeLng),
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        };
    }
}

export interface Address {
    id: string;
    latitude: number;
    longitude: number;
    address: string;
    type: string;
    officeLat: number;
    officeLng: number;
}
