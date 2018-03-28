import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

    private baseFileServerUrl = 'localhost:3000';


    getBaseFileServerUrl() {
      return this.baseFileServerUrl;
    }

}
