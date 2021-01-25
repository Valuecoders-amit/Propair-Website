import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdvisorStatsComponent } from "./advisor-stats/advisor-stats.component";
import { AdvisorOverviewComponent } from "./advisor-overview/advisor-overview.component";
import { AdvisorMilestonesComponent } from "./advisor-milestones/advisor-milestones.component";
import { AdvisorKarmaComponent } from "./advisor-karma/advisor-karma.component";
import { RouterModule } from "@angular/router";
import { advisorStatsRoutes } from "./advisor-stats.routing";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MyDatePickerModule } from "mydatepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AvgResTimePipe } from "./advisor-overview/avgResTime.pipe";

@NgModule({
  declarations: [
    AdvisorStatsComponent,
    AdvisorOverviewComponent,
    AdvisorMilestonesComponent,
    AdvisorKarmaComponent,
    AvgResTimePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(advisorStatsRoutes),
    ModalModule.forRoot(),
    MyDatePickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdvisorStatsModule {}
