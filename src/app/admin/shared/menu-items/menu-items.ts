import { Injectable } from '@angular/core';

export interface Menu {
  name: string;
  type: string;
  icon: string;
  path: string
}

const MENUITEMS = [
  { type: 'link', name: 'Dashboard', icon: 'crop_7_5', path: './' },
  { name: 'Users', type: 'link', icon: 'av_timer', path: './users' },
  { type: 'link', name: 'Products', icon: 'crop_7_5', path: './products' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
