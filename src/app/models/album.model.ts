export interface AlbumModel {
  album_title: string;
  year: number;
  condition: string;
  artist: ArtistModel;
}

export interface ArtistModel {
  name: string;
  id: number;
}

export interface AlbumResult {
  nextPage: string;
  previousPage: string;
  results: Array<AlbumModel>;
}

export interface ModelTemplate {
  isOpen: boolean;
  album: AlbumModel;
}
