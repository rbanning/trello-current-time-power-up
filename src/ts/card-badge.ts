import { CustomFields } from "./custom-fields";
import { env, trello } from "./_common";

export namespace CardBadge {

  const processLocationCard = (card: any) => {
    if (card?.coordinates) {
      return {
        text: `loc: ${card.coordinates}`,
        icon: env.logo.white,
        color: 'sky'
      };  
    }
    //else
    return null;
  };


  export const build = (t, opts) => {
    const actions = [
      t.card('id', 'name', 'shortLink', 'coordinates', 'address', 'locationName')
    ];
    return trello.Promise.all(actions)
      .then(([card]) => {
        return [
          processLocationCard(card)
        ].filter(Boolean);
      });
  };
}
