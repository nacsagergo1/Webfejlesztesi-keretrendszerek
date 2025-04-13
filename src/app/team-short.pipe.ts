import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamShort'
})
export class TeamShortPipe implements PipeTransform {
  transform(teamName: string): string {
    if (!teamName) return '';

    if (teamName.startsWith('Real')) {
      return 'R.' + teamName.slice(4);
    }

    return teamName;
  }
}