import { Component, OnInit, forwardRef, ElementRef, Self, Renderer, NgZone, ViewChild } from '@angular/core';
import {
    ControlValueAccessor, FormBuilder, FormGroup, DefaultValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormControl
} from '@angular/forms';

import { LatLngLiteral, MouseEvent, MapsAPILoader } from '@agm/core';
import { GoogleMap } from '@agm/core/services/google-maps-types';
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
    type: string;
    public searchControl: FormControl;
    public zoom: number;
    public map: GoogleMap;

    @ViewChild('search')
    public searchElementRef: ElementRef;

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
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });

            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                // get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

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

    mapReady(map: GoogleMap) {
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
        this.getLocationByAddress(this.searchElementRef.nativeElement.value).then(
            result => this.updateLocation(result),
            error => {}
        );
    }

    updateLocation(location: any) {
        const coords: LatLngLiteral = <any>location;
        this.map.setCenter(coords);
        this.setCoords(coords.lng, coords.lat);
        this.updateFormCoords();
        this.setZoom(12);
        this.setCenter();
    }

    getLocationByAddress(address: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    const location = results[0].geometry.location;
                    resolve({ lat: +location.lat(), lng: +location.lng() });
                } else {
                    reject();
                }
            });
        });
    }
}

export interface Address {
    id: string;
    latitude: number;
    longitude: number;
    address: string;
    type: string;
}
