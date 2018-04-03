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

    mainForm: FormGroup;
    lat: number;
    lng: number;
    draggableLat: number;
    draggableLng: number;
    type: string;
    public searchControl: FormControl;
    public zoom: number;
    public map: google.maps.Map;
    directionsDisplay: google.maps.DirectionsRenderer;

    @ViewChild('addressSearch')
    public addressTextElementRef: ElementRef;

    @Input('target') draggableLocation: FormControl;

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
            let autocomplete = new google.maps.places.Autocomplete(this.addressTextElementRef.nativeElement, {
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
        });
    }

    setupForm(fb: FormBuilder) {
        this.mainForm = fb.group({
            id: '',
            address: '',
            latitude: '',
            longitude: '',
            type: ''
        });
        this.subscribeOnValueChange();
    }

    subscribeOnValueChange() {
        this.mainForm.valueChanges.subscribe(() => {
            this.propagateChange(this.mainForm.value);
        });
        this.mainForm.get('latitude').valueChanges.subscribe(newLat => {
            if (newLat) {
                this.setCoords(this.lng, newLat);
            }
        });
        this.mainForm.get('longitude').valueChanges.subscribe(newLng => {
            if (newLng) {
                this.setCoords(newLng, this.lat);
            }
        });
    }

    mapReady(map: google.maps.Map) {
        console.log(map);
        const coords: LatLngLiteral = { lat: +this.lat, lng: +this.lng };
        this.setCoords(this.lng, this.lat);

        // map.data;
        this.map = map;
        this.obtainCenterLocation();

        this.directionsDisplay = new google.maps.DirectionsRenderer(
            { suppressMarkers: true }
        );
        this.directionsDisplay.setMap(this.map);
        this.drawRoute();
        map.setCenter(coords);
    }

    mapClick($event: MouseEvent) {
        this.setCoords($event.coords.lng, $event.coords.lat);
        this.mainForm.get('latitude').setValue(this.lat);
        this.mainForm.get('longitude').setValue(this.lng);
        this.propagateChange(this.mainForm.value);
    }

    setCoords(lng, lat) {
        console.log('changing coords from: ', this.lng, this.lat);
        this.lng = +lng;
        this.lat = +lat;
        console.log('new coords: ', this.lng, this.lat);
    }

    updateFormCoords() {
        this.mainForm.get('latitude').setValue(this.lat);
        this.mainForm.get('longitude').setValue(this.lng);
    }

    setZoom(zoom) {
        if (!!zoom) {
            this.zoom = zoom;
        }
    }

    writeValue(obj: Address): void {
        if (obj) {
            this.mainForm.patchValue(obj);
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
        if (!this.map || !this.draggableLat) {
            return;
        }

        const coords: LatLngLiteral = {
            lat: (+this.lat + (this.draggableLat || 0))/2,
            lng: (+this.lng + (this.draggableLng || 0))/2
        };
        this.map.setCenter(coords);
    }

    onChange(event) {
        this.getLocationByAddress(this.addressTextElementRef.nativeElement.value).then(
            result => {
                this.updateLocation(result);
                this.drawRoute();
            },
            error => {}
        );
    }

    markerDragEnd(event) {
        console.log("marker dragged", event);
        this.setCoords(event.coords.lng, event.coords.lat);
        this.updateFormCoords();
        this.setCenter();
        this.drawRoute();
        const latlng = <LatLngLiteral>{lat: this.lat, lng: this.lng};
        this.getAddressByCoords(latlng).then(
            result => this.mainForm.get('address').setValue(result),
            error => console.error('address not found')
        );
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

            geocoder.geocode( { address: address }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    const location = results[0].geometry.location;
                    resolve({ lat: +location.lat(), lng: +location.lng() });
                } else {
                    reject();
                }
            });
        });
    }

    getAddressByCoords(latlng: LatLngLiteral): Promise<string> {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode( { location: latlng }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results[0].formatted_address);
                } else {
                    reject();
                }
            });
        });
    }

    obtainCenterLocation() {
        console.log('obtainOfficeLocation',this.draggableLocation);
        if (!this.draggableLocation ||!this.draggableLocation.value) {
            return;
        }

        this.draggableLat = this.draggableLocation.value.latitude;
        this.draggableLng = this.draggableLocation.value.longitude;
        console.log('this office latlng:', this.draggableLat, this.draggableLng);
    }

    drawRoute(waypoints?: Array<object>) {
        if (!this.map || !this.lat || !this.lng || !this.draggableLat || !this.draggableLng) {
            return;
        }

        let directionsService = new google.maps.DirectionsService();
        this.calculateAndDisplayRoute(directionsService, this.directionsDisplay, this.getRouteSettings());
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, routeSettings) {
        console.log(routeSettings);
        directionsService.route(routeSettings, function(response, status) {
           if (status === google.maps.DirectionsStatus.OK) {
              console.log('route status OK', response);
              directionsDisplay.setDirections(response);
           } else {
              console.log('Directions request failed due to ' + status);
           }
        });
    }

    getRouteSettings(waypoints?: Array<object>) {
        console.log('getRouteSettings:', this.lat, this.lng, this.draggableLat, this.draggableLng);
        return {
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(this.draggableLat, this.draggableLng),
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
    draggableLat: number;
    draggableLng: number;
}
