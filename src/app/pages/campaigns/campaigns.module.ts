import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { CampaignsRoutingModule } from './campaigns.routes';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

@NgModule({
    declarations: [
        CampaignListComponent,
    ],
    imports: [
        CampaignsRoutingModule,
        SharedModule
    ]
})
export class CampaignsModule { }