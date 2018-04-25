import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

@Injectable()
export class ExportService {
  /*
    *   Parameters:
    *       First: It is the data of the csv file;
    *       Second: The header in the content of the csv file;
    *       Third: According to it, the API can look for data from the csv data to fill in the
    *              body in the content of the csv file;
    *   Return: The API return a object that include csvDownloadUrl and nowDate;
    *   Ps: The Second and Third correspond one-to-one.
    */

  /*
    *   For example:
    *   this.exportService.exportToCsvAsDataUrl(
            data,
            ['Severity', 'Event ID', 'Time', 'Alert', 'Source'],
            ['severityText', 'eventID', 'eventDate', 'msg', 'eventSourceText']
        );
    */
  public exportToCsvAsDataUrl(
    csvData: any[],
    csvHeaders: string[],
    csvBodyColumns: string[]
  ) {
    const csvRows = [];
    csvRows.push(csvHeaders);
    csvData.forEach(csvDatum => {
      csvRows.push(
        csvBodyColumns.map(csvBodyColumn => csvDatum[csvBodyColumn])
      );
    });

    const csvDownloadUrl = this.getDownloadUrl(
      csvRows.map(csvRow => csvRow.join(',')).join('\n')
    );
    return csvDownloadUrl;
  }

  private getDownloadUrl(csvText) {
    // Add BOM to text for open in excel correctly
    const BOM = '\uFEFF';
    const csvLink = new Blob([BOM + csvText], {
      type: 'text/csv'
    });
    if (window.Blob && window.URL && window.URL.createObjectURL) {
      return URL.createObjectURL(csvLink);
    } else {
      return (
        'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(csvText)
      );
    }
  }
}
