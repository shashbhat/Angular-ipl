import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { NewsComponent } from './news/news.component';
import { NewsModule } from './news/news.module';



const routes: Routes = [

  {
    path:"",
    component: HomeComponent,
    pathMatch: "full"

  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'team',
    component: TeamComponent
  },
  {
    path:'news',
    loadChildren:()=>import('./news/news.module').then(m=>m.NewsModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
