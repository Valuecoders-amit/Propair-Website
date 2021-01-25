import { Routes } from '@angular/router';
import { AdvisorStatsComponent } from './advisor-stats/advisor-stats.component';
import { AdvisorOverviewComponent } from './advisor-overview/advisor-overview.component';
import { AdvisorMilestonesComponent } from './advisor-milestones/advisor-milestones.component';
import { AdvisorKarmaComponent } from './advisor-karma/advisor-karma.component';


 export const advisorStatsRoutes:Routes=[
    
    {
      path: '',
      component: AdvisorStatsComponent,
      children: [
        {
          path: '',
          redirectTo: 'stats-overview',
          pathMatch: 'full'
        },
        {
          path: 'stats-overview',
          component: AdvisorOverviewComponent
        },
        {
          path: 'stats-milestone',
          component: AdvisorMilestonesComponent
        },
        {
          path: 'stats-karma',
          component: AdvisorKarmaComponent

        },
        
       
      ]
    }
  ]



