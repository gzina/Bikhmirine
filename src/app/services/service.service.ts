import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Annonce } from '../module/annonce.module';
import { Categorie } from '../module/categorie.module';
import { Ville } from '../module/ville.module';
import { AnnonceDetails } from '../module/annonceDetails.module';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  private adresses = {
    url: 'https://www.avito.ma',
    annonce: {
      all: 'lij?fullad=1&o=',
      details : 'vij',
      search: {
        cat : 'templates/api/confcategories.js?v=3',
        ville : 'templates/api/confregions.js?v=3'
      }
    }
  };

  constructor(private http: HttpClient , private httpAdv: HTTP) {
  }


  async getData() {
    try {
      const url = `${this.adresses.url}/${this.adresses.annonce.all}1`;
      const params = {};
      const headers = {};

      const response = await this.httpAdv.get(url, params, headers);

      console.log(response.status);
      console.log(JSON.parse(response.data)); // JSON data returned by server
      console.log(response.headers);

    } catch (error) {
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
    }
  }


  getAnnonces(): Observable<Annonce[]> {
    let url = `${this.adresses.url}/${this.adresses.annonce.all}1`
    return this.http.get(url)
      .pipe(
        map(
          results =>  {
            const resultsArray: any[] = results['list_ads'];
            return resultsArray.map(r => Object.assign(new Annonce, {id: r.id ,
              ad_date: r.ad_date,
              subject: r.subject ,
              thumb: r.thumb ,
              price: r.price ,
              category: r.Category ,
              city: r.city ,
              type: r.type ,
              url: r.url ,
            }))
          }
        )
      )
  }

  searchAnnonces(mot: string , categorie:number , ville : number): Observable<Annonce[]> {
    let searchUrl = "" ;
    if (mot) {
      searchUrl += `&q=${mot}`
    }
    if (categorie) {
      searchUrl += `&cg=${categorie}`
    }
    if (ville) {
      searchUrl += `&ca=${ville}`
    }
    let url = `${this.adresses.url}/${this.adresses.annonce.all}1${searchUrl}`
    return this.http.get(url)
      .pipe(
        map(
          results =>  {
            const resultsArray: any[] = results['list_ads'];
            return resultsArray.map(r => Object.assign(new Annonce, {id: r.id ,
              ad_date: r.ad_date,
              subject: r.subject ,
              thumb: r.thumb ,
              price: r.price ,
              category: r.Category ,
              city: r.city ,
              type: r.type ,
              url: r.url ,
            }))
          }
        )
      )
  }

  getCategories(): Observable<Categorie[]> {
    let url = `${this.adresses.url}/${this.adresses.annonce.search.cat}`
    return this.http.get(url)
      .pipe(
        map(
          results =>  {
            const resultsArray: any[] = results['categories'];
            return resultsArray.map(r => Object.assign(new Categorie, {id: r.id ,
              level: r.level,
              parent: r.parent ,
              name: r.name ,
            }))
          }
        )
      )
  }

  getVille(): Observable<Ville[]> {
    let url = `${this.adresses.url}/${this.adresses.annonce.search.cat}`
    return this.http.get(url)
      .pipe(
        map(
          results =>  {
            const resultsArray: any[] = results['regions'];
            return resultsArray.map(r => Object.assign(new Ville, {id: r.id ,
              name: r.name ,
              cities : [r.cities.id , r.cities.name]
            }))
          }
        )
      )
  }

getDetails (id): Observable<AnnonceDetails>{
  let url = `${this.adresses.url}/${this.adresses.annonce.details}/id.htm`
  return this.http.get(url)
    .pipe(
      map(
        result =>  {
          const res: any= result;
          return res.map(r => Object.assign(new AnnonceDetails, {id: r.id ,
            ad_date: r.ad_date ,
            subject: r.subject ,
            price: r.price.label ,
            thumb: r.thumb , 
            category: r.category ,
            region: r.region ,
            city: r.city ,
            type: r.type ,
            url: r.url ,
            name: r.name ,
            date: r.date ,
            body: r.body ,
            phone: r.phone ,
            image: r.image.standard ,
            extra_images: r.extra_images.standard ,
            ad_details: [r.ad_details.label , r.ad_details.value]
           } ))
        }
      )
    )
}

}

