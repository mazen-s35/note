import { Notes } from './../notes';
import { NoteService } from './../service/note.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  closeResult = '';
  noteForm!: FormGroup;
  editForm!: FormGroup;
  noteDetails: any;
  noteData: any = [];
  noteObj: Notes = {
    id: '',
    note_title: '',
    note_dec: '',
  };

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private noteService: NoteService,
    private spinner: NgxSpinnerService
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      edit_title: ['', Validators.required],
      edit_description: ['', Validators.required],
    });
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllNotes();
  }

  detailsNote(note: Notes) {
    this.noteDetails = note;
    console.log(this.noteDetails);
  }

  addNote() {
    const { value } = this.noteForm;
    console.log(value);
    this.noteObj.id = '';
    this.noteObj.note_title = value.title;
    this.noteObj.note_dec = value.description;

    this.noteService.addNote(this.noteObj).then((note) => {
      if (note) {
        alert('Note Added Successfully');
      }
      this.noteForm.reset();
    });
  }

  deleteNote(note: Notes) {
    let decision = confirm('Are you sure want to delete this note?!');
    if (decision == true) {
      this.noteService.deleteNote(note);
    }
  }

  getAllNotes() {
    this.spinner.show();
    this.noteService.getNotes().subscribe((res: Notes[]) => {
      console.log(res);
      this.noteData = res;
      this.spinner.hide();
    });
  }

  updateNote(note: Notes) {
    const { value } = this.editForm;
    console.log(value);
    (this.noteObj.id = note.id),
      (this.noteObj.note_title = value.edit_title),
      (this.noteObj.note_dec = value.edit_description);
    this.noteService.updateNote(note, this.noteObj).then(() => {
      alert('Update is Successfully');
    });
    this.editForm.reset();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openOne(edit: any) {
    this.modalService
      .open(edit, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
