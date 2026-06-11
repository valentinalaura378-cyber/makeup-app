import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MakeupsService } from '../services/makeup.service';
import { Makeup } from '../models/makeup';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-makeups',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './makeups.html',
  styleUrls: ['./makeups.scss']
})
export class Makeups implements OnInit {

  makeups: Makeup[] = [];

  constructor(private makeupsService: MakeupsService) {}

  ngOnInit(): void {
    this.loadMakeups();
  }

  loadMakeups(): void {
    this.makeupsService.getMakeups().subscribe({
      next: (response: Makeup[]) => this.makeups = response,
      error: (err: HttpErrorResponse) => console.error('Error cargando makeups', err)
    });
  }

  createMakeup(): void {
    const name = prompt('Nombre del producto');
    if (!name) return;

    const price = Number(prompt('Precio'));
    const brand = prompt('Marca') || '';
    const category = prompt('Categoría') || '';
    const stock = Number(prompt('Stock'));

    this.makeupsService.createMakeup({ name, price, brand, category, stock, isActive: true })
      .subscribe({
        next: () => {
          alert('Producto creado correctamente');
          this.loadMakeups();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error creando makeup', err);
          alert('Error al crear producto');
        }
      });
  }

  editMakeup(makeup: Makeup): void {
    const name = prompt('Nombre', makeup.name);
    if (!name) return;

    const price = Number(prompt('Precio', makeup.price.toString()));
    const brand = prompt('Marca', makeup.brand) || '';
    const category = prompt('Categoría', makeup.category) || '';
    const stock = Number(prompt('Stock', makeup.stock.toString()));

    this.makeupsService.updateMakeup(makeup._id!, { name, price, brand, category, stock, isActive: makeup.isActive })
      .subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.loadMakeups();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error actualizando makeup', err);
          alert('Error al actualizar producto');
        }
      });
  }

  deleteMakeup(id: string): void {
    if (!confirm('¿Eliminar producto?')) return;

    this.makeupsService.deleteMakeup(id).subscribe({
      next: () => {
        alert('Producto eliminado correctamente');
        this.loadMakeups();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error eliminando makeup', err);
        alert('Error al eliminar producto');
      }
    });
  }

  getEmoji(category: string): string {
    const value = category.toLowerCase();
    if (value.includes('labial')) return '💄';
    if (value.includes('sombra')) return '👁️';
    if (value.includes('rubor')) return '🌸';
    if (value.includes('base')) return '🧴';
    if (value.includes('brocha')) return '🖌️';
    if (value.includes('iluminador')) return '✨';
    return '💋';
  }
}