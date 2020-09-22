import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

export const routes: Routes = [
    {
        path: '',
        component: CampaignListComponent,
        data: { title: 'Campañas' }
    },
    {
        path: 'new',
        component: CampaignListComponent,
        data: { title: 'Nueva Campaña' }
    },
    {
        path: 'update/:id',
        component: CampaignListComponent,
        data: { title: 'Actualizar Campaña' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignsRoutingModule { }