import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-deletemodal',
  imports: [],
  templateUrl: './deletemodal.component.html',
  styleUrl: './deletemodal.component.css',
})
export class DeletemodalComponent {
  isVisible = input<boolean>();
  cancelOutput = output({ alias: 'cancel' });
  deleteOutput = output({ alias: 'delete' });

  onCancel() {
    this.cancelOutput.emit();
  }
  onDelete() {
    this.deleteOutput.emit();
  }
}
