export interface UserInterface {
  id: number;
  username: string;
  email: string;
  password: string;
  profile: {
    id: number;
    nom: string;
    prenom: string;
    tel: string;
    adresse: string;
    genre: string;
    ville: string;
    pays: string;
    nationalite: string;
    photo: string;
  };
}
