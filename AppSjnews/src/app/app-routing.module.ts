import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./screens/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'fav',
    loadChildren: () => import('./screens/fav/fav.module').then( m => m.FavPageModule)
  },
  {
    path: 'noticia',
    loadChildren: () => import('./screens/noticia/noticia.module').then( m => m.NoticiaPageModule)
  },
  {
    path: 'notificao',
    loadChildren: () => import('./screens/notificao/notificao.module').then( m => m.NotificaoPageModule)
  },
  {
    path: 'pesquisa',
    loadChildren: () => import('./screens/pesquisa/pesquisa.module').then( m => m.PesquisaPageModule)
  },
  {
    path: 'ler',
    loadChildren: () => import('./screens/ler/ler.module').then( m => m.LerPageModule)
  },
  {
    path: 'ler/:id',
    loadChildren: () => import('./screens/ler/ler.module').then( m => m.LerPageModule) // Make sure this points to the correct module
  },
  {
    path: 'noticias',
    loadChildren: () => import('./screens/noticias/noticias.module').then( m => m.NoticiasPageModule) // Make sure this points to the correct module
  },
  {
    path: 'teste',
    loadChildren: () => import('./screens/teste/teste.module').then( m => m.TestePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
