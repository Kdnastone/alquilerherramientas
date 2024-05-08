import { Component, OnInit } from '@angular/core';
import { Tools } from '../../marcas/tools';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.css'
})
export class ToolListComponent implements OnInit {
  toolObj: Tools = new Tools();
  toolList: Tools[] = [];
  localKeyName: string = 'rentalTools';
  isSidePanelVisible: boolean = false;
  editingTool: Tools | null = null;
  

  ngOnInit(): void {
    const localData = localStorage.getItem('rentalTools');
    if (localData != null) {
      this.toolList = JSON.parse(localData);
    }
  }

  onSaveTool() {
    if (this.editingTool === null) {
      if (this.toolObj.toolId === 0) {
        this.toolList.unshift(this.toolObj);
      } else {
        const index = this.toolList.findIndex(tool => tool.toolId === this.toolObj.toolId);
        if (index !== -1) {
          this.toolList[index] = { ...this.toolObj };
        }
      }
    } else {
      if (this.editingTool && this.editingTool.toolId !== null) {
        const index = this.toolList.findIndex(tool => tool.toolId === this.editingTool!.toolId);
        if (index !== -1) {
          this.toolList[index] = { ...this.editingTool };
        }
      }
    }
    localStorage.setItem(this.localKeyName, JSON.stringify(this.toolList));
    this.onResetTool();
    this.editingTool = null;
  }

  onResetTool() {
    this.toolObj = new Tools();
    this.editingTool = null;
  }

  toggleSidePanel() {
    this.isSidePanelVisible = !this.isSidePanelVisible;
  }

  onDeleteTool(index: number) {
    this.toolList.splice(index, 1);
    localStorage.setItem(this.localKeyName, JSON.stringify(this.toolList));
  }

  onEditTool(tool: Tools) {
    this.editingTool = { ...tool };
  }

  onCancelEdit() {
    this.editingTool = null;
  }
}
