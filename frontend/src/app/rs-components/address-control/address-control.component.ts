import { Component, OnInit, forwardRef, ElementRef, Self, Renderer } from '@angular/core';
import {
    ControlValueAccessor, FormBuilder, FormGroup, DefaultValueAccessor, NgControl, NG_VALUE_ACCESSOR
} from '@angular/forms';

import { LatLngLiteral, MouseEvent } from '@agm/core';
import { GoogleMap } from '@agm/core/services/google-maps-types';

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

    propagateChange: (_: Address) => void;

    constructor(fb: FormBuilder) {
        this.setupForm(fb);
    }

    ngOnInit() {
        this.propagateChange = () => { };
    }

    setupForm(fb: FormBuilder) {
        this.addressForm = fb.group({
            id: '',
            address: '',
            latitude: '',
            longitude: ''
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
}

export interface Address {
    id: string;
    latitude: number;
    longitude: number;
    address: string;
}
