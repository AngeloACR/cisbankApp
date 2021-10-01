import { Component, OnInit } from "@angular/core";
import { DatePipe, formatNumber } from "@angular/common";
import { DataHandlerService } from "../../services/data-handler.service";

@Component({
  selector: "app-mod1",
  templateUrl: "./mod1.component.html",
  styleUrls: ["./mod1.component.css"],
})
export class Mod1Component implements OnInit {
  showB: boolean;
  showM: boolean;

  banks: {
    bAlias: string;
    bBank: string;
    bNumber: string;
    bBalance: string;
  }[] = new Array();

  moves: {
    mDate: string;
    mDesc: string;
    mCode: string;
    mNature: string;
    mAmmount: number;
    mOld: number;
    mNew: number;
  }[] = new Array();

  constructor(private data: DataHandlerService) {}

  async ngOnInit() {
    this.data.updateBs();

    var auxB = await this.data.getServerBanks();
    if (auxB == null) {
      this.showB = false;
    } else {
      for (let bank of auxB) {
        //bank.bBalance = formatNumber(bank.bBalance,'es-VE');
        this.banks.push(bank);
      }
    }
    this.showB = true;
    this.showM = false;
  }

  async selectMove(event, bank) {
    if (!this.showM) {
      this.moves.length = 0;
      var aux = await this.data.getServerMoves();
      for (let move of aux) {
        //        move.mAmmount =  formatNumber(move.mAmmount,'es-VE');
        //        move.mOld =  formatNumber(move.mOld,'es-VE');
        //       move.mNew =  formatNumber(move.mNew,'es-VE');
        if (bank == move.mBAcc) {
          if (move.mSign) {
            move.mNature = "+";
          } else {
            move.mNature = "-";
          }
          move['mDateAux'] = move.mDate,
          move.mDate = move.mDate.substring(0, 10);
          this.moves.push(move);
        }
      }
      if (this.moves.length == 0) return;
      this.moves.sort(function (a: any, b: any) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return <any>new Date(b.mDateAux) - <any>new Date(a.mDateAux);
      });
    }
    this.showM = !this.showM;
  }
}
