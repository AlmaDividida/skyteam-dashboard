import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NotFoundComponent } from './layout/not-found/not-found.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupSaveComponent } from './pages/group-save/group-save.component';
import { environment } from 'src/environments/environment';
import { StreamersComponent } from './pages/streamers/streamers.component';
import { StreamerSaveComponent } from './pages/streamer-save/streamer-save.component';
import { StreamTypesComponent } from './pages/stream-types/stream-types.component';
import { StreamTypeSaveComponent } from './pages/stream-types-save/stream-types-save.component';
import { HorariosComponent } from './pages/horarios/horarios.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    NotFoundComponent,
    DashboardComponent,
    FooterComponent,
    LayoutBlankComponent,
    GroupsComponent,
    GroupSaveComponent,
    StreamersComponent,
    StreamerSaveComponent,
    StreamTypesComponent,
    StreamTypeSaveComponent,
    HorariosComponent
  ],
  imports: [ 
    MbscModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
