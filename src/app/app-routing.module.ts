import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pageone',
    loadChildren: () => import('./pages/pageone/pageone.module').then( m => m.PageonePageModule)
  },
  {
    path: 'pagetwo',
    loadChildren: () => import('./pages/pagetwo/pagetwo.module').then( m => m.PagetwoPageModule)
  },
  {
    path: 'pagethree',
    loadChildren: () => import('./pages/pagethree/pagethree.module').then( m => m.PagethreePageModule)
  },
  {
    path: 'form1',
    loadChildren: () => import('./pages/form1/form1.module').then( m => m.Form1PageModule)
  },
  {
    path: 'form2',
    loadChildren: () => import('./pages/form2/form2.module').then( m => m.Form2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
