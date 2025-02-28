import { Component , OnInit } from '@angular/core';
import { ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexFill, NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nadador } from '../models/nadador';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-swimming-pool',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgApexchartsModule ,NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './swimming-pool.component.html',
  styleUrl: './swimming-pool.component.css'
})
export class SwimmingPoolComponent implements OnInit {
  chartOptions: any;
  meta = 10000;
  // Datos de los nadadores
  nadadores: Nadador[] = [
    { nombre: 'Claudia', meta: this.meta, acumulado: 6000, foto: '../../../public/nadador.svg' },
    { nombre: 'Andrea', meta: this.meta, acumulado: 9000, foto: '../../../public/nadador.svg' },
    { nombre: 'Paola', meta: this.meta, acumulado: 3000, foto: '../../../public/nadador.svg' },
    { nombre: 'Carolina', meta: this.meta, acumulado: 1000, foto: '../../../public/nadador.svg' },
    { nombre: 'Jhon', meta: this.meta, acumulado: 1500, foto: '../../../public/nadador.svg' }
  ];
  constructor() { }
  ngOnInit() {
    this.crearGrafico();
   }

  crearGrafico() {
    const nombres = this.nadadores.map(n => n.nombre);
    const avances = this.nadadores.map(n => Math.round((n.acumulado / this.meta) * 100));
    const fotos = this.nadadores.map(n => n.foto);

    this.chartOptions = {
      chart: {
        type: 'bar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 2000
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
        max: 100,
        labels: {
          style: {
            fontSize: '18px',  // Aumenta el tamaño del texto
            fontWeight: 'bold',
            colors: ['#FF5733'] // Cambia el color (puedes usar HEX, RGB o nombre de color)
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '18px',  // Aumenta el tamaño del texto
            fontWeight: 'bold',
            colors: ['#FF5733'] // Cambia el color (puedes usar HEX, RGB o nombre de color)
          }
        }
      },
      dataLabels: {
        enabled: true,
        useHTML: true,
        formatter: (val: number, opts: any) => {
          const index = opts.dataPointIndex;
          return `${val}%`;
        },
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#000']
        }
      },
      series: [{
        name: 'Progreso',
        data: avances
      }],
      fill: {
        colors: ['#007bff', '#28a745', '#dc3545']
      }
    };
  }

}
