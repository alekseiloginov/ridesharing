import { CourseDetails } from './course-details/course-details';
import { Author} from '../../shared/authors/author';

export interface IAddress {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    type: string;
}

export class Address implements IAddress {
    constructor( public id: number,
                 public address: string,
                 public latitude: number,
                 public longitude: number,
                 public type: string) {}
}
