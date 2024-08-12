import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Box, Option } from '../models/Box.model';

@Injectable({ providedIn: 'root' })
export class StateService {

    private boxesState: BehaviorSubject<Box[]> = new BehaviorSubject<Box[]>([]);
    private keyState = 'boxesState';

    constructor() {
        const savedState = localStorage.getItem(this.keyState);
        this.boxesState.next(
            savedState ? JSON.parse(savedState) : this.initializeBoxes()
        );
    }

    private updateBox = (id: number, selectedOption: Option, lastIndex: number) => (box: Box): Box => ({
        ...box,
        selectedOption: (box.id === id) ? selectedOption : box.selectedOption,
        selected: (box.id === id)
            ? (id === lastIndex)
            : (box.id === id + 1 && id !== lastIndex)
    });

    private initializeBoxes(): Box[] {
        return Array.from({ length: 10 }, (_, index) => ({
            id: index,
            selectedOption: null,
            selected: false,
            options: Array.from({ length: 10 }, (_, optionIndex) => ({
                id: optionIndex + 1,
                name: `Option ${index * 10 + optionIndex + 1}`,
                value: index * (optionIndex + 1) + (optionIndex + 1.5),
            })),
        }));
    }

    getBoxesState(): Observable<Box[]> {
        return this.boxesState.asObservable();
    }

    updateBoxState(id: number, selectedOption: Option) {
        const currentState = this.boxesState.getValue();
        const lastIndex = currentState.length - 1;
        const updatedBoxes = currentState.map(this.updateBox(id, selectedOption, lastIndex));
        this.boxesState.next(updatedBoxes);
        this.saveState(updatedBoxes);
    }

    selectBoxState(id: number) {
        const updatedBoxes = this.boxesState.getValue().map((box) => ({ ...box, selected: box.id === id }));
        this.boxesState.next(updatedBoxes);
        this.saveState(updatedBoxes);
    }

    resetState() {
        const initialState = this.initializeBoxes();
        this.boxesState.next(initialState);
        this.saveState(initialState);
    }

    private saveState(state: Box[]) {
        localStorage.setItem(this.keyState, JSON.stringify(state));
    }
}
