// JSONPlaceholder User interface
export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
  createSuccess: boolean;
}
