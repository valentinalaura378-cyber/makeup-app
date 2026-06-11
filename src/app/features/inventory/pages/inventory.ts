import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss']
})
export class InventoryComponent implements OnInit {  
  private inventoryService = inject(InventoryService);
  items: Inventory[] = [];

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventories().subscribe({
      next: (res: Inventory[]) => this.items = res,
      error: (err: any) => console.error('Error cargando inventario', err)
    });
  }

  createItem(): void {
    const productName = prompt('Producto');
    if (!productName) return;
    const quantity = Number(prompt('Cantidad')) || 0;
    const location = prompt('Ubicación') || '';

    this.inventoryService.createInventory({ productName, quantity, location, isActive: true })
      .subscribe({
        next: () => { alert('Producto agregado'); this.loadInventory(); },
        error: (err) => { console.error('Error creando producto', err); alert('Error al crear'); }
      });
  }

  editItem(item: Inventory): void {
    const productName = prompt('Producto', item.productName);
    if (!productName) return;
    const quantity = Number(prompt('Cantidad', item.quantity.toString())) || item.quantity;
    const location = prompt('Ubicación', item.location || '') || '';

    this.inventoryService.updateInventory(item._id!, { productName, quantity, location, isActive: item.isActive })
      .subscribe({
        next: () => { alert('Producto actualizado'); this.loadInventory(); },
        error: (err) => { console.error('Error actualizando producto', err); alert('Error al actualizar'); }
      });
  }

  deleteItem(id: string): void {
    if (!confirm('Eliminar producto?')) return;

    this.inventoryService.deleteInventory(id).subscribe({
      next: () => { alert('Producto eliminado'); this.loadInventory(); },
      error: (err) => { console.error('Error eliminando producto', err); alert('Error al eliminar'); }
    });
  }
}