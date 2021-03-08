import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select'
import {MatSliderModule} from '@angular/material/slider'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatSortModule} from '@angular/material/sort'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatStepperModule} from '@angular/material/stepper'


import {MatNativeDateModule} from '@angular/material/core';
import {MatRippleModule} from '@angular/material/core';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';


@NgModule({
  exports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatSidenavModule,
    MatTableModule,
    MatBadgeModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,

    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTooltipModule,
    MatStepperModule,

    MatNativeDateModule,
    MatRippleModule,
    CdkTableModule,
    CdkAccordionModule,
    A11yModule,
    BidiModule,
    OverlayModule,
    PlatformModule,
    ObserversModule,
    PortalModule
  ]
})
export class MaterialModule { }
