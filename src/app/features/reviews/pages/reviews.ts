import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../services/review.service';
import { Review } from '../models/review';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.scss']
})
export class Reviews implements OnInit {

  private reviewsService = inject(ReviewsService);
  reviews: Review[] = [];

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewsService.getReviews().subscribe({
      next: (res: Review[]) => {
        this.reviews = res;
      },
      error: (err: any) => {
        console.error('Error cargando reviews', err);
      }
    });
  }

  createReview(): void {
    const user = prompt('Usuario');
    if (!user) return;

    const comment = prompt('Comentario') || '';
    const rating = Number(prompt('Calificación')) || 0;

    this.reviewsService.createReview({ user, comment, rating, isActive: true })
      .subscribe({
        next: (res: Review) => {
          alert('Review creada correctamente');
          this.loadReviews();
        },
        error: (err: any) => {
          console.error('Error creando review', err);
          alert('Error al crear review');
        }
      });
  }

  editReview(review: Review): void {
    const comment = prompt('Comentario', review.comment);
    if (!comment) return;

    const rating = Number(prompt('Calificación', review.rating.toString())) || review.rating;

    this.reviewsService.updateReview(review._id!, { comment, rating, isActive: review.isActive })
      .subscribe({
        next: (res: Review) => {
          alert('Review actualizada correctamente');
          this.loadReviews();
        },
        error: (err: any) => {
          console.error('Error actualizando review', err);
          alert('Error al actualizar review');
        }
      });
  }

  deleteReview(id: string): void {
    if (!confirm('¿Eliminar review?')) return;

    this.reviewsService.deleteReview(id)
      .subscribe({
        next: () => {
          alert('Review eliminada correctamente');
          this.loadReviews();
        },
        error: (err: any) => {
          console.error('Error eliminando review', err);
          alert('Error al eliminar review');
        }
      });
  }

  getRatingStars(rating: number): string {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}