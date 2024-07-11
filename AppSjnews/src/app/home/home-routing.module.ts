import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'favorite',
        loadChildren: () => import('../screens/fav/fav.module').then( m => m.FavPageModule)
      },
      {
        path: 'noticia',
        loadChildren: () => import('../screens/noticia/noticia.module').then( m => m.NoticiaPageModule)
      },
      {
        path: 'notificao',
        loadChildren: () => import('../screens/notificao/notificao.module').then( m => m.NotificaoPageModule)
      },
      {
        path: 'pesquisa',
        loadChildren: () => import('../screens/pesquisa/pesquisa.module').then( m => m.PesquisaPageModule)
      },
      {
        path: 'ler',
        loadChildren: () => import('../screens/ler/ler.module').then( m => m.LerPageModule)
      },
      {
        path: 'ler/:id',
        loadChildren: () => import('../screens/ler/ler.module').then( m => m.LerPageModule) // Make sure this points to the correct module
      },
      
      {
        path:'',
        redirectTo:'noticia',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
