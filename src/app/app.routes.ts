import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListaSessoesComponent } from './features/sessoes/pages/lista-sessoes/lista-sessoes.component';
import { NovaSessaoComponent } from './features/sessoes/pages/nova-sessao/nova-sessao.component';
import { DetalheSessaoComponent } from './features/sessoes/pages/detalhe-sessao/detalhe-sessao.component';
import { FeedPostagensComponent } from './features/postagens/pages/feed-postagens/feed-postagens.component';
import { DetalhePostagemComponent } from './features/postagens/pages/detalhe-postagem/detalhe-postagem.component';
import { ListaConteudosComponent } from './features/conteudos/pages/lista-conteudos/lista-conteudos.component';
import { DetalheConteudoComponent } from './features/conteudos/pages/detalhe-conteudo/detalhe-conteudo.component';
import { PerfilComponent } from './features/perfil/perfil.component';
import { AdminComponent } from './features/admin/admin.component';
import { DocsComponent } from './features/docs/docs.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sessoes', component: ListaSessoesComponent },
      { path: 'sessoes/nova', component: NovaSessaoComponent },
      { path: 'sessoes/:id', component: DetalheSessaoComponent },
      { path: 'postagens', component: FeedPostagensComponent },
      { path: 'postagens/:id', component: DetalhePostagemComponent },
      { path: 'conteudos', component: ListaConteudosComponent },
      { path: 'conteudos/:id', component: DetalheConteudoComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'docs', component: DocsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
