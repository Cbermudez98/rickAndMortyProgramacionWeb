import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from "./../environments/environment.development";
import { CardComponent } from './components/card/card.component';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'rickAndMorty';
  public pages: any;
  public response: any = {};
  public name: string = "";
  constructor(private httpSrv: HttpService) {
  }

  async ngOnInit() {
    await this.initCharacters();
    const response = await this.httpSrv.get(environment.URL_RICK_MORTY + "character/1");
    console.log("🚀  ~ AppComponent ~ ngOnInit ~ response:", response);

  }

  public onSearch(event: any) {
    this.name = "?name="+event.target.value;
    console.log(this.name);
    this.initCharacters(this.name);
  }

  public onPaginate(page: number) {
    let internalUrl = "";
    if(this.name) {
      internalUrl = internalUrl + this.name + "&page=" + page
    } else {
      internalUrl = "?page=" + page;
    }
    this.initCharacters(internalUrl);
  }

  async initCharacters(filter: string = "") {
    const url = environment.URL_RICK_MORTY + "character" + filter;
    console.log("🚀  ~ AppComponent ~ initCharacters ~ url:", url);
    this.response = await this.httpSrv.get(url);
  }
}
