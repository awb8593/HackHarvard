import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() formData: { name: string, phoneNumber: string } = { name: '', phoneNumber: '' };
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submitFormEvent = new EventEmitter<any>(); // Event for form submission

  closeModal() {
    this.closeModalEvent.emit();
  }

  submitForm() {
    // Emit an event with the form data for the parent component to handle
    this.submitFormEvent.emit(this.formData);
  }
}
