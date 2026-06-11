import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { Category } from '../models/category';
import { CategoriesService } from '../services/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {

  private categoriesService = inject(CategoriesService);

  categories: Category[] = [];

  ngOnInit(): void {

    console.log('CATEGORIES FUNCIONANDO');

    this.loadCategories();

  }
loadCategories(): void {

  console.log('================================');
  console.log('CARGANDO CATEGORIAS');
  console.log('================================');

  this.categoriesService
    .getCategories()
    .subscribe({

      next: (response) => {

        console.log('CATEGORIAS:', response);

        this.categories = response;

      },

      error: (error) => {

        console.error(
          'ERROR CATEGORIAS:',
          error
        );

      }

    });

}

  createCategory(): void {

    console.log('CLICK CREATE');

    const name = prompt(
      'Nombre de la categoría'
    );

    if (!name) {
      return;
    }

    const description = prompt(
      'Descripción'
    ) || undefined;

    this.categoriesService
      .createCategory({
        name,
        description,
        isActive: true
      })
      .subscribe({

        next: (response) => {

          console.log('CATEGORIA CREADA:', response);

          alert(
            'Categoría creada correctamente'
          );

          this.loadCategories();

        },

        error: (error) => {

          console.error(
            'ERROR CREANDO:',
            error
          );

          alert(
            'Error al crear la categoría'
          );

        }

      });

  }

  editCategory(
    category: Category
  ): void {

    console.log(
      'CLICK EDIT',
      category
    );

    const name = prompt(
      'Nombre',
      category.name
    );

    if (!name) {
      return;
    }

    const description = prompt(
      'Descripción',
      category.description || ''
    ) || undefined;

    this.categoriesService
      .updateCategory(
        category._id,
        {
          name,
          description,
          isActive: category.isActive
        }
      )
      .subscribe({

        next: (response) => {

          console.log(
            'CATEGORIA ACTUALIZADA:',
            response
          );

          alert(
            'Categoría actualizada'
          );

          this.loadCategories();

        },

        error: (error) => {

          console.error(
            'ERROR ACTUALIZANDO:',
            error
          );

          alert(
            'Error al actualizar'
          );

        }

      });

  }

  deleteCategory(
    id: string
  ): void {

    console.log(
      'CLICK DELETE',
      id
    );

    const confirmed = confirm(
      '¿Eliminar categoría?'
    );

    if (!confirmed) {
      return;
    }

    this.categoriesService
      .deleteCategory(id)
      .subscribe({

        next: (response) => {

          console.log(
            'CATEGORIA ELIMINADA:',
            response
          );

          alert(
            'Categoría eliminada'
          );

          this.loadCategories();

        },

        error: (error) => {

          console.error(
            'ERROR ELIMINANDO:',
            error
          );

          alert(
            'Error al eliminar'
          );

        }

      });

      

  }
  getCategoryIcon(name: string): string {

  const category = name.toLowerCase();

  if (category.includes('labial')) {
    return '💄';
  }

  if (category.includes('sombra')) {
    return '👁️';
  }

  if (category.includes('rubor')) {
    return '🌸';
  }

  if (category.includes('brocha')) {
    return '🖌️';
  }

  if (category.includes('iluminador')) {
    return '✨';
  }

  if (category.includes('esmalte')) {
    return '💅';
  }

  return '📂';

}

}