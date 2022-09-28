//NgDependencies
import { Component, OnInit, ViewChild } from '@angular/core';
//Local dependencies
import { ErgService } from '../_services/erg.service';
import { ERG } from '../_models/erg.model';
//Thirs party dependencies
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private ergService: ErgService) {}
  ergs: ERG[] = [];
  ergMemberCount: number = 0;
  chartLabels: string[] = [];
  labelData: number[] = [];

  async ngOnInit() {
    await this.ergDataSetup();
  }
  //Bar chart options
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    datasets: {
      bar: {
        hoverBackgroundColor: '#ffb247',
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 5,
      },
    },

    backgroundColor: '#3248f3',
    plugins: {
      tooltip: {
        callbacks: {
          labelColor(tooltipItem) {
            return {
              borderColor: '#ffb247',
              backgroundColor: '#ffb247',
            };
          },
        },
      },
      legend: {
        display: true,
        labels: {},
      },

      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartType: ChartType = 'bar';
  //Use barchart plugin for custom styles
  public barChartPlugins = [DataLabelsPlugin];
  //Bar chart data is assigned to class properties
  public barChartData: ChartData<'bar'> = {
    labels: this.chartLabels,

    datasets: [{ data: this.labelData, label: 'OVERALL MEMBERSHIP' }],
  };
  //Chart events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;

    active?: {}[];
  }): void {
    console.log(event, active);
  }

  /**
   * Code re-use warning, Jesse, can we consolidate this in the service?!!!
   * Subscribes to data service, will assign class ergs from ergService subject.
   * Assigns ergMember count based on the accumulation of numberOfMembers of all ERGs.
   *
   * @returns {Promise<void>} Returns void
   */
  async ergDataSetup(): Promise<void> {
    try {
      this.ergService.ergSubject$.subscribe((ergs) => {
        if (ergs != null) {
          this.ergs = ergs;
          //Reset memberCount, otherwise the value (state) is saved and re-added in the addition of another ERG.
          let memberCount = 0;
          this.ergs.forEach((erg) => {
            memberCount += erg.numberOfMembers;
            this.chartLabels.push(erg.name);
            this.labelData.push(erg.numberOfMembers);
          });
          this.ergMemberCount = memberCount;
        }
        this.chart?.update();
      });
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
