import { Component, OnInit } from '@angular/core';
import {Chart, ChartConfiguration, ChartOptions, ChartType, registerables} from "chart.js";
import {StatisticService} from "../service/statistic-service/statistic.service";
import {RevenueStats} from "../model/RevenueStats";
import {FinishTimeStats} from "../model/FinishTimeStats";
import {OrderCountStats} from "../model/OrderCountStats";
import {RestaurantDataShorten} from "../model/response/RestaurantDataShorten";
import {RestaurantService} from "../service/restaurant-service/restaurant.service";

Chart.register(...registerables);

@Component({
  selector: 'app-restaurant-statistics',
  templateUrl: './restaurant-statistics.component.html',
  styleUrls: ['./restaurant-statistics.component.css']
})
export class RestaurantStatisticsComponent implements OnInit {
  selectedRestaurantId: number | null = null; // Selected restaurant ID
  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now() + 5);

  revenueStats: RevenueStats[] = [];
  finishTimeStats: FinishTimeStats[] = [];
  orderCountStats: OrderCountStats[] = [];
  userRestaurants: RestaurantDataShorten[] = [];

  selectedChartType: 'amount_of_money' | 'average_finish_time' | 'order_count' = 'amount_of_money';
  chartType: ChartType = 'line';
  isChartVisible: boolean = false;

  chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: '',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      }
    ],
    labels: []
  };

  chartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(private statisticService: StatisticService,
              private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.updateChart();
    this.restaurantService.getUsersRestaurants().subscribe({
      next: (response) => {
        this.userRestaurants = response;
      },
      error: (error) => {
        console.error('Error fetching restaurants:', error);
      },
    });
  }

  updateChart(): void {
    console.log("my chart: " + this.selectedChartType);
    if (this.selectedRestaurantId) {
      const startDateString = this.startDate ? this.startDate.toISOString() : '';
      const endDateString = this.endDate ? this.endDate.toISOString() : '';

      switch (this.selectedChartType) {
        case 'amount_of_money':
          this.fetchRevenueData(this.selectedRestaurantId, startDateString, endDateString);
          this.updateChartData();
          break;
        case 'average_finish_time':
          this.fetchFinishTimeData(this.selectedRestaurantId, startDateString, endDateString);
          this.updateChartData();
          break;
        case 'order_count':
          this.fetchOrderCountData(this.selectedRestaurantId, startDateString, endDateString);
          this.updateChartData();
          break;
        default:
          console.error('Invalid chart type selected');
          break;
      }
    }
  }

  onToggleChange(isChecked: boolean): void {
    if (isChecked && this.selectedRestaurantId) {
      const startDateString = this.startDate ? this.startDate.toISOString() : '';
      const endDateString = this.endDate ? this.endDate.toISOString() : '';

      switch (this.selectedChartType) {
        case 'amount_of_money':
          this.fetchRevenueData(this.selectedRestaurantId, startDateString, endDateString);
          break;
        case 'average_finish_time':
          this.fetchFinishTimeData(this.selectedRestaurantId, startDateString, endDateString);
          break;
        case 'order_count':
          this.fetchOrderCountData(this.selectedRestaurantId, startDateString, endDateString);
          break;
        default:
          console.error('Invalid chart type selected');
          break;
      }
    }
  }

  fetchRevenueData(restaurantId: number, startDate: string, endDate: string): void {
    this.statisticService.getDailyRevenue(restaurantId, startDate, endDate).subscribe({
      next: (data) => {
        this.revenueStats = data;
        console.log('Fetched revenue data:', data);
        this.updateChartData();
      },
      error: (err) => {
        console.error('Error fetching revenue data:', err);
      }
    });
  }

  fetchFinishTimeData(restaurantId: number, startDate: string, endDate: string): void {
    this.statisticService.getDailyFinishTime(restaurantId, startDate, endDate).subscribe({
      next: (data) => {
        this.finishTimeStats = data;
        console.log(data);
        this.updateChartData(); // Call updateChartData after data is available
      },
      error: (err) => {
        console.error('Error fetching finish time data:', err);
      }
    });
  }

  fetchOrderCountData(restaurantId: number, startDate: string, endDate: string): void {
    this.statisticService.getDailyOrderCount(restaurantId, startDate, endDate).subscribe({
      next: (data) => {
        this.orderCountStats = data;
        console.log(data);
        this.updateChartData();
      },
      error: (err) => {
        console.error('Error fetching order count data:', err);
      }
    });
  }


  updateChartData() {
    if (this.selectedChartType === 'amount_of_money' && this.revenueStats.length > 0) {
      const revenueData = this.revenueStats.map(stat => stat.revenue);
      const labels = this.revenueStats.map(stat => new Date(stat.date).toISOString().split('T')[0]);
      this.chartData.datasets[0].data = revenueData as any[];
      this.chartData.datasets[0].label = 'Revenue';
      this.chartData.labels = labels;
    } else if (this.selectedChartType === 'average_finish_time' && this.finishTimeStats.length > 0) {
      const finishTimeData = this.finishTimeStats.map(stat => stat.averageFinishTime);
      const labels = this.finishTimeStats.map(stat => stat.date);

      this.chartData.datasets[0].data = finishTimeData as any[];
      this.chartData.datasets[0].label = 'Average Finish Time';
      this.chartData.labels = labels;
    } else if (this.selectedChartType === 'order_count' && this.orderCountStats.length > 0) {
      const orderCountData = this.orderCountStats.map(stat => stat.ordersCount);
      const labels = this.orderCountStats.map(stat => stat.date);
      this.chartData.datasets[0].data = orderCountData as any[];
      this.chartData.datasets[0].label = 'Order Count';
      this.chartData.labels = labels;
    }
  }

  onChartTypeChange() {
    if (this.selectedChartType === 'amount_of_money') {
      this.chartType = 'line';
    } else if (this.selectedChartType === 'average_finish_time') {
      this.chartType = 'bar';
    } else if (this.selectedChartType === 'order_count') {
      this.chartType = 'pie';
    }
    this.updateChartData();
  }

  onRestaurantChange(): void {

  }
}

// statystyki ->  DONE
// po dodaniu zamowienia koszyk pusty -> IN PROGRESS
// kafka connection failure -> IN PROGRESS
// logowanie social media -> WAITING
// chat z restauracjami z order -> WAITING
