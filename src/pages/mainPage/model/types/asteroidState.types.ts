export interface ICloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  miss_distance: {
    astronomical: string;
    kilometers: string;
    lunar: string;
    miles: string;
  };
  orbiting_body: string;
  relative_velocity: {
    kilometers_per_hour: string;
    kilometers_per_second: string;
    miles_per_hour: string;
  };
}

interface IEstimatedDiameterMinMax {
  estimated_diameter_max: number;
  estimated_diameter_min: number;
}
interface IEstimatedDiameter {
  feet: IEstimatedDiameterMinMax;
  kilometers: IEstimatedDiameterMinMax;
  meters: IEstimatedDiameterMinMax;
  miles: IEstimatedDiameterMinMax;
}

export interface IAsteroid {
  absolute_magnitude_h: number;
  close_approach_data: ICloseApproachData[];
  estimated_diameter: IEstimatedDiameter;
  id: string;
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
  links: { self: string };
  name: string;
  nasa_jpl_url: string;
  neo_reference_id: string;
}

export interface IAsteroidResolve {
  element_count: number;
  link: {
    next: string;
    previous: string;
    self: string;
  };
  near_earth_objects: Record<string, IAsteroid[]>;
}

export type TDistanceType = 'kilometer' | 'luna';

export interface IAsteroidState {
  data: IAsteroidResolve;
  isLoading: boolean;
  isLoadingNextAsteroid: boolean;
  inited: boolean;
  error: string;
  page: number;
  asteroids: IAsteroid[];
  distanceType: TDistanceType;
}
