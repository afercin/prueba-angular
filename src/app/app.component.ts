import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IpcService } from './services/ipc.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  pong: boolean = false;
  message: string = "";

  constructor(private ipcService: IpcService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners("reply");
  }

  prueba = () => {
    this.ipcService.send("message", "WD")
    this.ipcService.on("reply", (event: any, arg: string) => {
      this.message=arg
      this.cdRef.detectChanges();
    });
  }
  title = 'prueba-angular';
}
