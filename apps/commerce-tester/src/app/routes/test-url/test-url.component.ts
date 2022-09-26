import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'dontcode-test-url',
  templateUrl: './test-url.component.html',
  styleUrls: ['./test-url.component.scss'],
})
export class TestUrlComponent implements OnDestroy {
  testUrl: string|null = null;
  testResponse: HttpResponse<string>|null = null;
  testError: string | null=null;

  subscription = new Subscription();

  constructor(
    protected httpClient:HttpClient,
    protected ref: ChangeDetectorRef
    ) {
  }

  tryUrl() {
    if (this.testUrl!=null) {
      const coreHeaders= new HttpHeaders({
        'Access-Control-Allow-Origin':'localhost:5001',
        'Accept':'text/html'
      });

      this.subscription.add(this.httpClient.get("https://corsproxy.io/?"+encodeURIComponent(this.testUrl), {headers:coreHeaders, observe:"response", responseType:"text"}).subscribe({
          next: (value) => {
            this.testResponse=value;
            console.debug("Result for "+this.testUrl+":", this.testResponse);
            this.ref.markForCheck();
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              this.testError=(error as HttpErrorResponse).message;
            } else {
              this.testError = error.toString();
            }
            console.error("Error loading testUrl "+this.testUrl+':',error);
            this.ref.markForCheck();
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
