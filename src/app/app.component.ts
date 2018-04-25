import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ExportService } from './services/export.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {
  title = 'app';

  constructor(
    private exportService: ExportService,
    private datePipe: DatePipe
  ) {}

  public export() {
    const people = [
      {
        name: 'Arron',
        age: '22',
        sex: '男',
        birthday: '1993-01-06',
        phone: '13187890289',
        hobby: 'basketball'
      },
      {
        name: 'Jack',
        age: '24',
        sex: '男',
        birthday: '1991-02-22',
        phone: '13567454389',
        hobby: 'football'
      },
      {
        name: 'Alice',
        age: '21',
        sex: '女',
        birthday: '1996-11-26',
        phone: '13187889509',
        hobby: 'reading'
      }
    ];
    const csvDownloadUrl = this.exportService.exportToCsvAsDataUrl(
      people,
      ['name', 'age', 'sex', 'birthday', 'phone', 'hobby'],
      ['name', 'age', 'sex', 'birthday', 'phone', 'hobby']
    );

    document.getElementById('downloadCsv')['href'] = csvDownloadUrl;
    document.getElementById('downloadCsv')['download'] = `Test_${new DatePipe(
      'en-US'
    ).transform(new Date(), 'yyyyMMddHHmmss')}.csv`;
    console.log(document.getElementById('downloadCsv'));
    document.getElementById('downloadCsv').click();
  }
}
