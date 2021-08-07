import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlbumModel, ModelTemplate } from 'src/app/models/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnChanges {
  @Input() albumList: Array<AlbumModel>;
  public modalBody: ModelTemplate = {
    isOpen: false,
    album: {
      album_title: '',
      year: 0,
      condition: '',
      artist: {
        name: '',
        id: 0,
      },
    },
  };
  public albums: Array<AlbumModel>;
  public albumIndex: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.albums = Object.assign([], changes.albumList.currentValue);
  }

  public onEditAlbumClick(album: AlbumModel, index: number): void {
    this.modalBody.isOpen = true;
    this.modalBody.album = JSON.parse(JSON.stringify(album));
    this.albumIndex = index;
  }

  public onSubmit(): void {
    this.modalBody.isOpen = false;
    if (
      this.albums[this.albumIndex].artist.name !=
      this.modalBody.album.artist.name
    ) {
      const artistName = JSON.parse(
        JSON.stringify(this.albums[this.albumIndex].artist.name)
      );
      this.albums.map((item) => {
        if (item.artist.name == artistName) {
          item.artist.name = this.modalBody.album.artist.name;
        }
        return item;
      });
    }
    this.albums[this.albumIndex] = this.modalBody.album;
  }

  public onCancel(): void {
    this.modalBody.isOpen = false;
  }
}
