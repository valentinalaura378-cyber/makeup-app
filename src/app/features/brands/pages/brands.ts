import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { Brand } from '../models/brand';
import { BrandsService } from '../services/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands implements OnInit {

  private brandsService = inject(BrandsService);

  brands: Brand[] = [];

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {

    console.log('================================');
    console.log('Cargando marcas...');
    console.log('================================');

    this.brandsService.getBrands().subscribe({

      next: (response) => {

        console.log('MARCAS RECIBIDAS:', response);
        console.log('CANTIDAD:', response.length);

        this.brands = response;

      },

      error: (error) => {

        console.error('ERROR API:', error);

      }

    });

  }

  createBrand(): void {

    const name = prompt(
      'Ingrese el nombre de la marca'
    );

    if (!name) {
      return;
    }

    const country = prompt(
      'Ingrese el país de origen'
    );

    if (!country) {
      return;
    }

    this.brandsService.createBrand({
      name,
      country,
      isActive: true
    }).subscribe({

      next: () => {

        alert('Marca creada correctamente');

        this.loadBrands();

      },

      error: (error) => {

        console.error(error);

        alert('Error al crear la marca');

      }

    });

  }

  editBrand(brand: Brand): void {

    const name = prompt(
      'Nombre de la marca',
      brand.name
    );

    if (!name) {
      return;
    }

    const country = prompt(
      'País de origen',
      brand.country
    );

    if (!country) {
      return;
    }

    this.brandsService.updateBrand(
      brand._id,
      {
        name,
        country,
        isActive: brand.isActive
      }
    ).subscribe({

      next: () => {

        alert('Marca actualizada');

        this.loadBrands();

      },

      error: (error) => {

        console.error(error);

        alert('Error al actualizar');

      }

    });

  }

  deleteBrand(id: string): void {

    const confirmed = confirm(
      '¿Desea eliminar esta marca?'
    );

    if (!confirmed) {
      return;
    }

    this.brandsService.deleteBrand(id)
      .subscribe({

        next: () => {

          alert('Marca eliminada');

          this.loadBrands();

        },

        error: (error) => {

          console.error(error);

          alert('Error al eliminar');

        }

      });

  }

}
