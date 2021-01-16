import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchParam : string;
  allResults : Array<any>;
  searchResults : Array<any>;
  errorPage : boolean = false;
  privateSearchResults : Array<any>;

  constructor(private activatedRoute : ActivatedRoute, private ImagesService : ImagesService) { }

  ngOnInit(): void 
  {
    
    this.activatedRoute.queryParams.subscribe(
      (qp) => 
      { 
        this.searchParam = qp.q;

        this.ImagesService.GetImages().subscribe(
          (data) => 
          {
            this.allResults = data;
            this.searchResults = this.allResults.filter(
              x => 
              {
                return x.title.toLocaleLowerCase().includes(qp.q.toLocaleLowerCase()) || 
                x.tags.toLocaleLowerCase().includes(qp.q.toLocaleLowerCase());
              });

            this.privateSearchResults = this.searchResults.filter(
              x => 
              {
                return x.status != "Private";
              });

                
            if(this.privateSearchResults.length != 0){
              this.errorPage = false;
            }
            else{
              this.errorPage = true;
            }
            
          })
      })
  }

}
