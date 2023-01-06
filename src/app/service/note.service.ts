import { Notes } from './../notes';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fs: Firestore) { }

  addNote(note: Notes) {
    note.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'Notes'),note)
  }

  getNotes():Observable<Notes[]> {
    let noteRef = collection(this.fs, 'Notes');
    return collectionData(noteRef, { idField: 'id' }) as Observable<Notes[]>;
  }

  deleteNote(note: Notes) {
    let docRef = doc(this.fs, `Notes/${note.id}`);
    return deleteDoc(docRef);
  }

  updateNote(note: Notes, notes: any) {
    let docRef = doc(this.fs, `Notes/${note.id}`);
    return updateDoc(docRef, notes);
  }
}
