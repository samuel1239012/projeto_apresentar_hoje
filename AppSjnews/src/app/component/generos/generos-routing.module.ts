import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
    },
    {
      path: 'login',
      loadChildren: () => import('../../screens/login/login.module').then(m => m.LoginPageModule)
    },
    // loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
    // Adicione mais rotas conforme necessário
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }