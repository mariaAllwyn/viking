import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../../../viking/src/app/services/crud.service';
import { AlbumModel, AlbumResult } from '../app/models/album.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'viking';
  public url: string =
    'https://gist.githubusercontent.com/mslosarek/feb16b9a1dae5f3b7868ff0e0674d1c1/raw/06e0e0efebdaca724b7b70720d6d63ceff3acb19/page1.json';
  public albumList: Array<AlbumModel> = [];
  public albumResult: AlbumResult = {
    nextPage: null,
    previousPage: null,
    results: [],
  };
  public searchValue: string = '';

  constructor(
    private crud: CrudService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAlbum();
  }

  public onNavigateClick(navigate): void {
    if (navigate == 'prev') {
      this.url = this.albumResult.previousPage;
    } else {
      this.url = this.albumResult.nextPage;
    }
    this.loadAlbum();
  }

  public loadAlbum(): void {
    this.spinner.show();
    this.crud.get(this.url).subscribe(
      (res: AlbumResult) => {
        this.albumResult = res;
        this.albumList = res.results;
        this.spinner.hide();
        console.log(this.albumList, this.albumResult);
      },
      (error) => {}
    );
  }

  public filterAlbum(event): void {
    this.searchValue = event.target.value;
    if (this.searchValue) {
      this.albumList = this.albumResult.results.filter(
        (album) =>
          album.album_title
            .toUpperCase()
            .indexOf(this.searchValue.toUpperCase()) >= 0
      );
    } else {
      this.albumList = this.albumResult.results;
    }
  }
}
