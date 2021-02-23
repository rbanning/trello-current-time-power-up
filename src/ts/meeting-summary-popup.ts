import { DateHelper } from "./date-helper";
import { SettingsService } from "./settings.service"
import { trello } from "./_common";

export namespace MeetingSummaryPopup {

  const closePopup = (t) => { t.closePopup(); };

  const showMeetingSummaryFor = (card) => {
    return (t) => {
      console.log("DEBUG: Showing meeting for", card);
      t.popup({
        title: 'Meeting Summary',
        url: './meeting-summary.html',
        args: { card },
        height: 200
      });
    };
  };

  export const show = (t) => {
    const settingsService = new SettingsService();
    const actions = [
      settingsService.get(t),
      t.cards('id','name','due','dueComplete','closed','members','dateLastActivity')
    ];
    
    return trello.Promise.all(actions)
      .then(([settings, cards]) => {
        //ensure we only have cards that are 
        //    not closed
        //    have a due date
        //    the due date is completed
        cards = Array.isArray(cards) ? cards.filter(c => !c.closed && !!c.due && c.dueComplete) : [];
        cards.sort((a,b) => b.due.localeCompare(a.due)); //sort by due DESC

        const items = [];
        if (cards.length === 0) {
          items.push({
            text: 'No meeting cards found',
            callback: closePopup
          });
        } else {
          cards.forEach(card => {
            const d = new Date(card.due);
            items.push({
              text: `${DateHelper.monthShort(d)} ${d.getFullYear()} - ${card.name}`,
              callback: showMeetingSummaryFor(card)
            });
          });
        }

        return t.popup({
          title: 'Meeting Summary',
          items
        });
      });
  };
}