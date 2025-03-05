import { Component , OnInit } from '@angular/core';
import { ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexFill, NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nadador } from '../models/nadador';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-swimming-pool',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgApexchartsModule ,NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './swimming-pool.component.html',
  styleUrl: './swimming-pool.component.css'
})
export class SwimmingPoolComponent implements OnInit {
  chartOptions: any;
  meta = 10000;
  // Datos de los nadadores
  nadadores: Nadador[] = [
    { nombre: 'Claudia', meta: this.meta, acumulado: 6000, foto: '../../assets/nadador.svg' },
    { nombre: 'Andrea', meta: this.meta, acumulado: 9000, foto: '../../assets/nadador.svg' },
    { nombre: 'Paola', meta: this.meta, acumulado: 3000, foto: '../../assets/nadador.svg' },
    { nombre: 'Carolina', meta: this.meta, acumulado: 1000, foto: '../../assets/nadador.svg' },
    { nombre: 'Jhon', meta: this.meta, acumulado: 1500, foto: '../../assets/nadador.svg' }
  ];
  constructor() { }
  ngOnInit() {
    this.crearGrafico();
   }

  crearGrafico() {
    const nombres = this.nadadores.map(n => n.nombre);
    const avances = this.nadadores.map(n => Math.round((n.acumulado / n.meta) * 100));
    const acumulados = this.nadadores.map(n => n.acumulado);
    const metas = this.nadadores.map(n => n.meta / n.meta * 100);
    const fotos = this.nadadores.map(n => n.foto);
    const background = '../../../public/piscina.jpg';

    const data = this.nadadores.map((n, i) => {
      return {
        x: nombres[i],
        y: avances[i],
        goals: [
          {
            name: 'Meta',
            value: metas[i] ,
            strokeWidth: 10,
            strokeHeight: 10,
            strokeColor: '#6fc54c',
            image: fotos[i]
          }
        ]
      };
    }
    );

    this.chartOptions = {
      chart: {
        height: 420,
        type: 'bar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 2000,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true, // Barras horizontales
          borderRadius: 5
        }
      },
      xaxis: {
        categories: nombres,
        max: 110,
        labels: {
          style: {
            fontSize: '18px',  // Aumenta el tamaño del texto
            fontWeight: 'bold',
            colors: ['#4e3150'] // Cambia el color (puedes usar HEX, RGB o nombre de color)
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '18px',  // Aumenta el tamaño del texto
            fontWeight: 'bold',
            colors: ['#33237'] // Cambia el color (puedes usar HEX, RGB o nombre de color)
          }
        }
      },
      dataLabels: {
        enabled: true,
        useHTML: true,
        formatter: function(val:number, opt:any) {
            const goals =
              opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                .goals

            /*if (goals && goals.length) {
              return `${val} / ${goals[0].value}`
            }*/
           return `$${acumulados[opt.dataPointIndex]} - ${val}% `;
        },
        Legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Progreso', 'Expected'],
        },
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#000']
        }
      },
      series: [{
        name: 'Progreso',
        data: data
      }
      ],
      fill: {
        colors: ['#fbf6b5', '#28a745', '#dc3545']
      }
    };
  }

}
