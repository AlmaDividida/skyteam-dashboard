import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GroupSaveComponent } from './pages/group-save/group-save.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { StreamTypeSaveComponent } from './pages/stream-types-save/stream-types-save.component';
import { StreamTypesComponent } from './pages/stream-types/stream-types.component';
import { StreamerSaveComponent } from './pages/streamer-save/streamer-save.component';
import { StreamersComponent } from './pages/streamers/streamers.component';

const routes: Routes = [
  {
    path: 'app', component: LayoutBlankComponent, children: [
      {
        path: '', component: LayoutComponent, children: [
          { 
            path: 'dashboard', component: DashboardComponent
          },
          { 
            path: 'groups', component: GroupsComponent
          },
          { 
            path: 'group-save', component: GroupSaveComponent
          },
          { 
            path: 'group-save/:id', component: GroupSaveComponent
          },
          { 
            path: 'streamers', component: StreamersComponent
          },
          { 
            path: 'streamer-save', component: StreamerSaveComponent
          },
          { 
            path: 'streamer-save/:id', component: StreamerSaveComponent
          },
          { 
            path: 'stream-types', component: StreamTypesComponent
          },
          { 
            path: 'stream-types-save', component: StreamTypeSaveComponent
          },
          { 
            path: 'stream-types-save/:id', component: StreamTypeSaveComponent
          },
          { 
            path: '404', component: NotFoundComponent
          },
        ]
      },
    ]
  },
  {
    path: '', redirectTo: 'app/dashboard', pathMatch: 'full'
  },
  { 
    path: '**', redirectTo: 'app/404', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
