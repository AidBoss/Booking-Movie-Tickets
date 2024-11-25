import {Injectable} from '@angular/core';
import Cookies from "js-cookie";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root',
})
export class tokensServiceLocalStorage {
  getATokenLocalStore() {
    const accessToken = localStorage.getItem('USER_TOKEN');
    return accessToken;
  }

  setATokenLocalStore(accesstToken: string): void {
    if (accesstToken) {
      localStorage.setItem('USER_TOKEN', accesstToken);
    } else {
      console.log('Không tìm thấy Access token ')
      return;
    }
  }

  removeATokenLocal() {
    console.log('Bạn xóa thành công Access token')
    localStorage.removeItem('USER_TOKEN');
  }
}
